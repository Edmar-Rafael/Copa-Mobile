import React, { ReactNode, createContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { api, endPoints } from '../services/api'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
  isUserLoading: boolean
  isAuthenticated?: boolean
}

export const AuthContext = createContext({} as AuthContextDataProps)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthContextProvider({children}: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_CLIENT_ID,
    scopes: ['profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({scheme: 'myapp'})
  })

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  async function signInWithGoogle(accessToken: string) {
    try {
      setIsUserLoading(true)
      const  tokenResponse = await api.post(endPoints.signIn, {
        access_token: accessToken
      })
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`
      const userInfoResponse = await api.get(endPoints.me)
      setUser(userInfoResponse.data.user)
    } catch(error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch(error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  const values = {signIn, user, isAuthenticated: !!user.name, isUserLoading}

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}