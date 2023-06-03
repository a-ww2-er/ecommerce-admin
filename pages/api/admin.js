// import { mongooseConnect } from '@/lib/mongoose';
// import { getServerSession } from '@/pages/api/auth/[...nextauth]';


// export default async function handler(req, res) {
//   const { method } = req;
//   await isAdminRequest(req, res, method);
// }

// export async function isAdminRequest(req, res, method) {
//   const { db: connection } = await mongooseConnect();
//   const admins = await connection.collection('admins').find().toArray();
//   const adminEmails = admins.map((admin) => admin.email);

//   const session = await getServerSession(req, res);

//   if (!adminEmails.includes(session?.user?.email)) {
//     res.status(401);
//     res.end();
//     throw new Error('Not an admin');
//   }

//   if (method === 'POST') {
//     const { email } = req.body;
//     const { db } = await mongooseConnect();

//     try {
//       // Insert the admin email into the collection
//       await db.collection('admins').insertOne({ email });
//       res.status(201).json({ message: 'Admin email added successfully!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to add admin email.' });
//     }
//   } else if (method === 'GET') {
//     const { db } = await mongooseConnect();

//     try {
//       // Fetch all admin emails from the collection
//       const admins = await db.collection('admins').find().toArray();
//       const adminEmails = admins.map((admin) => admin.email);
//       res.status(200).json({ adminEmails });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to fetch admin emails.' });
//     }
//   } else if (method === 'DELETE') {
//     const { email } = req.query;
//     const { db } = await mongooseConnect();

//     try {
//       console.log('Deleting admin email:', email);
//       // Delete the admin email from the collection
//       const deleteResult = await db.collection('admins').deleteOne({ email });
//       console.log('Delete result:', deleteResult);

//       if (deleteResult.deletedCount === 1) {
//         res.status(200).json({ message: 'Admin email deleted successfully!' });
//       } else {
//         res.status(404).json({ message: 'Admin email not found.' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to delete admin email.' });
//     }
//   } else {
//     res.status(400).json({ message: 'Invalid request method.' });
//   }
// }


import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]';
import NextAuth, {getServerSession} from 'next-auth'
// import { authOptions } from '@pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  const { method } = req;
  await isAdminRequest(req, res);
  // export async function isAdminRequest(req, res) {
  // const { db } = await mongooseConnect();
  // const admins = await db.collection('admins').find().toArray();
  const { db } = await mongooseConnect();
  const admins = await db.collection('admins').find().toArray();
  const adminEmails = admins.map((admin) => admin.email);

  const session = await getServerSession(req, res, authOptions);

  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }

  if (method === 'POST') {
    const { email } = req.body;
    const { db } = await mongooseConnect();

    try {
      // Insert the admin email into the collection
      await db.collection('admins').insertOne({ email });
      res.status(201).json({ message: 'Admin email added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add admin email.' });
    }
  } else if (method === 'GET') {
    const { db } = await mongooseConnect();

    try {
      // Fetch all admin emails from the collection
      const admins = await db.collection('admins').find().toArray();
      const adminEmails = admins.map((admin) => admin.email);
      res.status(200).json({ adminEmails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch admin emails.' });
    }
  } else if (method === 'DELETE') {
    const { email } = req.query;
    const { db } = await mongooseConnect();

    try {
      console.log('Deleting admin email:', email);
      // Delete the admin email from the collection
      const deleteResult = await db.collection('admins').deleteOne({ email });
      console.log('Delete result:', deleteResult);

      if (deleteResult.deletedCount === 1) {
        res.status(200).json({ message: 'Admin email deleted successfully!' });
      } else {
        res.status(404).json({ message: 'Admin email not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete admin email.' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method.' });
  }
}

