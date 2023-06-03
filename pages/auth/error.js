// import { getProviders } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/router";

// //sending back different error messages based on query params
// const errors = {
//   Signin: "Try signing with a different account.",
//   OAuthSignin: "Try signing with a different account.",
//   OAuthCallback: "Try signing with a different account.",
//   OAuthCreateAccount: "Try signing with a different account.",
//   EmailCreateAccount: "Try signing with a different account.",
//   Callback: "Try signing with a different account.",
//   OAuthAccountNotLinked:
//     "To confirm your identity, sign in with the same account you used originally.",
//   EmailSignin: "Check your email address.",
//   CredentialsSignin:
//     "Sign in failed. Check the details you provided are correct.",
//   default: "Unable to sign in.",
// };
// const SignInError = ({ error }) => {
//   const errorMessage = error && (errors[error] ?? errors.default);
//   return <div>{errorMessage}</div>;
// };
// const SignIn = ({ providers }) => {
//   const { error } = useRouter().query;
//   return (
//     <>
//       {/* Error message */}
    
// 	  <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
//       <div
//         className="container flex flex-col items-center justify-center px-5 mx-auto my-8"
//         bis_skin_checked="1"
//       >
//         <div className="max-w-md text-center" bis_skin_checked="1">
//           <h2 className="w-full mb-8 font-extrabold text-9xl dark:text-gray-600 flex items-center flex-col">
//          404   <span className="w-full font-bold text-5xl">  </span>
//           </h2>
//           <p className="text-2xl font-semibold md:text-3xl">
//          {error && <SignInError error={error} />}

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
//       {/* Login options  where we can specify a login option for a user to login again incase of error*/}

//       {/* {Object.values(providers).map((provider) => (
//         <div key={provider.name}>...</div>
//       ))} */}
//     </>
//   );
// };

// export default SignIn;
// export async function getServerSideProps(context) {
//   return { props: { providers: await getProviders() } };
// }