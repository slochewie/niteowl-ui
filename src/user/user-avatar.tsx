import { User2Icon } from "lucide-react";
import type { ReactNode } from "react";

export type NiteOwlAvatarUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
  displayUsername?: string | null;
};

export type NiteOwlUserAvatarProps = {
  user?: NiteOwlAvatarUser | null;
  fallback?: ReactNode;
  className?: string;
};

export function getUserInitials(user?: NiteOwlAvatarUser | null) {
  const nameParts = user?.name?.trim().split(/\s+/).filter(Boolean);

  if (nameParts?.length) {
    const firstInitial = nameParts[0]?.[0] ?? "";
    const lastInitial =
      nameParts.length > 1 ? (nameParts[nameParts.length - 1]?.[0] ?? "") : "";

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  const fallbackIdentity =
    user?.displayUsername?.trim() ||
    user?.username?.trim() ||
    user?.email?.split("@")[0]?.trim();

  return fallbackIdentity?.slice(0, 2).toUpperCase();
}

export function NiteOwlUserAvatar({
  user,
  fallback,
  className,
}: NiteOwlUserAvatarProps) {
  const initials = getUserInitials(user);

  return (
    <span
      className={["niteowl-user-avatar", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {user?.image?.trim() ? (
        <img src={user.image.trim()} alt="" />
      ) : (
        <span className="niteowl-user-avatar-fallback">
          {fallback || initials || <User2Icon />}
        </span>
      )}
    </span>
  );
}
