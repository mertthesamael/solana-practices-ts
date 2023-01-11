import { Button, Flex, Text, useToast } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";






const WalletConnection = () => {

    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()
    const toast = useToast()
    const ping = async() => {
        if(!connection || !publicKey ){
            toast({
                title:'Please connect your wallet',
                status:'error'
            })
        }
        const PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
        const PROGRAM_DATA_PUBLIC_KEY = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")
        const transaction = new Transaction()
        const instruction = new TransactionInstruction({
            keys:[{
                pubkey:PROGRAM_DATA_PUBLIC_KEY,
                isSigner:false,
                isWritable:true
            }],
            programId:PROGRAM_ID
        })
        transaction.add(instruction)
        try{

            const result = await sendTransaction(transaction,connection)
            console.log(result)
        }catch(err){
           console.log(err)
        }
    }

    return(
        <Flex   w="100vw"
        justify="center"
        align="center"
        h="100vh"
        bgColor="blackAlpha.900"
        color='white'
        gap='2rem'>
            <Flex flexDir='column' w='30rem' gap='2rem' h='25rem' align='center' justify='center' border='1px solid white' borderRadius='15px'>
                <Flex textAlign='center'>
                    <Text>Well, in order to interact with this one, first you need to connect with your Phanton Wallet !. Then you need to switch to the DevNet from your wallet settings.</Text>
                </Flex>
                <Flex flexDir='column' gap='2rem'>
            <WalletMultiButton />
            <Button onClick={ping} colorScheme='purple'>Ping !</Button>
                </Flex>
            </Flex>
        </Flex>
    )

}


export default WalletConnection;