import { FlatList, useToast } from "native-base"
import React, { useEffect, useState } from "react"
import { Game } from "./Game"
import { api, endPoints } from "../services/api"


interface Props {
  poolId: string
}

export function Guesses({poolId}: Props) {
  const [games, setGames] = useState([])
  const [firstTeamPoints, setFirstTeampoints] = useState('')
  const [secondTeampoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  useEffect(() => {
    fetchGames()
  }, [poolId])

  async function fetchGames() {
    try {
      const { data } = await api.get(endPoints.games(poolId))
      setGames(data.games)
    } catch(error) {
      toast.show({
        title: 'Ocorreu um erro ao tentar carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      })
      throw error
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      await api.post(endPoints.guess(poolId, gameId), {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeampoints: Number(secondTeampoints),
      })
      toast.show({
        title: 'Palpite feito com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })
      fetchGames()
    } catch(error) {
      toast.show({
        title: error.response?.data?.message || 'Ocorreu um erro ao tentar fazer um palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
      throw error
    }
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => {
        return (
          <Game 
            data={item}
            onGuessesConfirm={() => handleGuessConfirm(item.id)}
            setFirstTeamPoints={setFirstTeampoints}
            setSecondTeamPoints={setSecondTeamPoints}
          />
      )}}
    />
  )
}