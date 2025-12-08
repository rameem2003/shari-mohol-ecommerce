"use client";
import React from "react";

const notfound = () => {
  return (
    <main className="grid h-screen place-items-center bg-shari-mohol-primary px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-cd-bangla font-semibold text-white">
          We apologize for the inconvenience
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight font-cd-bangla text-balance text-white sm:text-7xl">
          404 - Page Not Found
        </h1>
        <p className="mt-6 text-lg font-medium font-cd-bangla text-pretty text-gray-400 sm:text-xl/8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md font-cd-bangla bg-white px-3.5 py-2.5 text-base font-semibold text-cd-primary shadow-xs  "
          >
            Go back home <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="/contact"
            className="text-base font-cd-bangla font-semibold text-white"
          >
            Contact us for support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default notfound;
