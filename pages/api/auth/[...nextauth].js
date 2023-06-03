import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'



const adminEmails = ['joshua.asaya@gmail.com','joshua.asaya2@gmail'];


// MODIFIED LINE OF CODE I ADDED

// let adminEmails = [];



export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET
          }),
  ],
  adapter: MongoDBAdapter(clientPromise),
 

  // callbacks: {
  //   session: async ({ session, token, user }) => {
  //     const { email } = user;
  
  //     if (adminEmails.includes(email)) {
  //       session.user.isAdmin = true; // Set the isAdmin property to true
  //     } else {
  //       session.user.isAdmin = false; // Set the isAdmin property to false
  //     }
  
  //     return session;
  //   },
  // },

  callbacks: {
    session: async ({ session, token, user }) => {
      session.user.isAdmin = adminEmails.includes(user.email);
      return session;
    },
  },
  
  // callbacks: {
  // session: async ({ session, token, user }) => {
  //   const db = await clientPromise;
  //   const admins = await db.collection('admins').find().toArray();
  //   const adminEmails = admins.map((admin) => admin.email);

  //   session.user.isAdmin = adminEmails.includes(user.email);
  //   return session;
  // },
// },

  
};

export default NextAuth(authOptions);

export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res,authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}