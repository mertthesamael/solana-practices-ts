import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, Flex, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import GetBalanceForm from '../../../components/GetBalanceForm'
import { AccountInfo, clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [addr, setAddr] = useState()
  const [balance, setBalance]:any = useState()
  const [isExecutable, setIsExecutable]:any = useState()
  const toast = useToast()
const getBalance = async(acc:any) => {
    const connection = new Connection(clusterApiUrl('devnet'));
    try{

        const key = new PublicKey(acc)
        const balance = await connection.getBalance(key);
        const accInfo = await connection.getAccountInfo(key)
        setIsExecutable(accInfo?.executable)
        setBalance(balance)
    }catch(err){
        toast({
            status:'error',
            title:'Please enter valid address'
        })
    }
   
}


  return (
    <Flex color='white' w='100vw' h='100vh' justify='center' align='center' bgColor='black'>
        <Flex flexDir='column' justifyContent='center' gap='2rem' border='1px solid white' borderRadius='15px' justify='center' align='center' p='4rem' w='30rem' h='25rem'>
        <Flex w='100%' h='max-content'>
        <GetBalanceForm onGetData={getBalance}/>
        </Flex>
        <Flex align='center' flexDir='column'>
        <Text fontSize='2rem'>{balance&&balance + ' SOL'}</Text>
        <Text fontSize='2rem'>{isExecutable?"Executable":"Not Executable"}</Text>
        </Flex>
        </Flex>
    </Flex>
      
  )
}
