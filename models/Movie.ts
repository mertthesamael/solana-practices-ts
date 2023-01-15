import * as borsh from "@project-serum/borsh"
import { timeStamp } from "console";



export class Movie{
    title: string;
	rating: number;
	description: string;

	

        static borshAccountSchema = borsh.struct([
		borsh.bool('initialized'),
		borsh.u8('rating'),
		borsh.str('title'),
		borsh.str('description'),
	])
    serialize(){
        const tempBuffer = Buffer.alloc(5000)
        Movie.borshAccountSchema.encode({variant:0, ...this},tempBuffer)

        return tempBuffer.subarray(0,Movie.borshAccountSchema.getSpan(tempBuffer))
    }
	static deserialize(buffer?: Buffer): Movie|null {
		if (!buffer) {
			return null
		}

		try {
			const { title, rating, description } = this.borshAccountSchema.decode(buffer)
			return new Movie(title, rating, description)
		} catch(error) {
			console.log('Deserialization error:', error)
			return null
		}
	}

    constructor(title: string, rating:number, description:string){
        this.title = title;
        this.rating = rating;
        this.description = description;
    }


} 