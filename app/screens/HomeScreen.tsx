import { FC, useEffect, useRef, useState } from "react"
import { ScrollView, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"

import { FAB } from 'react-native-paper';
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Text } from "@/components/Text"
import { loadString, saveString } from "@/utils/storage";

interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed } = useAppTheme()

  const [acaoUsuario, setAcaoUsuario] = useState('leitura');
  const [conteudo, setConteudo] = useState('');
  const [flag, setFlag] = useState(0);
  const [lines, setLines] = useState(25);
  const [newHeight, setNewHeight] = useState(0)
  const inputRef = useRef<TextInput>(null);
  const LINES = 25


  useEffect(() => {
    const contentPersistent = loadString('conteudo')
    if (contentPersistent) {
      setConteudo(contentPersistent)
    }

  }, [])
  useEffect(() => {
    //salvamento do conteúdo
    if (acaoUsuario == 'leitura' && conteudo.length >= 0 && flag)
      saveString('conteudo', conteudo)


  }, [acaoUsuario, conteudo.length >= 0])


  const handleFAB = () => {
    if (acaoUsuario == 'leitura') {
      setAcaoUsuario('escrita')
      setFlag(0)
    }
    else {
      setAcaoUsuario('leitura')
      setFlag(1)

    }





  }



  return (
    <Screen style={themed($root)} contentContainerStyle={{ flex: 1 }} preset="fixed">
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
              <View style={themed($viewSuperLinesStyle)}>
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
              style={themed($textInputStyle)}
              secureTextEntry={true}
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
                value={conteudo}
                onChangeText={(text) => setConteudo(text)}
                onContentSizeChange={() => {
                  setNewHeight(newHeight + 1)
                  if (newHeight >= LINES)
                    setLines(lines + 1);

                }}
                style={themed($textInputStyle)}
                secureTextEntry={true}
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
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 20,
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
  marginTop: 22.5,
  borderBottomWidth: 1,
  borderBottomColor: '#b4b4b4',
})