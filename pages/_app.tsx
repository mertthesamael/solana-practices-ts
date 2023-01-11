import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react"
import {ConnectionProvider, WalletContext, WalletProvider} from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletModal, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js'

import WalletContextProvider from '../components/WalletContextProvider'
export default function App({ Component, pageProps }: AppProps) {
  const endpoint = clusterApiUrl('devnet')
  const wallet = new PhantomWalletAdapter();
  return(

<WalletContextProvider>
    <ChakraProvider>
<Component {...pageProps} />
  </ChakraProvider>
</WalletContextProvider>

)
}
