import { MongoClient } from "mongodb";
import {  NextResponse } from "next/server";
export async function GET(request) {

   const uri = "mongodb+srv://mongodb:nadurhtCiV7zJvwF@cluster0.7mfe3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 const client = new MongoClient(uri);
  try{
     const database = client.db('arund');
     const movies = database.collection('repository');

     const query = { };
     const movie = await movies.find(query).toArray;    
     console.log(movie);
     return NextResponse.json({"a":24, movie})

  } finally{
     await client.close();
  }

}