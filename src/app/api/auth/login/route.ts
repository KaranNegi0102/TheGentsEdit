import { NextResponse , NextRequest } from "next/server";
import pool from "../../../lib/database"
import jwt from "jsonwebtoken"


export async function POST(req:NextRequest){
  try{
    const {email,password} = await req.json();

    const client = await pool.connect();

    const result= await client.query(
      "SELECT * FROM \"Users\" where email=$1 AND password=$2",
      [email,password] 
    );

    client.release();

    const user = result.rows[0];

    const tokenPayload = {
      id:user.id,
      name:user.name,
      password:user.password,
      email:user.email,
      phone_number:user.phone_number,
      address:user.address,
      role:user.role,
    }

    const token = jwt.sign(tokenPayload,process.env.SECRET_KEY!,
      {
        expiresIn:"7d",
        algorithm:"HS256"
      }
    )

    const response = NextResponse.json({
      success:true,
      message:"User Exists",
      user
    })

    response.cookies.set({
      name:"auth_token",
      value:token,
      httpOnly:true,
      maxAge: 7 * 24 * 60 * 60,
      path: "/"
    })


    // return NextResponse.json({
    //   success: true,
    //   message: "User exists",
    //   user: result.rows[0]  
    // });
    
    return response;

  }
  catch(error){
    console.log(error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}