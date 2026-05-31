import { FC, useEffect, useRef, useState } from "react"
import { ScrollView, TextInput, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"

import { FAB } from 'react-native-paper';
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
interface HomeScreenProps extends AppStackScreenProps<"Home"> { }

export const HomeScreen: FC<HomeScreenProps> = () => {
  const { themed } = useAppTheme()

  const [acaoUsuario, setAcaoUsuario] = useState('leitura');
  const [conteudo, setConteudo] = useState('');
  const [lines, setLines] = useState(25);
  const [newHeight, setNewHeight] = useState(0)
  const inputRef = useRef<TextInput>(null);

  const LINES = 25

  useEffect(() => {
    console.log(lines)
  }, [lines])

  return (
    <Screen style={themed($root)} contentContainerStyle={{ flex: 1 }} preset="fixed">
      {/* Lines */}
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
          onContentSizeChange={() => {
            setNewHeight(newHeight + 1)
            if (newHeight >= LINES)
              setLines(lines + 1);

          }}
          style={themed($textInputStyle)}
          secureTextEntry={true}
        />

      </ScrollView>
      <FAB icon="plus" style={themed($fab)} onPress={() => console.log('Pressed')}></FAB>
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