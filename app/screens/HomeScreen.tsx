import { FC, useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Reading } from "@/components/Reading"
import { Writing } from "@/components/Writing"
import { NothingWritten } from "@/components/NothingWritten"
import { FAB } from 'react-native-paper';
import { useHandleContext } from "@/context/HandleContext"
import { loadString, saveString } from "@/utils/storage"
import { AnimationLottie } from "@/components/AnimationLottie"

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed } = useAppTheme()
  const { state, setState, animRefCheck, animRefLoading, setConteudo, conteudo,
    animVisivle, setAnimVisivle, player } = useHandleContext();

  const [flag, setFlag] = useState(0);

  useEffect(() => {
    animRefLoading.current?.play();

    const contentPersistent = loadString('conteudo')
    if (contentPersistent) {
      setConteudo(contentPersistent)
      setState('Reading')
    }
    else setState('NothingWritten')

  }, [])

  useEffect(() => {

    if (state == 'Reading' && conteudo.length >= 0 && flag) {
      saveString('conteudo', conteudo)
      setAnimVisivle(true)
      setFlag(0)
      player.seekTo(0)
      player.play()
    }

  }, [flag])

  useEffect(() => {
    animRefCheck.current?.play();
  }, [animVisivle])

  const selectIcon: () => string = () => {
    //escrevendo
    if (state == 'Writing')
      return 'check'

    //lendo
    else if (state == 'Reading' && conteudo.length > 0)
      return 'pencil'

    //vazio
    return 'plus'
  }

  const handleFAB = () => {
    //quero salvar
    if (state == 'Writing') {
      setState('Reading')
      setFlag(1)
    }
    //estou lendo
    else {
      setAnimVisivle(false)
      setState('Writing')
    }

  }
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($screenContentContainer)}
    >
      <SafeAreaView edges={["bottom"]} style={{ width: '100%', height: '100%' }}>
        <AnimationLottie />

        {
          state == 'NothingWritten' ?
            <NothingWritten />
            :
            state == 'Reading' ?
              <Reading />
              :
              <Writing />
        }
        <FAB icon={selectIcon()} onPress={handleFAB} style={themed($fab)}></FAB>
      </SafeAreaView>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
})

const $fab: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xl,
  marginHorizontal: spacing.xl,
  position: 'absolute',
  right: 10,
  bottom: 25,
  alignContent: 'flex-end',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  alignSelf: 'flex-end'
})