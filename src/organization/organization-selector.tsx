import { Building2Icon, ChevronDownIcon } from "lucide-react";
import type { ChangeEvent } from "react";

import type { NiteOwlOrganization } from "./index.ts";

export type OrganizationSelectorProps = {
  organizations: NiteOwlOrganization[];
  value?: string | null;
  onValueChange: (organizationId: string) => void;
  title?: string;
  description?: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function OrganizationSelector({
  organizations,
  value,
  onValueChange,
  title = "Organization",
  description,
  placeholder = "Select organization",
  loading = false,
  disabled = false,
  className,
}: OrganizationSelectorProps) {
  const isDisabled = disabled || loading || organizations.length === 0;
  const selectValue = value ?? "";
  const emptyLabel = loading
    ? "Loading organizations…"
    : organizations.length === 0
      ? "No organizations"
      : placeholder;

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value) {
      onValueChange(event.target.value);
    }
  }

  return (
    <section
      className={[
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col gap-1.5 p-6 pb-4">
        <div className="flex items-center gap-2">
          <Building2Icon className="size-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="font-semibold leading-none tracking-tight">{title}</h2>
        </div>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className="p-6 pt-0">
        <div className="relative">
          <select
            aria-label={title}
            value={selectValue}
            disabled={isDisabled}
            onChange={handleChange}
            className="flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              {emptyLabel}
            </option>
            {organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
