import { NavigationContainer } from "@react-navigation/native"
import { Box } from "native-base"
import React from "react"
import { useAuth } from "../hooks/useAuth"
import { AppRoutes } from "./app.routes"
import { SIgnIn } from "../screens/SignIn"

export function Routes() {
  const { isAuthenticated } = useAuth()

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {isAuthenticated ? <AppRoutes/> : <SIgnIn/>}
      </NavigationContainer>
    </Box>
  )
}