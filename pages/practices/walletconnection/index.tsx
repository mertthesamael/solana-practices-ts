import { Button, Flex, useToast } from "@chakra-ui/react"
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
        const result = await sendTransaction(transaction,connection)
        console.log(result)
    }

    return(
        <Flex   w="100vw"
        justify="center"
        align="center"
        h="100vh"
        bgColor="blackAlpha.900"
        color='white'
        gap='2rem'>
            <Flex>
            <WalletMultiButton></WalletMultiButton>
            <Button onClick={ping} colorScheme='purple'>Ping !</Button>
            </Flex>
        </Flex>
    )

}


export default WalletConnection;