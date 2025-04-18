import { View, Text, SafeAreaView, StatusBar, Platform } from "react-native";
import React, { useState } from "react";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { useRouter } from "expo-router";
import {  useSignUp } from "@clerk/clerk-expo";
import Button from "@/components/ui/button";
import { ThemedText } from "@/components/ThemedText";
import { ClerkAPIError } from "@clerk/types";

const SignupScreen = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [code, setCode] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true)
    setErrors([]);

    try {
        await signUp.create({
            emailAddress,
            password
        })

        // confirmation
        await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
        })
        setPendingVerification(true)
        
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false)
    }

  };


  const onVerifyPress = async () => {
     if (!isLoaded) return;
     setIsLoading(true);
     setErrors([]);

     try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code,
        });

        if (signUpAttempt.status === "complete") {
            await setActive({ session: signUpAttempt.createdSessionId });
            router.replace("/");
        } else {
            console.log(signUpAttempt)
        }
     } catch (error) {
        console.log(error);
     }
  }


    if (pendingVerification) {
      return (
        <BodyScrollView contentContainerStyle={{ padding: 16 }}>
          <TextInput
            value={code}
            label={`Enter the verification we sent to ${emailAddress}`}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
          />
          <Button onPress={onVerifyPress} disabled={!code || isLoading} loading={isLoading}>
            Verify
          </Button>
          {errors.map((error) => (
            <ThemedText key={error.longMessage} style={{ color: "red" }}>
              {error.longMessage}
            </ThemedText>
          ))}
        </BodyScrollView>
      );
    }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <BodyScrollView
        contentContainerStyle={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
          padding: 16,
        }}
      >
        <TextInput
          label="Email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmailAddress}
        />

        <TextInput
          label="Password"
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Button
          loading={isLoading}
          disabled={!emailAddress || !password || isLoading}
          onPress={onSignUpPress}
        >
          Continue
        </Button>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
