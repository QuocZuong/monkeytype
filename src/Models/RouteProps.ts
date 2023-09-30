import { ComponentType, ReactNode } from "react";

export interface RouteProps {
    path: string;
    component: ComponentType;
    layout?: ComponentType<{ children: ReactNode }> | null;
}
