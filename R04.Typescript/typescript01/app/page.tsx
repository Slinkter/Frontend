"use client";

import React, { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;
type ButtonProps = Props & {
  dark?: boolean;
  variant?: "primary" | "secondary";
};

const CustonButton = ({ dark, variant, children }: ButtonProps) => {
  return <button>Button</button>;
};

const page = () => {
  return (
    <div>
      <CustonButton>click me</CustonButton>
    </div>
  );
};

export default page;
