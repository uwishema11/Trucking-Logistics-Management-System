'use client'
import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;

  return (
    <>
      <h1>Hello {userName}</h1>
      <p>{userEmail}</p>
    </>
  );
}

export default Home;
