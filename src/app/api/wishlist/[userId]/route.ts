import {NextResponse} from "next/server"
import pool from "../../../lib/database"

export async function GET(
  req:Request,
  context: { params: Promise<{ userId: string }> }
){
  try{
    const { userId } = await context.params;
    const result = await pool.query(`SELECT w.id , p.title, p.id as product_id , p.price , p.images , w.created_at FROM wishlist w JOIN products p ON w.product_id = p.id WHERE w.user_id = $1`,[userId])

    return NextResponse.json({wishlist:result.rows})
  }
  catch(error){
    console.error(error)
    return NextResponse.json({error:"Failed to fetch cart"},{status:500})
  }
}


export async function POST(
  req:Request,
  context: { params: Promise<{ userId: string }> }
){
  try{

    const { userId } = await context.params;
    const { productId }= await req.json();
  
    const result = await pool.query(
      `INSERT INTO wishlist (user_id, product_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, product_id) DO NOTHING
        RETURNING *`,
        [userId,productId]
    );
  
    return NextResponse.json({added:result.rows[0] ?? null});
  }
  catch(error){
    console.error("POST Wishlist Error:", error);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const { productId } = await req.json();

    console.log("this is my productId", productId);
    console.log("this is my userId", userId);


    await pool.query(
      `DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2`,
      [userId, productId]
    );

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("DELETE Wishlist Error:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}