import React from "react"
import { PoolProps } from "./PoolCard"
import { HStack, Heading, Text, VStack } from "native-base"
import { Participants } from "./Participants"


interface Props {
  data: PoolProps
}

export function PoolHeader({data}: Props) {

  return (
    <HStack 
      w="full"
      h={20}
      bgColor="transparent"
      borderBottomWidth={1}
      borderBottomColor="gray.600"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      p={4}
    >
      <VStack>
        <Heading color="white" fontSize="md" fontFamily="heading">
          {data.title}
        </Heading>

        <HStack>
          <Text color="gray.200" fontSize="xs" mr={1}>
            Código:
          </Text>
          
          <Text color="gray.200" fontSize="xs" fontFamily="heading">
            {data.code}
          </Text>
        </HStack>
      </VStack>

      <Participants 
        count={data._count?.participants}
        participants={data.participants}/>
    </HStack>
  )
}