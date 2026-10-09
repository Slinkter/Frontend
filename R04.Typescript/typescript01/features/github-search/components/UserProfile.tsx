"use client";

import React, { useState, type ReactNode } from "react";
import {
  MapPin,
  Link as LinkIcon,
  Building,
  Calendar,
  ExternalLink,
  Users,
  FolderGit2,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { type GitHubUser } from "@/features/github-search/api";
import { Card, Button } from "@/components/ui";
import {
  formatDeterministicDate,
  formatCompactNumber,
  getSafeExternalUrl,
} from "@/features/github-search/lib/formatters";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export function ProfileAvatar({
  avatarUrl,
  name,
}: {
  avatarUrl?: string | null;
  name: string;
}) {
  const [imageError, setImageError] = useState(false);
  const initial = name ? name.trim().charAt(0).toUpperCase() : "?";

  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 z-10 group">
      {/* Aro irisado exterior aurora */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500/40 via-purple-500/30 to-cyan-400/40 blur-xs transition-all duration-500 group-hover:scale-105 group-hover:blur-sm" />

      <div className="relative h-full w-full rounded-full border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] overflow-hidden shadow-xl flex items-center justify-center">
        {avatarUrl && !imageError ? (
          <Image
            src={avatarUrl}
            alt={name ? `Avatar de ${name}` : "Avatar de GitHub"}
            fill
            sizes="(max-width: 640px) 112px, 128px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center text-white font-black text-3xl select-none">
            {initial ? (
              <span>{initial}</span>
            ) : (
              <UserIcon className="h-10 w-10 opacity-80" />
            )}
          </div>
        )}
      </div>

      {/* Indicador de perfil activo con pulso sutil */}
      <span
        className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--glass-bg)] bg-emerald-500 shadow-md"
        role="status"
        aria-label="Perfil activo en GitHub"
        title="Perfil activo en GitHub"
      >
        <span className="h-2 w-2 rounded-full bg-white opacity-90 animate-ping" aria-hidden="true" />
      </span>
    </div>
  );
}

export function ProfileHeader({
  name,
  login,
  htmlUrl,
  bio,
}: {
  name: string | null | undefined;
  login: string;
  htmlUrl: string;
  bio: string | null | undefined;
}) {
  const displayName = name?.trim() || login;
  const cleanBio = bio?.trim();

  return (
    <div className="text-center space-y-3 w-full z-10 px-1">
      <div className="min-w-0">
        <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-1.5 text-[var(--text-primary)]">
          <span
            className="truncate max-w-[200px] sm:max-w-[230px]"
            title={displayName}
          >
            {displayName}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            asChild
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-sm"
          >
            <a
              href={htmlUrl || `https://github.com/${login}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Abrir perfil de ${displayName} en GitHub`}
              aria-label={`Abrir perfil de ${displayName} en GitHub (abre en una nueva pestaña)`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only"> (abre en una nueva pestaña)</span>
            </a>
          </Button>
        </h2>
        <p
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide truncate"
          title={`@${login}`}
        >
          @{login}
        </p>
      </div>

      {/* Bio con soporte para textos extra largos, saltos de línea y scroll estilizado */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--glass-border-subtle)] bg-[var(--glass-bg)] p-3 text-left backdrop-blur-md shadow-xs max-h-36 overflow-y-auto">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic break-words whitespace-pre-line">
          {cleanBio ||
            "Este desarrollador no ha añadido una biografía pública en su perfil de GitHub."}
        </p>
      </div>
    </div>
  );
}

export function ProfileMetadataItem({
  icon,
  text,
  href,
  title,
}: {
  icon: ReactNode;
  text: string;
  href?: string | null;
  title?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[var(--radius-lg)] border border-[var(--glass-border-subtle)] bg-[var(--glass-bg)] px-3 py-2 text-[var(--text-secondary)] backdrop-blur-md transition-all duration-200 hover:border-indigo-500/30 hover:bg-[var(--glass-bg-hover)] overflow-hidden">
      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-[var(--radius-md)] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" aria-hidden="true">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs font-medium text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 truncate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-sm"
            title={title || text}
          >
            {text}
            <span className="sr-only"> (abre en una nueva pestaña)</span>
          </a>
        ) : (
          <span
            className="block text-xs font-medium truncate"
            title={title || text}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProfileStats({
  publicRepos,
  followers,
  following,
}: {
  publicRepos: number;
  followers: number;
  following: number;
}) {
  const statItems = [
    {
      id: "repos",
      label: "Repos",
      value: publicRepos,
      icon: <FolderGit2 className="h-3 w-3 text-indigo-500 shrink-0" />,
      tooltip: `Repositorios públicos: ${publicRepos.toLocaleString("es-ES")}`,
      borderClass: "",
    },
    {
      id: "followers",
      label: "Followers",
      value: followers,
      icon: <Users className="h-3 w-3 text-emerald-500 shrink-0" />,
      tooltip: `Seguidores: ${followers.toLocaleString("es-ES")}`,
      borderClass: "border-x border-[var(--glass-border)]",
    },
    {
      id: "following",
      label: "Following",
      value: following,
      icon: <Users className="h-3 w-3 text-cyan-500 shrink-0" />,
      tooltip: `Siguiendo: ${following.toLocaleString("es-ES")}`,
      borderClass: "",
    },
  ];

  return (
    <div className="w-full grid grid-cols-3 gap-1.5 rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1.5 backdrop-blur-md text-center shadow-xs">
      {statItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-[var(--radius-lg)] ${item.borderClass} hover:bg-black/5 dark:hover:bg-white/5 transition-colors min-w-0`}
          title={item.tooltip}
        >
          <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <span className="text-base sm:text-lg font-black text-[var(--text-primary)] font-mono tabular-nums mt-0.5 truncate max-w-full">
            {formatCompactNumber(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function UserProfileComponent({ user }: { user: GitHubUser }) {
  // Formateo determinista forzando UTC para evitar desajustes de hidratación SSR
  const joinedDate = formatDeterministicDate(user.created_at, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const safeBlogUrl = getSafeExternalUrl(user.blog);
  const cleanCompany = user.company?.trim();
  const cleanLocation = user.location?.trim();
  const cleanTwitter = user.twitter_username?.replace(/^@+/, "").trim();

  // Lista declarativa de metadatos (DRY y Open/Closed Principle)
  const metadataItems = [
    cleanCompany
      ? {
          id: "company",
          icon: <Building className="h-3.5 w-3.5" />,
          text: cleanCompany,
          title: `Empresa: ${cleanCompany}`,
        }
      : null,
    cleanLocation
      ? {
          id: "location",
          icon: <MapPin className="h-3.5 w-3.5" />,
          text: cleanLocation,
          title: `Ubicación: ${cleanLocation}`,
        }
      : null,
    safeBlogUrl
      ? {
          id: "blog",
          icon: <LinkIcon className="h-3.5 w-3.5" />,
          text: user.blog?.trim() || safeBlogUrl,
          href: safeBlogUrl,
          title: `Sitio web: ${safeBlogUrl}`,
        }
      : null,
    cleanTwitter
      ? {
          id: "twitter",
          icon: <TwitterIcon className="h-3.5 w-3.5" />,
          text: `@${cleanTwitter}`,
          href: `https://twitter.com/${cleanTwitter}`,
          title: `Twitter: @${cleanTwitter}`,
        }
      : null,
    {
      id: "joined",
      icon: <Calendar className="h-3.5 w-3.5" />,
      text: `Miembro desde ${joinedDate}`,
      title: `Fecha de registro: ${joinedDate}`,
    },
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <Card className="relative overflow-hidden p-6 flex flex-col items-center space-y-5 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
      {/* Halo de luz decorativo aurora en la parte superior */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-72 rounded-full bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      <ProfileAvatar
        avatarUrl={user.avatar_url}
        name={user.name?.trim() || user.login}
      />

      <ProfileHeader
        name={user.name}
        login={user.login}
        htmlUrl={user.html_url}
        bio={user.bio}
      />

      <div className="w-full space-y-2 text-xs border-t border-[var(--glass-border)] pt-4 text-left z-10">
        {metadataItems.map((item) => (
          <ProfileMetadataItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            href={item.href}
            title={item.title}
          />
        ))}
      </div>

      <ProfileStats
        publicRepos={user.public_repos}
        followers={user.followers}
        following={user.following}
      />
    </Card>
  );
}

const UserProfile = React.memo(UserProfileComponent);
export default UserProfile;
