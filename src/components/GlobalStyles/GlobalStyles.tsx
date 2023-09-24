import "./GlobalStyles.scss";

import React from "react";

import { GlobalStylesProps } from "@/Models/GlobalStylesProps";

/**
 *
 */
const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => (
  <>{children}</>
);

export default GlobalStyles;
