import React from "react";
import { PropsWithChildren } from "react";

export default function ClientPageContainer({ children }: PropsWithChildren) {
  return (
    <div className="container-2xl flex items-center justify-center">
      {children}
    </div>
  );
}
