import React from 'react';
import { NativeBaseProvider, StatusBar, View } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { THEME } from './src/styles/theme';
import { AuthContextProvider } from './src/contexts/AuthContext'
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';


export default function App() {
  const [FontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/>
      <AuthContextProvider>{!FontsLoaded ? <Loading /> : <Routes/>}</AuthContextProvider>
    </NativeBaseProvider>
  )
}
