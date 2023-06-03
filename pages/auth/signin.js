// import { getCsrfToken } from "next-auth/react";
// import Link from "next/link";

// // you normally would send a login form here and try to handle the incoming query params a bit more
// //but here we just send a simple 401 message
// function SignIn({ csrfToken }) {
//   return (
//     <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
//       <div
//         className="container flex flex-col items-center justify-center px-5 mx-auto my-8"
//         bis_skin_checked="1"
//       >
//         <div className="max-w-md text-center" bis_skin_checked="1">
//           <h2 className="w-full mb-8 font-extrabold text-9xl dark:text-gray-600 flex items-center flex-col">
//          401   <span className="w-full font-bold text-5xl">UNAUTHORIZED ACCESS</span>
//           </h2>
//           <p className="text-2xl font-semibold md:text-2xl">
//           You are not authorized to view this page.
//           </p>
//           <p className="mt-4 mb-8 dark:text-gray-400">
//             But dont worry, you can find plenty of other things on our homepage.
//           </p>
//           <Link
//             rel="noopener noreferrer"
//             href="/"
//             className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600  px-8 py-4 "
//           >
//             Back to homepage
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
// // you can display a login form here to re-validate credentials like below or display an error page like above

// // export default function SignIn({ csrfToken }) {
// //   return (
// //     <form method="post" action="/api/auth/callback/credentials">
// //         <h1 className="text-center leading">UnAuthorized Access!!</h1>
// //       <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
// //       <label>
// //         Username
// //         <input name="username" type="text" />
// //       </label>
// //       <label>
// //         Password
// //         <input name="password" type="password" />
// //       </label>
// //       <button type="submit">Sign in</button>
// //     </form>
// //   )
// // }
// export default SignIn;

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }