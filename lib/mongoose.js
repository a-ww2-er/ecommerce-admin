import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}

// export function mongooseConnect() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection;
//   } else {
//     const uri = process.env.MONGODB_URI;
//     return mongoose.connect(uri).catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
//   }
// }
