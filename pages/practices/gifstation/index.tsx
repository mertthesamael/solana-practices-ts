import { Button, Flex, FormControl, Image, Input, Text } from "@chakra-ui/react"
import { Noto_Color_Emoji } from "@next/font/google";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WalletMultiButtonDynamic from "../../../components/WalletMultiButtonDynamic";





const GifStation = () => {
    const TEST_GIFS = [
        'https://media.giphy.com/media/pUp9Nb1czvHMY/giphy.gif',
        'https://media.giphy.com/media/19JSJ5ucu91R5D7a3w/giphy.gif',
        'https://media.giphy.com/media/zKRlxWqdP4NTok3Ppl/giphy.gif',
        'https://media.giphy.com/media/KOCLgcdTywdVsjUevp/giphy.gif'
    ]
    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()
  
    return(
        <Flex  w='100vw' justify='center'  align='center' h='100vh' bgColor='blackAlpha.900'>
                {publicKey?
            <Flex h='100%' w='100%' justify='center' align='center' flexDir='column'>
            <Flex flexDir='column' justify='center' align='center' h='100%' w='100%' gap='2rem'>
                <Flex>
                    <Text color='white' fontSize='2rem'>Hey there, feel free to add your favorite gif to the collection !</Text>
                </Flex>
                <Flex w='80%'>
                    <FormControl display='flex' gap='1rem' onSubmit={(e) => e.preventDefault()}>
        
                        <Input />
                        <Button type='submit'>Add Your Gif !</Button>
               
                    </FormControl>
                </Flex>
            </Flex>
            <Flex h='100%'overflow='auto'  align='center'>
                    <Flex   h='100%'flexWrap='wrap' justify='center' gap='8rem'>

                    {TEST_GIFS.map((x)=>
                    <Flex key={x} w='20rem' h='20rem'>
                    <Image  src={x} ></Image>
                    </Flex>
                    
                    )}
                    </Flex>
                   
            </Flex>
            </Flex>
                :<Flex flexDir='column' gap ='3rem'  w='100%' h='100%' justify='center' align='center'>
                     <Flex>
                    <Text color='white' fontSize='3rem'>✨ GIF Station ✨</Text>
                    </Flex>
                    <Flex>
                    <Text color='white' fontSize='2rem'>Connect your wallet and get in 😉</Text>
                    </Flex>
                <WalletMultiButtonDynamic></WalletMultiButtonDynamic>    
                </Flex>}
            </Flex>
            )
            
        }
        
        
        
        export default GifStation;