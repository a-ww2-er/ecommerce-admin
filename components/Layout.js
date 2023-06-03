import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.replace("/unauthorized"); // Redirect non-admin users to an unauthorized page
    }
  }, [status, session, router]);

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <h1 style={{ fontSize: "3rem" }} className="mb-20">
            <b>Welcome back</b>
          </h1>
          <div>
            <button
              onClick={() => signIn("google")}
              className="bg-gray-400 text-white p-2 px-4 rounded-lg m-3"
            >
              Login with Google
            </button>
          </div>
          <h2>
            <b>__________OR__________</b>
          </h2>
          <div>
            <button
              onClick={() => signIn("apple")}
              className="bg-gray-400 text-white p-2 px-4 rounded-lg m-3"
            >
              Login with Apple
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return <div>Loading...</div>; // Show a loading indicator while checking the session
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
