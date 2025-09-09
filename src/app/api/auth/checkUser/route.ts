import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "../../../lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore =await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No token" }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as {
        id: number;
        name: string;
        email: string;
      };
    } catch (error) {
      console.log(error)
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
    }

    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, name, email, phone_number, address, role 
       FROM "Users" WHERE id = $1`,
      [decodedToken.id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    return NextResponse.json(
      {
        success: true,
        message: "User verified successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in checkUser --> ", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
