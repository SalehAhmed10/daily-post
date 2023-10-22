"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SignIn() {
  return (
    <div className="main-tag flex flex-col justify-center items-center gap-5">
      <Button
        variant={"outline"}
        size={"default"}
        className="flex items-center gap-2"
        // sign in google callback
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
        }
      >
        <span className="text-[20px]">
          <FcGoogle />
        </span>
        Sign In Google
      </Button>

      <Button
        variant={"outline"}
        size={"default"}
        className="flex items-center gap-2 "
        // sign in google callback
        onClick={() =>
          signIn("github", { callbackUrl: "http://localhost:3000/dashboard" })
        }
      >
        <span className="text-[20px]">
          <FaGithub />
        </span>
        Sign In Github
      </Button>
    </div>
  );
}

export default SignIn;
