import { Button, Input } from "@chakra-ui/react"
import { FC } from "react"







const MovieReviewForm = ({onGetData}:any) => {


    const movieFormHandler = (e:any) => {
        e.preventDefault()

        return onGetData({
            name:e.target.movieName.value,
            review:e.target.review.value,
            rate:Number(e.target.rating.value)
        })
    }
    
    return(
        <form style={{width:'100%', display:'flex', flexDirection:'column', gap:'1rem'}} onSubmit={movieFormHandler}>
            <Input type='text' placeholder='Movie Name' name='movieName'/>
            <Input type='text' placeholder='Review' name='review'/>
            <Input name='rating' placeholder='Rating' type='number'/>
            <Button type="submit" colorScheme='purple'>Submit Review !</Button>
        </form>
    )
}



export default MovieReviewForm