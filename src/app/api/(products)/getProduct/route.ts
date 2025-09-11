import {NextResponse} from "next/server"
import pool from "@/app/lib/database"

export async function  GET(){
  try{
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM products ORDER BY created_at DESC");

    client.release()
    return NextResponse.json({
      success:true,
      product:result.rows
    })

  }
  catch(error){
    console.log(error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}