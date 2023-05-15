import React from "react";
import Button from "./Button";
import { signIn } from "next-auth/react";

const NotAuth = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
      <div className="grid gap-8">
        <p className="text-3xl">Not Authenticated...</p>
        <Button
          className="text-3xl"
          size="large"
          normalCase
          onClick={() => void signIn("google")}
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default NotAuth;
