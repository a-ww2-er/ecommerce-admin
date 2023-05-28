import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
// import {User} from '@models/User'


const adminEmails = ['joshua.asaya@gmail.com'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    
    
    // Providers.Credentials({
    //   async authorize(credentials) {
    //     // Add your own logic to validate user credentials
    //     const user = await User.findOne({ email: credentials.email });

    //     if (user && user.password === credentials.password) {
    //       // Return the user object if authentication is successful
    //       return user;
    //     }

    //     // Return null or throw an error if authentication fails
    //     return null;
    //   },
    // }),
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
  callbacks: {
    session: ({session,token,user}) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
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