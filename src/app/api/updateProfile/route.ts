import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import pool from "../../lib/database";


interface userData{
  id:string;
  name:string;
  email:string;
  phone_number:string;
  address:string;
  role:string;
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as userData;

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.id;

    const { name, email, phone_number, address } = await req.json();
    // console.log("this is my details form ",name,email,phone_number,address)

    await pool.query(
      `UPDATE "Users" SET name=$1,email=$2,phone_number=$3,address=$4 WHERE id=$5 RETURNING *`,
      [name, email, phone_number, address, userId]
    );

    const userData = {
      name,
      email,
      phone_number,
      address,
    };

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      userData
    });


  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
