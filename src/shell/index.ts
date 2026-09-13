import type { ReactNode } from "react";
import type { NavigationModel } from "../navigation/types.ts";

export type NiteOwlShellUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type NiteOwlAppShellProps = {
  appId: string;
  appTitle: string;
  navigation: NavigationModel;
  user: NiteOwlShellUser;
  children: ReactNode;
};
