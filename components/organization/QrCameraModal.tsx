import {
  BottomSheetModal,
  BottomSheetView,
  SCREEN_HEIGHT
} from '@gorhom/bottom-sheet'
import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  View
} from 'react-native'
import AppBottomSheet from '@/components/ui/AppBottomSheet'
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions
} from 'expo-camera'
import { ThemedText } from '@/components/ui/ThemedText'
import { Colors } from '@/constants/Colors'

type QrCameraModalProps = {
  handleBarCodeScanned: (scanningResult: BarcodeScanningResult) => void
  bottomSheetRef: React.RefObject<BottomSheetModal>
}

const QrCameraModal: React.FC<QrCameraModalProps> = ({
  handleBarCodeScanned,
  bottomSheetRef
}) => {
  const [permission, requestPermission] = useCameraPermissions()

  return (
    <AppBottomSheet
      stackBehavior="replace"
      name="QrCameraModal"
      ref={bottomSheetRef}
    >
      <BottomSheetView
        style={{
          height: SCREEN_HEIGHT / 2,
          padding: 10
        }}
      >
        {!permission ? (
          <View className="flex-1 justify-center items-center">
            <ThemedText className="text-center text-white mb-8">
              Requesting camera permissions ...
            </ThemedText>
            <ActivityIndicator color={Colors.dark.tint} />
          </View>
        ) : !permission.granted ? (
          <View className="flex-1 justify-center items-center">
            <ThemedText className="text-center text-red-400 mb-8">
              We need your permission to show the camera.
            </ThemedText>
            <Pressable
              className="bg-neutral-800 p-3 rounded-lg"
              onPress={requestPermission}
            >
              <ThemedText>Grant permission</ThemedText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.container}>
            <CameraView
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: ['qr']
              }}
              autofocus="on"
              style={[StyleSheet.absoluteFillObject]}
              onBarcodeScanned={handleBarCodeScanned}
            />
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </View>
        )}
      </BottomSheetView>
    </AppBottomSheet>
  )
}

const { width, height } = Dimensions.get('window')
const overlaySize = Math.min(width * 0.7, height * 0.4) // Responsive square based on screen size
const overlayBorder = 2 // Thickness of the border
const opacity = 'rgba(0, 0, 0, 0.6)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,
    overflow: 'hidden'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    width: overlaySize,
    height: overlaySize,
    borderColor: 'gray',
    borderWidth: overlayBorder,
    backgroundColor: 'transparent',
    borderRadius: 8
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  }
})

export default QrCameraModal
