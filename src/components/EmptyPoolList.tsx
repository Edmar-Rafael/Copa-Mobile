import { Pressable, Row, Text } from "native-base"
import React from "react"

export function EmptyPoolList() {

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'/n'} nenhum bolão, que tal
      </Text>

      <Pressable>
        <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
          buscar por um código
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable>
        <Text textDecorationLine="underline"  color="yellow.500">
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  )
}