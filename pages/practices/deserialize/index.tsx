import { Flex } from "@chakra-ui/react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js"
import { useEffect, useState } from "react"
import WalletMultiButtonDynamic from "../../../components/WalletMultiButtonDynamic"
import { Movie } from "../../../models/Movie"



const Deserialize = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()
    const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'
    useEffect(() => {
        connection.getProgramAccounts(new PublicKey(MOVIE_REVIEW_PROGRAM_ID))
        .then(async (accounts) => {
            const movies: Movie[] = accounts.reduce((accum: Movie[], { pubkey, account }) => {
                const movie = Movie.deserialize(account.data)
                if (!movie) {
                    return accum
                }

                return [...accum, movie]
            }, [])
            setMovies(movies.slice(0,50))
        })
    }, [])
    console.log(movies)
    return(
        <Flex color='white' w='100vw' h='100vh' justify='center' align='center' bgColor='black'>
            <Flex flexDir='column' justifyContent='center' gap='2rem' border='1px solid white' borderRadius='15px' justify='center' align='center' p='4rem' w='30rem' h='25rem'>
        <WalletMultiButtonDynamic />
        <Flex overflow='auto' gap='1rem' flexDir='column' w='100%'>
            {movies?.map((movie) => <Flex>{movie.title + " " + movie.rating + " "+ movie.description}</Flex>)}

        </Flex>
            </Flex>
        </Flex>
    )

}


export default Deserialize;