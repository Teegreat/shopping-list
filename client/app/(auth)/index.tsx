import { View, Text, SafeAreaView, StatusBar, Platform } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ClerkAPIError } from "@clerk/types";

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;
    setIsSigningIn(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
    } finally {
      setIsSigningIn(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <BodyScrollView
        contentContainerStyle={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
          padding: 16,
          marginTop: 20,
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
          loading={isSigningIn}
          disabled={!emailAddress || !password || isSigningIn}
          onPress={onSignInPress}
        >
          Sign in
        </Button>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}

        <View style={{ marginTop: 16, alignItems: "center" }}>
          <ThemedText>Don't have an account?</ThemedText>
          <Button variant="ghost" onPress={() => router.push("/sign-up")}>
            Sign up
          </Button>
        </View>
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <ThemedText>Forgot password?</ThemedText>
          <Button
            variant="ghost"
            onPress={() => router.push("/reset-password")}
          >
            Reset Password
          </Button>
        </View>
      </BodyScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
