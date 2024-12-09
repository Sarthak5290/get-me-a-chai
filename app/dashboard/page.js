"use client"; // For client-side rendering
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Dashboard from "../componenets/Dashboard"

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  // Show loading message until session status is determined
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dashboard></Dashboard>
    </>
  );
};

export default Page;
