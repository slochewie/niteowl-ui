import type { ReactNode } from "react";
import {
  BookOpenIcon,
  Building2Icon,
  CableIcon,
  CalendarDaysIcon,
  GaugeIcon,
  HandCoinsIcon,
  HistoryIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  NetworkIcon,
  PanelsTopLeftIcon,
  ScaleIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
  SquareTerminalIcon,
  UserCircleIcon,
  UsersIcon,
} from "lucide-react";

export type NavigationIconOverrides = Record<string, ReactNode>;

export type NiteOwlNavigationIconProps = {
  icon: string;
  overrides?: NavigationIconOverrides;
};

export function NiteOwlNavigationIcon({ icon, overrides }: NiteOwlNavigationIconProps) {
  const override = overrides?.[icon];
  if (override !== undefined) return override;

  switch (icon) {
    case "book-open": return <BookOpenIcon />;
    case "building-2": return <Building2Icon />;
    case "cable": return <CableIcon />;
    case "calendar-days": return <CalendarDaysIcon />;
    case "gauge": return <GaugeIcon />;
    case "hand-coins": return <HandCoinsIcon />;
    case "history": return <HistoryIcon />;
    case "landmark": return <LandmarkIcon />;
    case "layout-dashboard": return <LayoutDashboardIcon />;
    case "network": return <NetworkIcon />;
    case "panels-top-left": return <PanelsTopLeftIcon />;
    case "scale": return <ScaleIcon />;
    case "scroll-text": return <ScrollTextIcon />;
    case "shield-check": return <ShieldCheckIcon />;
    case "square-terminal": return <SquareTerminalIcon />;
    case "user-circle": return <UserCircleIcon />;
    case "users": return <UsersIcon />;
    default: return null;
  }
}
