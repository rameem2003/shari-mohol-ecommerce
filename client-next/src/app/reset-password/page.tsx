import React, { Suspense } from "react";
import Container from "@/components/common/Container";
import ResetPasswordComponent from "./ResetPasswordComponent";
export const dynamic = "force-dynamic";

const page = () => {
  return (
    <Suspense
      fallback={
        <main>
          <Container>
            <div className=" min-h-[900px] flex items-center justify-center flex-col">
              <h2 className=" font-cd-bangla text-[36px] font-extrabold text-cd-primary text-center">
                Verifying Reset Token...
              </h2>
              <p className="text-gray-600 mt-4 font-cd-bangla text-center">
                Verifying your reset token. Please wait.
              </p>
            </div>
          </Container>
        </main>
      }
    >
      <ResetPasswordComponent />
    </Suspense>
  );
};

export default page;
