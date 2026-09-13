export type NiteOwlOrganization = {
  id: string;
  name: string;
  slug?: string | null;
  logo?: string | null;
  secondaryText?: string | null;
};

export type NiteOwlOrganizationSelection = {
  organizations: NiteOwlOrganization[];
  selectedOrganizationId?: string | null;
  onSelectOrganization?: (organizationId: string) => void;
};
