import { StyleProp, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useHandleContext } from "@/context/HandleContext"
import LottieView from "lottie-react-native"

export interface AnimationLottieProps {
  style?: StyleProp<ViewStyle>
}

export const AnimationLottie = () => {
  const { themed } = useAppTheme();
  const { animVisivle, setAnimVisivle, animRefCheck } = useHandleContext();
  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
      {animVisivle &&
        <LottieView
          ref={animRefCheck}
          source={require('../../assets/animations/check.json')}
          style={themed($animationStyleCheck)}
          onAnimationFinish={() => setAnimVisivle(false)}
          resizeMode="cover"
          loop={false}
          speed={1.8}
        />
      }
    </View>
  )
}

const $animationStyleCheck: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  width: 100,
  height: 100,
  zIndex: 2,
  alignSelf: 'center',
  top: '50%',
  transform: [{ translateY: -50 }]
})