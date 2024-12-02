"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import styles from "./login.module.scss";

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Unexpected sign-in error:", error);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["form-section"]}>
        <div className={styles["form-header"]}>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your account</p>
        </div>
        <button
          type="button"
          className={styles.googleSignInButton}
          onClick={handleGoogleSignIn}
        >
          <span>
            <FcGoogle />
          </span>
          Continue with Google
        </button>
      </div>
      <div className={styles["image-section"]}></div>
    </div>
  );
};

export default LoginPage;
