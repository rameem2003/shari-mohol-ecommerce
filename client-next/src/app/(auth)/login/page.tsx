import React from "react";
import Container from "@/components/common/Container";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { userRequest } from "@/api/auth-query";
export const dynamic = "force-dynamic";

const page = async () => {
  return (
    <>
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};

export default page;
