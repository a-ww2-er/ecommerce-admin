import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return {
      clientPromise: Promise.resolve(mongoose.connection),
      adminCollection: mongoose.connection.db.collection("admins")
    };
  } else {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    return {
      clientPromise: mongoose.connection.asPromise(),
      adminCollection: mongoose.connection.db.collection("admins")
    };
  }
}


// import mongoose from "mongoose";

// export async function mongooseConnect() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.db; // Return the connected db object
//   } else {
//     const uri = process.env.MONGODB_URI;
//     await mongoose.connect(uri); // Wait for the connection to be established
//     return mongoose.connection.db; // Return the connected db object
//   }
// }

