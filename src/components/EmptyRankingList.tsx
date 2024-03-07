import { Text } from "native-base"
import React from "react"

export function EmptyRankingList() {

  return (
    <Text color="white" fontSize="sm" textAlign="center">
      O ranking desse bolão ainda não foi {'\n'} 
      formado, aguarde os resultados.
    </Text>
  )
}