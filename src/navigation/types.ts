import type { ComponentType, ReactNode, SVGProps } from "react";

export type NavigationIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon?: NavigationIcon;
  iconNode?: ReactNode;
  active?: boolean;
  external?: boolean;
  disabled?: boolean;
};

export type NavigationSection = {
  id: string;
  label?: string;
  items: NavigationItem[];
};

export type NavigationModel = {
  primary: NavigationSection[];
  apps: NavigationSection[];
  settings: NavigationSection[];
};
