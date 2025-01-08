import React, { forwardRef, useCallback } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal
} from '@gorhom/bottom-sheet'
import { Colors } from '@/constants/Colors'

type AppBottomSheetProps = {
  children: React.ReactNode
} & Omit<React.ComponentProps<typeof BottomSheetModal>, 'ref' | 'children'>

const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  ({ children, ...rest }, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    )

    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: Colors.dark.tint }}
        backgroundStyle={{ backgroundColor: Colors.dark.cardBackground }}
        style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        enablePanDownToClose
        keyboardBlurBehavior="restore"
        keyboardBehavior="interactive"
        {...rest}
      >
        {children}
      </BottomSheetModal>
    )
  }
)

AppBottomSheet.displayName = 'AppBottomSheet'

export default AppBottomSheet
