import React from "react";

export const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
  children,
}) => <button>{children}</button>;
