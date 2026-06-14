import { createContext, Dispatch, FC, PropsWithChildren, RefObject, SetStateAction, useContext, useRef, useState } from "react"
import LottieView from 'lottie-react-native';
import { AudioPlayer, useAudioPlayer } from "expo-audio"

export const FONT_SIZE = 20
export const LINE_HEIGHT = 32

export type HandleContextType = {
  content: string
  setContent: Dispatch<SetStateAction<string>>
  animVisivle: boolean
  setAnimVisivle: Dispatch<SetStateAction<boolean>>
  animRefCheck: RefObject<LottieView | null>
  audioSource: string
  player: AudioPlayer
}

export const HandleContext = createContext<HandleContextType | null>(null)

export interface HandleProviderProps { }

export const HandleProvider: FC<PropsWithChildren<HandleProviderProps>> = ({ children }) => {
  const [content, setContent] = useState('')
  const [animVisivle, setAnimVisivle] = useState(false)
  const animRefCheck = useRef<LottieView>(null);
  const audioSource: string = require('../../assets/sounds/plim.mp3');
  const player = useAudioPlayer(audioSource);


  const value = {
    content,
    setContent,
    animVisivle,
    setAnimVisivle,
    animRefCheck,
    audioSource,
    player,
  }

  return <HandleContext.Provider value={value}>{children}</HandleContext.Provider>
}

export const useHandleContext = () => {
  const context = useContext(HandleContext)
  if (!context) throw new Error("useHandleContext must be used within an HandleProvider")
  return context
}
