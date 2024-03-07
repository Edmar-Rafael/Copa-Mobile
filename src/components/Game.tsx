import { HStack, Text, VStack, useTheme } from "native-base"
import React from "react"
import { Team } from "./Team"
import dayjs from "dayjs"
import ptBR from 'dayjs/locale/pt-br'
import { getName } from 'country-list'
import { Check, X } from "phosphor-react-native"
import { Button } from "./Button"


interface GuessesProps {
  id: string
  gameId: string
  createdAt: string
  participants: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export interface GameProps {
  id: string
  date: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guesses: null | GuessesProps
}

interface Props {
  data: GameProps
  onGuessesConfirm: () => void
  setFirstTeamPoints: (value: string) => void
  setSecondTeamPoints: (value: string) => void
  isLoading?: boolean
}

export function Game({
  data,
  onGuessesConfirm,
  setFirstTeamPoints,
  setSecondTeamPoints,
  isLoading
}: Props) {
  const { colors, sizes } = useTheme()

  const when = dayjs(data.date).locale(ptBR).format('DD [de] MMMM [de] YYYY [às] HH:00[h]')

  return (
    <VStack 
      w='full'
      bgColor={'gray.800'}
      rounded={'sm'}
      alignItems={'center'}
      borderBottomWidth={3}
      borderBottomColor={'yellow.500'}
      mb={3}
      p={4}
    >
      <Text color={'gray.100'} fontFamily={'heading'} fontSize={'sm'}>
        {getName(data.firstTeamCountryCode)} vs {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color={'gray.200'} fontSize={'xs'}>
        {when}
      </Text>
      
      <HStack>
        <Team 
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />
        <X />
        <Team 
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {!data.guesses && (
        <Button 
          size={'xs'}
          w={'full'}
          bgColor={'green.500'}
          mt={4}
          onPress={onGuessesConfirm}
          isLoading={isLoading}
        >
          <HStack alignItems={'center'} >
            <Text color={'white'} fontSize={'xs'} fontFamily={'heading'} mr={3}>
              CONFIRMAR PALPITE
            </Text>
            <Check color={colors.white} size={sizes[4]}/>
          </HStack>
        </Button>
      )}
    </VStack>
  )
}