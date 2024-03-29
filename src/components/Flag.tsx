import { IImageProps, Image } from "native-base"
import React from "react"

export function Flag({...rest}: IImageProps) {

  return (
    <Image
      {...rest}
      alt="bandeira"
      w={8}
      h={6}
      mx={3} 
    />
  )
}