import "./GlobalStyles.scss";
import { GlobalStylesProps } from "@/Models/GlobalStylesProps";

const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
    return <>{children}</>;
};

export default GlobalStyles;
