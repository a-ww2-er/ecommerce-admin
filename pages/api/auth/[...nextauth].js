import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

const adminEmails = ["joshua.asaya@gmail.com", "joshua.asaya2@gmail"];

// MODIFIED LINE OF CODE I ADDED

// let adminEmails = [];

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        mongooseConnect();

        const email = profile.email;
        const name = profile.name;
        const image = profile.picture;

        const exist_user = await User.findOne({ email });
        if (!exist_user) {
          return { id: profile.sub, name, email, image, isAdmin: false };
        }
        const update_user = await User.updateOne(
          { email },
          {
            $set: {
              name,
              image,
            },
          }
        );
        if (!exist_user.name) update_user();
        return {
          id: profile.sub,
          name,
          email,
          image,
          isAdmin: exist_user ? true : false,
        };
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],
  // adapter: MongoDBAdapter(clientPromise),

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
    async jwt({ token, user }) {
      const { name, email, image } = token;
      mongooseConnect();
      user = await User.findOne({ email });
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    session: async ({ session, token, user }) => {
      mongooseConnect();
      // console.log(session, user, token);
      const { name, email, image } = session.user;
      const LoggedInUser = await User.findOne({ email });
      const isAdmin = LoggedInUser?.isAdmin ? LoggedInUser.isAdmin : false;

      return {
        user: {
          name,
          email,
          image,
          isAdmin
        },
      };
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
  debug: true,
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
