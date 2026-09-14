import { SquareTerminalIcon } from "lucide-react";

export type AppSidebarIdentityProps = {
  href: string;
  brand?: string;
  appName: string;
  onNavigate?: () => void;
};

export function AppSidebarIdentity({
  href,
  brand = "NiteOwl.dev",
  appName,
  onNavigate,
}: AppSidebarIdentityProps) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="flex h-12 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding,color] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0!"
    >
      <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <SquareTerminalIcon className="size-4" aria-hidden="true" />
      </div>
      <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
        <span className="truncate font-semibold">{brand}</span>
        <span className="truncate text-xs">{appName}</span>
      </div>
    </a>
  );
}
