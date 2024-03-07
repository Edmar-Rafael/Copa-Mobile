import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "native-base"
import React from "react"
import { Platform } from "react-native"
import { New } from "../screens/New"
import { PlusCircle, SoccerBall } from "phosphor-react-native"
import { Pools } from "../screens/Pools"
import { Find } from "../screens/Find"
import { Datails } from "../screens/Details"

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator()
  const { colors, sizes } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[800],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? 10 : 0,
        }
      }}
    >
      <Screen 
        name='new'
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={iconSize} />,
          tabBarLabel: 'Novo bolão'
        }}
      /> 

      <Screen 
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={iconSize} />,
          tabBarLabel: 'Meus bolões'
        }}
      />

      <Screen 
        name="find" 
        component={Find} 
        options={{ tabBarButton: () => null }} 
      />

      <Screen 
        name="datails" 
        component={Datails} 
        options={{ tabBarButton: () => null}}
      />
    </Navigator>
  )
}