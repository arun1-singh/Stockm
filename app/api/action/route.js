import { MongoClient } from "mongodb";
import {  NextResponse } from "next/server";

  export async function POST(request) {

    let {action,slug,intialQuantity} = await request.json()
    
  
     const uri = "mongodb+srv://ABCDE:RgC1kwW1eh1Yac7q@cluster0.7mfe3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
     const client = new MongoClient(uri);
     
      try{
         const database = client.db('stock');
         const inventory = database.collection('inventory');
         const filter = { slug:slug };   
         let newQuantity = action=="plus"? (parseInt(intialQuantity) + 1):(parseInt(intialQuantity) -1) 
         const updateDoc = {
       $set: {
        quantity: newQuantity
       },
      };
    const result = await inventory.updateOne(filter, updateDoc);

    return NextResponse.json({success: true, message:`${result.matchedCount} document(s) matched the filter , updated ${result.modifiedCount} document(s)`})
} finally {
    await client.close();
}
}
      