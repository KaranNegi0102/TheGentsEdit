import { NextResponse, NextRequest } from "next/server";
import pool from "../../../lib/database";

export async function POST(req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const client = await pool.connect();
  try {
    const { userId } = await context.params;
    const { shipping_address, payment_method } = await req.json();

    if (!userId || !shipping_address || !payment_method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ab getting cart items
    const cartResult = await client.query(
      `SELECT c.product_id , c.quantity , p.price 
      FROM cart c 
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1`,
      [userId]
    );

    if (cartResult.rows.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // total amount calculate krna
    const subTotal = cartResult.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const tax = subTotal * 0.18;
    const totalAmount = subTotal+tax;

    await client.query("BEGIN");

    // ab order me insert krna h
    const orderResult = await client.query(
      `INSERT INTO orders (user_id,total_amount,shipping_address,payment_method) 
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [userId, totalAmount, shipping_address, payment_method]
    );

    const orderId = orderResult.rows[0].id;

    // ab insert krenge orderitem me
    for (const item of cartResult.rows) {
      await client.query(
        `INSERT INTO order_items (order_id , product_id,quantity,price)
        VALUES ($1,$2,$3,$4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // after order clear cart
    await client.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);

    await client.query("COMMIT");

    return NextResponse.json({
      success: true,
      order: {
        ...orderResult.rows[0],
        items: cartResult.rows,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const client = await pool.connect();

  try {

    const { userId } = await context.params;
    const result = await client.query(
      `
      SELECT 
        o.id AS order_id,
        o.total_amount,
        o.status,
        o.shipping_address,
        o.payment_method,
        o.created_at,
        json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'title', p.title,
            'brand', p.brand,
            'image', p.images[0]
          )
        ) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    return NextResponse.json({
      success: true,
      orders: result.rows,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
