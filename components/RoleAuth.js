// // middleware/roleAuthorization.js

// import User from '@models/User'; // Replace with the correct path to the User model
// import Roles from '@components/Roles'; // Replace with the correct path to the roles.js file

// const roleAuthorization = (requiredRoles) => async (req, res, next) => {
//   try {
//     // Retrieve the user's role from the database
//     const user = await User.findById(req.session.userId);

//     // Check if the user has the required role(s)
//     if (!user || !requiredRoles.includes(user.role)) {
//       throw new Error('Unauthorized');
//     }

//     // Continue to the next middleware if authorization is successful
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// export default roleAuthorization;
