// import {mongooseConnect} from "@/lib/mongoose";
// import { User } from "@/models/User";

// //here we set up the register/signup endpoint
// async function handler(req, res) {
//     await mongooseConnect();
//   if (req.method !== 'POST') {
//     return;
//   }
//   const { name, email, password , isAdmin} = req.body;
//   //a little more form validation
//   if (
//     !name ||
//     !email ||
//     !email.includes('@') ||
//     !password ||
//     password.trim().length < 5
//   ) {
//     res.status(422).json({
//       message: 'Validation error',
//     });
//     return;
//   }
// //if user already exists
//   const existingUser = await User.findOne({ email: email });
//   if (existingUser) {
//     res.status(422).json({ message: 'User exists already!' });

//     return;
//   }
// //send back the user object if registeration is successful and save to mongodb

//   const newUser = new User({
//     name,
//     email,
//     password,
//     isAdmin,
//   });

//   const user = await newUser.save();
//   res.status(201).send({
//     message: 'Created user!',
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     isAdmin: user.isAdmin,
//   });
// }

// export default handler;