import React from "react";
import Container from "@/components/common/Container";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { userRequest } from "@/api/auth-query";

const page = async () => {
  let data = await userRequest();
  console.log("user data in login page:", data);

  if (data?.success) {
    redirect("/");
    return;
  }

  return (
    <>
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};

export default page;
