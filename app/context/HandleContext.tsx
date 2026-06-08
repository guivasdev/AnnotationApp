import { createContext, Dispatch, FC, PropsWithChildren, RefObject, SetStateAction, useContext, useRef, useState } from "react"
import { LayoutChangeEvent } from "react-native"
import LottieView from 'lottie-react-native';
import { AudioPlayer, useAudioPlayer } from "expo-audio"
import { SharedValue, useSharedValue } from "react-native-reanimated";

export const FONT_SIZE = 20
export const LINE_HEIGHT = 32

export type HandleContextType = {
  state: string
  setState: Dispatch<SetStateAction<string>>
  conteudo: string
  setConteudo: Dispatch<SetStateAction<string>>
 scrollY: SharedValue<number>
  height: number
  setHeight: Dispatch<SetStateAction<number>>
  contentHeight: number
  setContentHeight: Dispatch<SetStateAction<number>>
  lines: number
  getHeight: (event: LayoutChangeEvent) => void
  animVisivle: boolean
  setAnimVisivle: Dispatch<SetStateAction<boolean>>
  animRefCheck: RefObject<LottieView | null>
  animRefLoading: RefObject<LottieView | null>
  audioSource: string
  player: AudioPlayer
}

export const HandleContext = createContext<HandleContextType | null>(null)

export interface HandleProviderProps { }

export const HandleProvider: FC<PropsWithChildren<HandleProviderProps>> = ({ children }) => {
  const [state, setState] = useState('')
  const [conteudo, setConteudo] = useState('')
  const scrollY = useSharedValue(0);
  const [height, setHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [animVisivle, setAnimVisivle] = useState(false)
  const animRefCheck = useRef<LottieView>(null);
  const animRefLoading = useRef<LottieView>(null);

  const audioSource: string = require('../../assets/sounds/plim.mp3');
  const player = useAudioPlayer(audioSource);

  const getHeight = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;
    setHeight((prev) => Math.max(prev, newHeight));
  };

  const lines = Math.ceil(
    Math.max(height, contentHeight) / LINE_HEIGHT
  );

  const value = {
    state,
    setState,
    conteudo,
    setConteudo,
    scrollY,
    height,
    setHeight,
    contentHeight,
    setContentHeight,
    lines,
    getHeight,
    animVisivle,
    setAnimVisivle,
    animRefCheck,
    animRefLoading,
    audioSource,
    player
  }

  return <HandleContext.Provider value={value}>{children}</HandleContext.Provider>
}

export const useHandleContext = () => {
  const context = useContext(HandleContext)
  if (!context) throw new Error("useHandleContext must be used within an HandleProvider")
  return context
}
