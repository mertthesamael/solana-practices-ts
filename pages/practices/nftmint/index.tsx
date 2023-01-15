import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WalletMultiButtonDynamic from "../../../components/WalletMultiButtonDynamic";





const NftMint = () => {
    const TEST_IMG:string[]=["https://den-cards.pokellector.com/354/Arcanine.SWSH12.20.45387.png","https://den-cards.pokellector.com/354/Feebas.SWSH12.39.45406.png","https://den-cards.pokellector.com/354/Rotom.SWSH12.53.45420.png","https://den-cards.pokellector.com/354/Mismagius.SWSH12.64.45430.png"]
    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()

    return(
        <Flex w='100vw' overflow='auto' pos='relative' h='100vh' bgColor='blackAlpha.900' justify='center' align='center'>
            {publicKey?
            <Flex h='100%' flexDir='column' gap='5rem' p='10rem 0' justify='center' align='center' w='100%'>
            <Box pos='absolute' top='2rem' right='2rem'>
                <WalletMultiButtonDynamic></WalletMultiButtonDynamic>
            </Box>
                <Flex maxH='70%' overflow='auto' justify='center' flexWrap='wrap' gap='5rem'>
                    {TEST_IMG.map(img=><Flex h='20rem'>
                        <Image h='100%' src={img}></Image>
                    </Flex>)}
               
                </Flex>
                <Flex flexDir='column' textAlign='center'>

                <Text color='white' fontSize='2rem'>Mint your Pokémon TCG NFT now ! </Text>
                <Grid placeItems='center'>
                <Button colorScheme='purple'>Mint</Button>
                </Grid>
                </Flex>
            </Flex>
            
            : 
            
            <Flex color='white' gap='2rem' flexDir='column' align='center'>
                <Flex>
                <Text fontSize='1.6rem'>
                    Conenct your wallet to mint your NFT !
                </Text>
                 </Flex>
                 <Flex>
                    <WalletMultiButtonDynamic />
                </Flex>   
            </Flex>    
            }
        </Flex>
    )

}


export default NftMint;