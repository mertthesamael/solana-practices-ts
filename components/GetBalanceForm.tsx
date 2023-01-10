import { Button, Input } from "@chakra-ui/react";
import { HtmlHTMLAttributes, useState } from "react";
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js'



const GetBalanceForm = ({onGetData}:any) => {

  

    const getBalance = (e:any) => {
        e.preventDefault()
       return onGetData(e.target.address.value)
    }

    return(
        <form style={{display:'flex', width:'100%', flexDirection:'column', gap:'2rem'}} onSubmit={getBalance}>
            <Input placeholder='Enter an address' name='address'></Input>
            <Button type='submit' colorScheme='purple'>Get Balance !</Button>
        </form>
    )

}


export default GetBalanceForm;