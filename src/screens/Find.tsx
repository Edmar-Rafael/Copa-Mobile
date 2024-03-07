import { Heading, VStack, useToast } from "native-base"
import React, { useState } from "react"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useNavigation } from "@react-navigation/native"
import { api, endPoints } from "../services/api"

export function Find() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleFindPool() {
    try {
      setIsLoading(true)
      await api.post(endPoints.joinPool, {
        code,
      })
      setCode('')
      navigate('pools')
    } catch(error) {
      setIsLoading(false)
      toast.show({
        title: error?.response?.data?.message || 'Ocorreu um erro ao tentar encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
      throw error
    }
  }

  return (
    <VStack>
      <Header title="Buscar por código" showBackButton/>
      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          encontre um bolão através de{'/n'} seu código único
        </Heading>

        <Input 
          value={code}
          onChangeText={setCode}
          placeholder=""
          mb={2}
        />

        <Button 
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleFindPool}
          isDisabled={!code}
        />
      </VStack>
    </VStack>
  )
}