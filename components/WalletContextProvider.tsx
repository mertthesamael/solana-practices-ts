
import { FC, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css'

const WalletContextProvider: FC<{ children:any }> = ({ children }) => {
  const endpoint = web3.clusterApiUrl('devnet')
  const wallets:any = new walletAdapterWallets.PhantomWalletAdapter()

	return (
		<ConnectionProvider endpoint={endpoint}>
	    <WalletProvider wallets={[wallets]}>
	      <WalletModalProvider>
	        { children }
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
	)
}

export default WalletContextProvider