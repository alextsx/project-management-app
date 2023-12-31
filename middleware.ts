import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JwtUserType } from "./global";
const PUBLIC_FILE = /\.(.*)$/;

const validateJWT = async (jwt: string | Uint8Array) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload.payload as JwtUserType
};

export default async function middleware(
    req: NextRequest,
    res: NextResponse
) {
    const { pathname } = req.nextUrl;
    if(
        pathname.startsWith('/_next')
        || pathname.startsWith('/api')
        || pathname.startsWith('/static')
        || pathname.startsWith('/signin')
        || pathname.startsWith('/register')
        || PUBLIC_FILE.test(pathname)
    ){
        return NextResponse.next();
    }

    const jwt = req.cookies.get(process.env.COOKIE_NAME ?? 'jwt');

    if(!jwt){
        req.nextUrl.pathname = "/signin"
        return NextResponse.redirect(req.nextUrl)
    }

    try{
        await validateJWT(jwt.value);
        return NextResponse.next();
    }catch(err){
        console.log(err);
        req.nextUrl.pathname = "/signin"
        return NextResponse.redirect(req.nextUrl)
    }
}