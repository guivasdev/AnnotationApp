import { StyleProp, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useHandleContext } from "@/context/HandleContext"
import LottieView from "lottie-react-native"

export interface AnimationLottieProps {
  style?: StyleProp<ViewStyle>
}

export const AnimationLottie = (props: AnimationLottieProps) => {
  const { themed } = useAppTheme();
  const { animVisivle, setAnimVisivle,
    state, animRefCheck, animRefLoading } = useHandleContext();

  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
      {animVisivle && state == 'Reading' &&
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

      {state == 'Writing' &&
        <LottieView
          ref={animRefLoading}
          source={require('../../assets/animations/loading.json')}
          style={themed($animationStyleLoading)}
          containerStyle={{ transform: [{ scale: 1.5 }] }}
          resizeMode="cover"
          autoPlay={true}
          loop={true}
        />
      }
    </View>
  )
}

const $animationStyleCheck: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: 'absolute',
  width: 100,
  height: 100,
  zIndex: 2,
  alignSelf: 'center',
  top: '50%',
  transform: [{ translateY: -50 }]
})

const $animationStyleLoading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  zIndex: 2,
  position: 'absolute',
  width: 100,
  height: 100,
  alignSelf: 'center',
  top: '10%',
  transform: [{ translateY: -50 }],
})