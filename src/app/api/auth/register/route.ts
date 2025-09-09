import {NextResponse , NextRequest} from "next/server"
import pool from "../../../lib/database"
import {transporter} from "../../../lib/mailer"

export async function POST(req:NextRequest){
  try{
    const {name,email,password,phone_number,address} = await req.json();


    if (!name || !password || !email) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const existingUser = await client.query(`SELECT * FROM "Users" where email=$1`,[email]);

    if(existingUser.rows.length > 0){
      client.release();
      return NextResponse.json(
        {success:false,message:"User already exists"},
        {status:400}
      );
    }

    const newUser = await client.query(`INSERT INTO "Users" (name,email,password,phone_number,address,role) VALUES ($1,$2,$3,$4,$5,'customer') RETURNING id , name , email , phone_number , address , role `,[name,email,password,phone_number,address]);
    client.release();

    const mailOption = {
      from: `"TheGentsEdit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to TheGentsEdit 🛍️",
      text: `Hello ${name}, Welcome to TheGentsEdit! Your account has been created successfully. Start Editing Yourself Now, because Clothes are a Gent's Makeup.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h1 style="color: #2c3e50;">Hello ${name}, 👋</h1>
          <h2 style="color:#4CAF50;">Welcome to <b>The Gents Edit</b> 🛍️</h2>
    
          <p style="font-size: 16px; line-height: 1.6;">
            We’re excited to have you with us! 🎉  
            <br/>Your account has been created successfully, and now it’s time to start editing yourself — because <b>Clothes are a Gent’s Makeup</b>.
          </p>
    
          <p style="font-size: 16px; line-height: 1.6;">
            Here’s what you’ll love at <b>The Gents Edit</b>:
          </p>
          <ul style="font-size: 15px; line-height: 1.8; color: #555;">
            <li>🛍️ Access to curated collections designed for modern gentlemen</li>
            <li>🚚 Free & fast delivery on orders above $49</li>
            <li>💳 Easy, secure checkout</li>
            <li>📦 Hassle-free returns & exchanges within 7 days</li>
          </ul>
    
          <p style="font-size: 16px; line-height: 1.6;">
            Ready to explore? Click below and begin your journey:
          </p>
    
          <div style="margin: 30px 0; text-align: center;">
            <a href="https://thegentsedit.com" 
               style="background-color: #4CAF50; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px;">
               Start Exploring
            </a>
          </div>
    
          <p style="font-size: 14px; color: #777;">
            Cheers,<br/>
            The Gents Edit Team
          </p>
        </div>
      `,
    };
    
    await transporter.sendMail(mailOption);
    

    return NextResponse.json({
      success:true,
      message:"User Created Successfully",
      user:newUser.rows[0]
    });

  }
  
  catch(error){
    console.log(error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
