import dynamic from 'next/dynamic';
const WalletMultiButtonDynamic = () => {

// I HATE FRONTEND DEVELOPMING
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);
return(
    <WalletMultiButtonDynamic/>
)
}

export default WalletMultiButtonDynamic