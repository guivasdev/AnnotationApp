import { FC, use, useEffect, useRef, useState } from "react"
import { ScrollView, TextInput, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"

import { FAB } from 'react-native-paper';
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import { loadString, saveString } from "@/utils/storage";
import LottieView from 'lottie-react-native';
import { useAudioPlayer } from 'expo-audio';



interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

const FONT_SIZE = 20
const LINE_HEIGHT = 32
export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed, theme } = useAppTheme()

  const [acaoUsuario, setAcaoUsuario] = useState('leitura');
  const [conteudo, setConteudo] = useState('');
  const [flag, setFlag] = useState(0);
  const [animVisivle, setAnimVisivle] = useState(false);
  const [lines, setLines] = useState(100);
  const [newHeight, setNewHeight] = useState(0)
  const inputRef = useRef<TextInput>(null);
  const animRef = useRef<LottieView>(null);
  const audioSource = require('../../assets/sounds/plim.mp3');

  const player = useAudioPlayer(audioSource);

  const LINES = 100

  useEffect(() => {
    console.log('teste2')
    animRef.current?.play();

    const contentPersistent = loadString('conteudo')
    if (contentPersistent) {
      setConteudo(contentPersistent)

    }

  }, [])
  useEffect(() => {
    //salvamento do conteúdo
    console.log('teste1')
    if (acaoUsuario == 'leitura' && conteudo.length >= 0 && flag) {
      saveString('conteudo', conteudo)
      setAnimVisivle(true)
      player.seekTo(0)
      player.play()
    }
  }, [acaoUsuario, conteudo.length >= 0, flag])

  useEffect(() => {
    animRef.current?.play();
    console.log('teste2')

  }, [animVisivle])


  const handleFAB = () => {
    if (acaoUsuario == 'leitura') {
      setAcaoUsuario('escrita')
      setFlag(0)
    }
    else {
      setAcaoUsuario('leitura')
      setFlag(1)
      setAnimVisivle(false)

    }

  }



  return (
    <Screen KeyboardAvoidingViewProps={{ behavior: "padding" }} style={themed($root)} safeAreaEdges={["top", "bottom"]} contentContainerStyle={{ flex: 1 }} preset="fixed">

      {animVisivle && acaoUsuario == 'leitura' && <LottieView

        ref={animRef}
        source={require('../../assets/animations/check.json')}
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          zIndex: 2,
          alignSelf: 'center',
          top: '50%',
          transform: [{ translateY: -50 }],
        }}
        onAnimationFinish={() => setAnimVisivle(false)}
        resizeMode="cover"
        loop={false}
        speed={1.5}
      />
      }
      {

        acaoUsuario != 'leitura' && <LottieView

          ref={animRef}
          source={require('../../assets/animations/loading.json')}
          style={{
            zIndex: 2,
            position: 'absolute',
            width: 100,
            height: 100,
            alignSelf: 'center',
            top: '10%',
            transform: [{ translateY: -50 }],
          }} containerStyle={{

            transform: [{ scale: 1.5 },]

          }
          }
          autoPlay
          resizeMode="cover"
          loop={true}
        // speed={1.2}
        />
      }

      {
        //usuario escrevendo
        acaoUsuario != 'leitura' ?
          <ScrollView contentContainerStyle={{ flexGrow: 2 }}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <TouchableWithoutFeedback
              onPress={() => inputRef.current?.focus()}
            >
              <View style={[
                themed($viewSuperLinesStyle),
                { height: lines * LINE_HEIGHT },
              ]}>
                {Array.from({ length: lines }).map((_, i) => (
                  <View key={i} style={themed($viewLinesStyle)} />
                ))
                }
              </View>
            </TouchableWithoutFeedback>

            <TextInput
              multiline
              ref={inputRef}
              value={conteudo}
              onChangeText={(text) => setConteudo(text)}
              onContentSizeChange={() => {
                setNewHeight(newHeight + 1)
                if (newHeight >= LINES)
                  setLines(lines + 1);

              }}
              style={[themed($textInputStyle), { textAlign: 'left', color: theme.colors.palette.neutral600, fontStyle: 'italic' }]}
            />


          </ScrollView>
          : conteudo.length <= 0 ?
            /*usuario ainda não escreveu nada! */
            <ScrollView contentContainerStyle={{ flexGrow: 2 }}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <TouchableWithoutFeedback
                onPress={() => inputRef.current?.focus()}
              >
                <View style={themed($viewSuperLinesStyle)}>
                  {Array.from({ length: lines }).map((_, i) => (
                    <View key={i} style={themed($viewLinesStyle)} />
                  ))
                  }
                </View>
              </TouchableWithoutFeedback>

              <Text style={{ textAlign: 'center' }}>Nada escrito ainda!</Text>


            </ScrollView>

            : <ScrollView contentContainerStyle={{ flexGrow: 2 }}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <TouchableWithoutFeedback
                onPress={() => inputRef.current?.focus()}
              >
                <View style={themed($viewSuperLinesStyle)}>
                  {Array.from({ length: lines }).map((_, i) => (
                    <View key={i} style={themed($viewLinesStyle)} />
                  ))
                  }
                </View>
              </TouchableWithoutFeedback>

              <TextInput
                editable={false}
                multiline
                ref={inputRef}
                showSoftInputOnFocus={false}
                value={conteudo}
                onChangeText={(text) => setConteudo(text)}
                onContentSizeChange={() => {
                  setNewHeight(newHeight + 1)
                  if (newHeight >= LINES)
                    setLines(lines + 1);

                }}
                style={[themed($textInputStyle), { fontStyle: 'italic', textAlign: 'left', color: theme.colors.palette.neutral900 }]}
              />


            </ScrollView>
      }

      {/* FAB */}
      <FAB icon={acaoUsuario == 'leitura' && conteudo.length <= 0 ? 'plus' : acaoUsuario == 'leitura' && conteudo.length >= 0 ? 'pencil' : 'check'} style={themed($fab)} onPress={handleFAB}></FAB>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  padding: 20,
})

const $fab: ThemedStyle<ViewStyle> = (theme) => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  alignContent: 'flex-end',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  alignSelf: 'flex-end'
})

const $textInputStyle: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  padding: 0,
  width: '100%',
  alignItems: 'stretch',
  alignContent: 'stretch',
  alignSelf: 'stretch',
  justifyContent: 'space-evenly',
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
  textAlignVertical: 'top',
})

const $viewSuperLinesStyle: ThemedStyle<ViewStyle> = (theme) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
})

const $viewLinesStyle: ThemedStyle<ViewStyle> = (theme) => ({
  height: LINE_HEIGHT,
  borderBottomWidth: 1,
  borderBottomColor: '#b4b4b4',
})