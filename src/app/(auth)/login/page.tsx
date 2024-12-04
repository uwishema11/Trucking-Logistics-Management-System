import LoginPage from "@/components/auth/SignIn";
import SessionWrapper from "@/lib/SessionWrapper";

function Login() {
  return (
    <SessionWrapper>
      <LoginPage />
    </SessionWrapper>
  );
}

export default Login;
