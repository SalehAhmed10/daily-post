"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SignIn() {
  const productionUrlRedirect = "https://daily-post-app.vercel.app/dashboard";
  const developmentUrlRedirect = "http://localhost:3000/dashboard";

  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return (
    <div className="main-tag flex flex-col justify-center items-center gap-5">
      <Button
        variant={"outline"}
        size={"default"}
        className="flex items-center gap-2"
        // sign in google callback
        onClick={() =>
          // signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
          // signin with google and redirect to dashboard page after signin success if error redirect to signin page again if app is in production mode then redirect to production url else redirect to localhost url for development   mode process.env.NODE_ENV === "production" ? "https://next-auth-example.vercel.app/dashboard" : "http://localhost:3000/dashboard" if error redirect to signin page again
          signIn("google", {
            callbackUrl:
              process.env.NODE_ENV === "production"
                ? `${productionUrlRedirect}`
                : `${developmentUrlRedirect}`,
          })
        }
      >
        <span className="text-[20px]">
          <FcGoogle />
        </span>
        Google Sign-In
      </Button>

      <Button
        variant={"outline"}
        size={"default"}
        className="flex items-center gap-2 "
        // sign in google callback
        onClick={() =>
          signIn("github", {
            callbackUrl:
              process.env.NODE_ENV === "production"
                ? `${productionUrlRedirect}`
                : `${developmentUrlRedirect}`,
          })
        }
      >
        <span className="text-[20px]">
          <FaGithub />
        </span>
        Github Sign-In
      </Button>
    </div>
  );
}

export default SignIn;
