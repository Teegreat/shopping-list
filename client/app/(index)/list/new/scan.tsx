import { useRef, useState } from "react";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import { useJoinShoppingListCallback } from "@/stores/ShoppingListsStore";

export default function ScanQRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const joinShoppingListCallback = useJoinShoppingListCallback();

  const [qrCodeDetected, setQRCodeDetected] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <Button onPress={requestPermission} variant="ghost">
          Grant Permission
        </Button>
      </View>
    );
  }

  const handleConfirmJoinList = () => {
    joinShoppingListCallback(qrCodeDetected);
    if (router.canDismiss()) {
      router.dismiss();
    }
    router.push({
      pathname: "/list/[listId]",
      params: { listId: qrCodeDetected },
    });
  };

  const handleBarcdoeScanned = (
    barcodeScanningResult: BarcodeScanningResult
  ) => {
    const qrCodeUrl = barcodeScanningResult?.data;

    // extract the listId from the QRCode URL
    const listIdMatch = qrCodeUrl.match(/listId=([^&]+)/);
    if (listIdMatch) {
      const listId = listIdMatch[1];
      setQRCodeDetected(listId);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setQRCodeDetected("");
      }, 1000);
    }
  };

  return (
    <CameraView
      style={styles.camera}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={handleBarcdoeScanned}
    >
      <View style={styles.contentContainer}>
        {qrCodeDetected ? (
          <View style={styles.detectedContainer}>
            <ThemedText style={styles.detectedText} type="title">
              🥳 QR code detected!!!
            </ThemedText>
            <Button onPress={handleConfirmJoinList} variant="ghost">
              Join list
            </Button>
          </View>
        ) : (
          <ThemedText>
            Point the camera at a valid Shopping List QR code to join.
          </ThemedText>
        )}
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  camera: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  detectedContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 30,
  },

  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  detectedText: {
    color: "white",
    marginBottom: 16,
  },
  instructionText: {
    color: "white",
  },
});
