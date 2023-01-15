import { Flex, Text, Toast, useToast } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import MovieReviewForm from "../../../components/MovieReviewForm"
import * as borsh from "@project-serum/borsh"
import { Movie } from "../../../models/Movie"
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"
import WalletMultiButtonDynamic from "../../../components/WalletMultiButtonDynamic"




const Serialize = () => {

    const {connection} = useConnection()
    const { publicKey:signer, sendTransaction } = useWallet()
    const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'
    const toast = useToast()
    const reviewHandler = async(data:any) => {
        if(!signer || !connection){
            toast({
                title:'Please connect your wallet first ! ',
                status:'warning'
            })
            return null
        }
        const movie = new Movie(data.name,data.rate, data.review)
        const instructionData = movie.serialize();
        const movieKey = new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
     
        
        const transaction = new Transaction()
        
        const [pda] =  PublicKey.findProgramAddressSync(
            [signer.toBuffer(), new TextEncoder().encode(movie.title)],
            new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )
        const accounts = [{
             pubkey:signer,
             isSigner:true,
             isWritable:false
         },
         {
             pubkey:pda,
             isSigner:false,
             isWritable:true
         },
         {
             pubkey:SystemProgram.programId,
             isSigner:false,
             isWritable:false,
         }
     
     ]
        const instruction = new TransactionInstruction({
            keys:accounts,
            data:instructionData,
            programId:movieKey,
        })
        transaction.add(instruction)
        try{

            const result = await sendTransaction(transaction,connection)
            toast({
                status:'success',
                title:'Review submitted !',
                description:<a rel="noreferrer" href={`https://explorer.solana.com/tx/${result}?cluster=devnet`} target='_blank'>Click here to see details</a>
            })
            console.log(result)
        }catch(err:any){
            toast({
                title:err.message,
                status:'error'
            })
        }

    }

    return(
        <Flex w='100vw' h='100vh' bgColor='blackAlpha.900' justify='center' align='center'>
            <Flex color='white' gap='2rem' p='4rem' border='1px solid white' borderRadius='15px' w='30rem' minH='20rem' justify='center' flexDir='column' align='center'>
                <Flex>
                    <WalletMultiButtonDynamic />
                </Flex>
                <Flex textAlign='center'>
                    <Text>
                        In this series, i worked about seralising data and sending it. I&apos;ve done it with like &apos;Movie Review&apos;system. You can enter the movie name and your review, after that you can rate it like 5 or 2 or 1 idk.
                    </Text>
                </Flex>
                <Flex w='100%'>
                    <MovieReviewForm onGetData={reviewHandler}/>
                </Flex>
            </Flex>

        </Flex>
    )

}


export default Serialize