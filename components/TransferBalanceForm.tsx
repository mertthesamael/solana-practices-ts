import { Button, Input, Link, Toast, useToast } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"





const TransferBalanceForm = () => {

    const {connection} = useConnection()

    const {publicKey:signer, sendTransaction} = useWallet()
    const toast = useToast()
    const transferBalance = async(e:any) => {
        e.preventDefault()

        if(!signer || !connection){
            toast({
                title:'Please connect your wallet',
                status:'warning'
            })
            return null
        }

        try{

            
            const toPublicKey:PublicKey = new PublicKey(e.target.transferAddress.value)
            const amount = e.target.amount.value
            const tsx = new Transaction()
            
            
            
            const tsxInstruction = SystemProgram.transfer({
                fromPubkey:signer,
                toPubkey:toPublicKey,
                lamports:LAMPORTS_PER_SOL*amount,
            })
            
            tsx.add(tsxInstruction)
            
            const result = await sendTransaction(tsx,connection)
            console.log(result)
            toast({
                title:'Transfer Completed !',
                description: <Link textDecor={'underline'} href={`https://explorer.solana.com/tx/${result}?cluster=devnet`} target={'_blank'}>Click here to see tsx details</Link>,
                status:'success'
            })
            
        }catch(err:any){
            console.log()
            toast({
                title:err.message,
                status:'warning'
            })
        }
            
        }
        
        return(
            <form style={{width:'100%', display:'flex', flexDirection:'column', gap:'1rem'}} onSubmit={transferBalance}>
            <Input placeholder='Transfer Address' name='transferAddress' />
            <Input placeholder='amount' name='amount' />
            <Button type='submit' colorScheme='purple'>Transfer !</Button>
        </form>
    )

}


export default TransferBalanceForm;