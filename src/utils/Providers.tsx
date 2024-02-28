"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function Provider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <div className="">
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </>
  );
}
