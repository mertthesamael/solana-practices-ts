import { Flex, Text } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import TransferBalanceForm from "../../../components/TransferBalanceForm";




const TransferBalance = () => {
  

    return(
        <Flex w='100vw' h='100vh' bgColor='blackAlpha.900' justify='center' align='center'>
            <Flex color='white' gap='2rem' p='4rem' border='1px solid white' borderRadius='15px' w='30rem' minH='20rem' justify='center' flexDir='column' align='center'>
                <Flex textAlign='center'>
                    <Text>In this section, you can transfer Devnet SOL balance to the given address ! (Of course you need to connect your wallet and switch to the Devnet)</Text>
                </Flex>
                <Flex flexDir='column' gap='2rem'>

            <WalletMultiButton />
            <TransferBalanceForm />
                </Flex>
            </Flex>
        </Flex>
    )

}


export default TransferBalance;