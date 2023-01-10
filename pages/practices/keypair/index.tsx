import { Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react";
import { AccountInfo, clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js'






const GenerateKeypair = () => {

    const [key, setKey] = useState("")

    const generateKeypair = () => {
        const keypair = Keypair.generate()
        console.log(keypair)
        setKey(keypair.publicKey.toBase58())
        

    }
 
    return(
        <Flex w='100vw' justify='center' align='center' h='100vh' bgColor='blackAlpha.900'>
            <Flex justify='center' gap='2rem' color='white' align='center' flexDir='column' border='1px solid white' borderRadius='15px' w='30rem' h='25rem' p='4rem'>

                <Flex>
                <Text>Click to button for generate new keypair</Text>
                </Flex>

                <Flex>
                    <Button onClick={generateKeypair} colorScheme='purple'>Generate</Button>
                </Flex>

                <Flex textAlign='center' w='100%'>
                <Text w='100%'>{key?'Public Address  '+key:""}</Text>
                </Flex>

            </Flex>
        </Flex>
    )

}

export default GenerateKeypair;