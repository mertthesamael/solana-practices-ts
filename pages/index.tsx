import { Inter } from '@next/font/google'
import { Flex, Text } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <Flex w='100vw' justify='center' align='center' h='100vh' bgColor='black'>
      <Flex gap='2rem'flexDir='column'>
        <Flex>
        <Text fontSize='2rem' color='white'>Hey there, this is Merto</Text>
        </Flex>
        <Flex flexDir='column'>

        <Text fontSize='2rem' color='white'>Welcome to my</Text>
        <Text fontWeight='bolder' fontSize='2rem' color='white'  bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'>Solana</Text>
        <Text fontSize='2rem' color='white'>Developming journey !</Text>
        <Text></Text>
  </Flex>
      </Flex>
    </Flex>
  )
}
