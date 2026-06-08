import { StyleProp, TextInput, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { FONT_SIZE, LINE_HEIGHT, useHandleContext } from "@/context/HandleContext"
import Animated, { useAnimatedScrollHandler, useAnimatedStyle } from "react-native-reanimated"

export interface WritingProps {
  style?: StyleProp<ViewStyle>
}

export const Writing = (props: WritingProps) => {
  const { style } = props
  const { themed } = useAppTheme();

  const { lines, getHeight, conteudo,
    setConteudo, scrollY,
    setContentHeight } = useHandleContext();


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const linesStyle = useAnimatedStyle(() => {
    return {
      top: -scrollY.value,
    };
  });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Animated.View pointerEvents="none" style={[
        themed($viewSuperLinesStyle),
        linesStyle,
      ]}>
        {Array.from({ length: lines }).map((_, i) => (
          <View key={i} style={themed($viewLinesStyle)} />
        ))}
      </Animated.View>

      <TextInput
        onLayout={getHeight}
        multiline
        value={conteudo}
        onChangeText={setConteudo}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }} onContentSizeChange={(e) => { setContentHeight(e.nativeEvent.contentSize.height); }}
        style={[themed($textInputStyle),]}
      />
    </View>
  );
}

const $textInputStyle: ThemedStyle<ViewStyle> = () => ({
  textAlignVertical: "top",
  height: '100%',
  position: 'absolute',
  padding: 0,
  width: '100%',
  paddingLeft: 15,
  paddingTop: 5,
  paddingRight: 10,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
})

const $viewSuperLinesStyle: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  left: 0,
  right: 0,
})

const $viewLinesStyle: ThemedStyle<ViewStyle> = () => ({
  height: LINE_HEIGHT,
  borderBottomWidth: 1,
  borderBottomColor: '#aaa',
})

/*import {  StyleProp, TextInput, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { FONT_SIZE, LINE_HEIGHT, useHandleContext } from "@/context/HandleContext"
import Animated, { useAnimatedScrollHandler, useAnimatedStyle } from "react-native-reanimated"

export interface WritingProps {
  style?: StyleProp<ViewStyle>
}

export const Writing = (props: WritingProps) => {
  const { style } = props
  const { themed } = useAppTheme();

  const { lines, getHeight, conteudo,
    setConteudo, scrollY,
    setContentHeight } = useHandleContext();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const linesStyle = useAnimatedStyle(() => {
    return {
      top: -scrollY.value,
    };
  });


  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Animated.View
        pointerEvents="none"
        style={[
          themed($viewSuperLinesStyle),
          linesStyle,
        ]}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <View key={i} style={themed($viewLinesStyle)} />
        ))}
      </Animated.View>

      <AnimatedTextInput
        multiline
        editable={true}
        value={conteudo}
        onScroll={scrollHandler as any}
        style={themed($textInputStyle)}
      />
    </View>
  );
}

const $textInputStyle: ThemedStyle<ViewStyle> = () => ({
  textAlignVertical: "top",
  height: '100%',
  position: 'absolute',
  padding: 0,
  width: '100%',
  paddingLeft: 15,
  paddingTop: 5,
  paddingRight: 10,
  fontSize: FONT_SIZE,
  lineHeight: LINE_HEIGHT,
})

const $viewSuperLinesStyle: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  left: 0,
  right: 0,
})

const $viewLinesStyle: ThemedStyle<ViewStyle> = () => ({
  height: LINE_HEIGHT,
  borderBottomWidth: 1,
  borderBottomColor: '#aaa',
}) */