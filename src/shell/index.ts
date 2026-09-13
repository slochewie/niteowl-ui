import type { ReactNode } from "react";
import type { NavigationModel } from "../navigation/types.ts";
import type { NiteOwlOrganizationSelection } from "../organization/index.ts";

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
  organizationSelection?: NiteOwlOrganizationSelection;
  children: ReactNode;
};
