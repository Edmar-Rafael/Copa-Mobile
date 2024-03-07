import { HStack, VStack, useToast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { PoolProps } from '../components/PoolCard'
import { useRoute } from '@react-navigation/native'
import { api, endPoints } from '../services/api'
import { Share } from 'react-native'
import { Loading } from '../components/Loading'
import { Option } from '../components/Option'
import { Guesses } from '../components/Guesses'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { PoolHeader } from '../components/PoolHeader'


interface RouteParams {
  id: string
}

export function Datails() {
  const [pool, setPool] = useState({} as PoolProps)
  const [isLoading, setIsLoading] = useState(false)
  const [optionSelectd, setOptionSelected] = useState<'Seus Palpites' | 'Ranking do grupo'>()

  const toast = useToast()

  const route = useRoute()
  const { id } = route.params as RouteParams

  useEffect(() => {
    async function handleGetPool() {
      try {
        setIsLoading(true)
        const { data } = await api.get(endPoints.pool(id))
        setPool(data.pool[0])
      } catch(error) {
        toast.show({
          title: 'Ocorreu um erro ao tentar carregar o bolão',
          placement: 'top',
          bgColor: 'red.500',
        })
        throw error
      } finally {
        setIsLoading(false)
      }
    }
    handleGetPool()
  }, [id])

  async function handleCodeShare() {
    await Share.share({
      message: pool.code
    })
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={''} showBackButton showShareButton handleShare={handleCodeShare}/>
      {pool?.participants?.length > 0 ? (
        <VStack>
          <PoolHeader data={pool}/>

          <HStack>
            <Option 
              title={'Seus palpites'}
              onPress={() => setOptionSelected('Seus Palpites')}
              isSelected={optionSelectd === 'Seus Palpites'}
            />

            <Option 
              title={'Ranking do grupo'}
              onPress={() => setOptionSelected('Ranking do grupo')}
              isSelected={optionSelectd === 'Ranking do grupo'}/>
          </HStack>

          <Guesses poolId={pool.id} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool.code}/>
      )}
    </VStack>
  )
}