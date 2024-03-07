import { FlatList, Icon, VStack, useToast } from "native-base"
import React, { useCallback, useState } from "react"
import { Header } from "react-native/Libraries/NewAppScreen"
import { Button } from "../components/Button"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { api, endPoints } from "../services/api"
import { Loading } from "../components/Loading"
import { Octicons } from "@expo/vector-icons"
import { PoolCard } from "../components/PoolCard"
import { EmptyPoolList } from "../components/EmptyPoolList"

export function Pools() {
  const [poolsData, setPoolsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation()

  const toast = useToast()

  useFocusEffect(
    useCallback(() => {
      async function handleFindPool() {
        try {
          setIsLoading(true)
          const { data } = await api.get(endPoints.pools)
          setPoolsData(data.pools)
        } catch(error) {
          toast.show({
            title: 'Ocorreu um erro ao tentar carregar os bolões',
            placement: 'top',
            bgColor: 'red.500'
          })
          throw error
        } finally {
          setIsLoading(false)
        }
      }
      handleFindPool()
    }, [])
  )

  return (
    <VStack flex={1} bgColor={'gray.900'} >
      <Header title={'Meus bolões'}/>
      <VStack mt={6} mb={4} mx={5} pb={4} borderBottomWidth={1} borderBottomColor={'gray.600'}>
        <Button 
          title={"BUSCAR BOLÃO POR CÓDIGO"}
          leftIcon={<Icon as={Octicons} name={'search'} color={'black'} size={'md'} />}
          onPress={() => navigate('find')}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList 
          keyExtractor={(item) => item.id}
          data={poolsData}
          renderItem={({item}) => (
            <PoolCard data={item} onPress={() => navigate('details', {id: item.id})}/>
          )}
          ListEmptyComponent={() => <EmptyPoolList />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      )}
    </VStack>
  )
}