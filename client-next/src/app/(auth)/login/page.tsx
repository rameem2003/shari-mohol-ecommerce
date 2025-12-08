import Container from "@/components/common/Container";
import React from "react";
import LoginForm from "./LoginForm";
import { userRequest } from "@/api/auth-api";

const page = async () => {
  let data = await userRequest();
  console.log("user data in login page:", data);
  return (
    <>
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};

export default page;
