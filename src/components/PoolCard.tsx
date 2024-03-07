import { Text } from "native-base"
import React from "react"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ParticipantsProps } from "./Participants"


export interface PoolProps {
  id: string
  code: string
  title: string
  ownerId: string
  createdAt: string
  owner: {
    name: string
  }
  participants: ParticipantsProps[]
  _count: {
    participants: number
  }
}

interface Props extends TouchableOpacityProps {
  data: PoolProps
}

export function PoolCard({data, ...rest}: Props) {

  return (
    <TouchableOpacity>
      <Text>Pool Card</Text>
    </TouchableOpacity>
  )
}