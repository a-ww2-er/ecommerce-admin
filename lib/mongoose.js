import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    console.log("Connecting to database...")
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri).then(() => {
      console.log("Database connected successfully");
    });
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

