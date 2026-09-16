import { ChevronDownIcon, ListFilterIcon } from "lucide-react";
import type { ChangeEvent, ComponentType } from "react";

import type { NiteOwlSelectableResource } from "./types.ts";

export type ResourceSelectorProps = {
  resources: NiteOwlSelectableResource[];
  value?: string | null;
  onValueChange: (resourceId: string) => void;
  title?: string;
  description?: string;
  placeholder?: string;
  emptyLabel?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: "card" | "compact";
  className?: string;
  selectClassName?: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
};

export function ResourceSelector({
  resources,
  value,
  onValueChange,
  title = "Selection",
  description,
  placeholder = "Select an option",
  emptyLabel = "No options",
  loadingLabel = "Loading…",
  loading = false,
  disabled = false,
  variant = "card",
  className,
  selectClassName,
  icon: Icon = ListFilterIcon,
}: ResourceSelectorProps) {
  const isDisabled = disabled || loading || resources.length === 0;
  const selectValue = value ?? "";
  const resolvedEmptyLabel = loading
    ? loadingLabel
    : resources.length === 0
      ? emptyLabel
      : placeholder;

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value) onValueChange(event.target.value);
  }

  const select = (
    <div className={variant === "compact" ? className : undefined}>
      <div className="relative">
        <select
          aria-label={title}
          value={selectValue}
          disabled={isDisabled}
          onChange={handleChange}
          className={[
            "flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            selectClassName,
          ].filter(Boolean).join(" ")}
        >
          <option value="" disabled>{resolvedEmptyLabel}</option>
          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>{resource.name}</option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  );

  if (variant === "compact") return select;

  return (
    <section className={["rounded-xl border bg-card text-card-foreground shadow-sm", className].filter(Boolean).join(" ")}>
      <div className="flex flex-col gap-1.5 p-6 pb-4">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="font-semibold leading-none tracking-tight">{title}</h2>
        </div>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="p-6 pt-0">{select}</div>
    </section>
  );
}
