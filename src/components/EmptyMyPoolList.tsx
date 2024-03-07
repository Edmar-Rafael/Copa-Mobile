import React from 'react'
import { Pressable, Row, Text } from "native-base"


interface Props {
  code: string
}

export function EmptyMyPoolList({code}: Props) {

  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        button
      </Text>

      <Pressable >
        <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
          Compartilhar o código
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        do bolão com alguém?
      </Text>

      <Text color="gray.200" mr={1}>
        Use o código
      </Text>

      <Text color="gray.200" fontSize="sm" textAlign="center" fontFamily="heading">
        {code}
      </Text>
    </Row>
  )
}