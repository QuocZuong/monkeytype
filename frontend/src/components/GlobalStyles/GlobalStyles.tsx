import React from "react";

import "./GlobalStyles.scss";
import { GlobalStylesProps } from "@/Models/GlobalStylesProps";
/**
 * Global styles
 * It wrapper an App component to apply global css for all component
 * @param {ReactNode} children  get App component as a children
 * @returns {ReactNode} just return a component
 */
const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => <>{children}</>;

export default GlobalStyles;
