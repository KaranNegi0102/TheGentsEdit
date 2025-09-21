import { NextResponse,NextRequest } from "next/server";

export function middleware(req:NextRequest){
  const token = req.cookies.get("auth_token")?.value

  const {pathname}=req.nextUrl;

  const isProtected=
  pathname.startsWith("/Profile") ||
  pathname.startsWith("/Cart") ||
  pathname.startsWith("/PlaceOrder") ||
  pathname.startsWith("/orders") ||
  pathname.startsWith("/Wishlist");

  const isPublic=
  pathname === "/login" || pathname === "/register";

  // console.log("this is my token in middle ware",token)


  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:[
    "/Profile",
    "/Cart",
    "/Wishlist",
    "/PlaceOrder",
    "/orders"
    // "/Login",
    // "/register"
  ]
}