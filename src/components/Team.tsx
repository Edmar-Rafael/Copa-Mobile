import { HStack } from "native-base"
import React from "react"
import CountryFlag from 'react-native-country-flag'
import { Input } from "./Input"

interface Props {
  code: string
  position: 'left' | 'right'
  onChangeText: (value: string) => void
}

export function Team({code, onChangeText, position}: Props) {

  return (
    <HStack>
      {position === 'left' &&
        <CountryFlag isoCode={code} size={25} style={{marginRight:'12'}}/>
      }

      <Input 
        w={10}
        h={9}
        textAlign={'center'}
        fontSize={'xs'}
        keyboardType="numeric"
        onChangeText={onChangeText}
      />

        {position === 'right' &&
          <CountryFlag isoCode={code} size={25} style={{marginLeft:'12'}}/>
        }
    </HStack>
  )
}