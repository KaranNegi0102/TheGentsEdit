import { NextResponse } from "next/server";
import pool from "../../../../lib/database"



export async function GET(req: Request) {
  try {
    // Extract id from URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    const client = await pool.connect();

    const result = await client.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const product = result.rows[0];

    // Make sure images field is parsed as array
    if (product.images && typeof product.images === "string") {
      try {
        product.images = JSON.parse(product.images);
      } catch {
        product.images = [];
      }
    }

    return NextResponse.json({
      success: true,
      product
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
