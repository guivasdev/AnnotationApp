import { FC, useEffect, useRef, useState } from "react"
import { ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Writing } from "@/components/Writing"
import { FAB } from 'react-native-paper';
import { useHandleContext } from "@/context/HandleContext"
import { loadString, saveString } from "@/utils/storage"
import { AnimationLottie } from "@/components/AnimationLottie"

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed } = useAppTheme()
  const { animRefCheck, setContent, content, setAnimVisivle, animVisivle, player } = useHandleContext();

  const contentPass = useRef("");

  useEffect(() => {

    const contentPersistent = loadString('conteudo')

    if (contentPersistent) {
      setContent(contentPersistent)
      contentPass.current = contentPersistent
    }
  }, [])

  useEffect(() => {
    handleIcon()
  }, [content])

  const saveData = async () => {
    await saveString('conteudo', content)
    player.seekTo(0)
    player.play();
    setAnimVisivle(true);
  }

  const handleFAB = () => {
    if (contentPass.current.length != content.length)
      saveData()
    else
      setAnimVisivle(false)
  }

  useEffect(() => {
    animRefCheck.current?.play();
  }, [animVisivle])


  function handleIcon(): Boolean {
    if (contentPass.current.length != content.length)
      return true
    else
      return false
  }
  return (
    <Screen preset="fixed" contentContainerStyle={themed($screenContentContainer)} >
      <SafeAreaView edges={["bottom"]} style={{ width: '100%', height: '100%' }}>

        <AnimationLottie />
        <Writing />
        <FAB icon={handleIcon() ? 'check' : 'pencil'} onPress={handleFAB} style={themed($fab)}></FAB>

      </SafeAreaView>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingVertical: spacing.xl,
})

const $fab: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xxl,
  marginHorizontal: spacing.xl,
  position: 'absolute',
  right: 10,
  bottom: 25,
  alignContent: 'flex-end',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  alignSelf: 'flex-end'
})