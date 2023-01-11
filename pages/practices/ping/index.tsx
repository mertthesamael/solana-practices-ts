import { Button, Flex, Text } from "@chakra-ui/react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";

const Ping = () => {
  const [address, setAddress]: any = useState();
  const [addressBalance, setAddressBalance]: any = useState();
  const [secret, setSecret]:any = useState()
  const [tsxUrl, setTsxUrl]:any = useState()

  const getAirdrop = async () => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const addr = new PublicKey(address)
    const airdropSignature = await connection.requestAirdrop(
      addr,
      LAMPORTS_PER_SOL
    );
    const latestBlockhash: any = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: airdropSignature,
    });
    const balance = await connection.getBalance(addr)
   console.log(balance*LAMPORTS_PER_SOL)
   setAddressBalance(balance / LAMPORTS_PER_SOL)
  };

  const ping = async() => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const signer:any = Keypair.fromSecretKey(secret)
    const addr = new PublicKey(address)

    const PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
    const PROGRAM_DATA_PUBLIC_KEY = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")
    const transaction = new Transaction()
    const instruction = new TransactionInstruction({
        keys:[{
            pubkey:PROGRAM_DATA_PUBLIC_KEY,
            isSigner:false,
            isWritable:true
        }
        ],
        programId:PROGRAM_ID,
    })

    transaction.add(instruction)
    const transactionSignature = await sendAndConfirmTransaction(connection,transaction,[signer])
    const balance = await connection.getBalance(addr)
    setAddressBalance(balance / LAMPORTS_PER_SOL)
    setTsxUrl(`Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`)
    
  }

  const generateAddres = () => {
   
    const addr = Keypair.generate();
    console.log(addr.publicKey.toBase58())
    setAddress(addr.publicKey.toBase58())
    setSecret(addr.secretKey)
    console.log(secret)
  }
  const sendBalance = async() =>{
    const connection=  new Connection(clusterApiUrl('devnet'))
    const transaction = new Transaction()
    const from = new PublicKey(address);
    const signer = Keypair.fromSecretKey(secret)
    const merto = new PublicKey('GQ8vJ6LtWknHhbE6UPormv1eqa4aLzDi6RVcKgoitgQP')
    const balance =await connection.getBalance(from)
    const instruction = SystemProgram.transfer({
      fromPubkey:from,
      toPubkey:merto,
      lamports:balance*0.8
    })

    transaction.add(instruction)
    const newBalance =await connection.getBalance(from)

    const tsxSignature = await sendAndConfirmTransaction(connection,transaction,[signer])
    console.log(tsxSignature)
    setAddressBalance(newBalance / LAMPORTS_PER_SOL)
  } 
useEffect(() => {
generateAddres()
},[])
  return (
    <Flex
      w="100vw"
      justify="center"
      align="center"
      h="100vh"
      bgColor="blackAlpha.900"
      color='white'
      gap='2rem'
    >
        <Flex w='20rem'>
        <Text>Okay this one works a bit buggy, dunno why. Basically, you need to airdrop to the given account. Then you can ping the contract ! (Wait for receiving airdrop before pinging it)</Text>
        </Flex>
      <Flex
        flexDir="column"
        justifyContent="center"
        gap="2rem"
        border="1px solid white"
        borderRadius="15px"
        justify="center"
        align="center"
        p="4rem"
        w="30rem"
        h="25rem"
      >
        <Flex w="100%" gap='1rem' flexDir='column' justify='center' h="max-content">
            <Button onClick={getAirdrop} colorScheme='green'>Airdrop !</Button>
            <Button onClick={ping} colorScheme='purple'>Ping !</Button>
            <Button onClick={sendBalance} colorScheme='red'>Send balance to merto.sol !</Button>
        </Flex>
        <Flex w='100%' textAlign='center' align="center" flexDir="column">
          <Text w='100%' fontSize="1rem">{address}</Text>
          <Text fontSize="2rem">
            {addressBalance}
          </Text>
          <Text w='100%' fontSize="1rem">
            {tsxUrl}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Ping;
