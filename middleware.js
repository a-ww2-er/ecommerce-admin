import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

//this is where most of the magic happens
//but note it wouldnt have been possible if we didnt setup our registeration details correctly
//if we didnt ask in the form "are you an admin" we wouldnt get the required data to authorize users

//here we check if its an admin thats accessing our page
export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === "/admins" && !!!req.nextauth.token?.isAdmin) {
      return new NextResponse("401 UnAuthorized Access!");
    }
  },
  {
    //this callback is what helps us to check the user details and tell apart "is admin" from "not admin"
    callbacks: {
      authorized: (params) => {
        return !!params.token?.isAdmin;
      },
    },
  }
);

//add in any page ypu want only admins to access in here..
export const config = {
  matcher: ["/admin", "/products", "/categories", "/orders"],
};
