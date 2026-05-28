import React, { type ReactNode } from "react";
import {
  MapPin,
  Link as LinkIcon,
  Building,
  Calendar,
  ExternalLink,
  Users,
  FolderGit2
} from "lucide-react";
import Image from "next/image";
import { type GitHubUser } from "@/features/github-search/api/githubSchema";

/* =========================================================================================================
   CICLO DE VIDA Y FLUJO DE MONTAJE DE COMPONENTES EN EL DASHBOARD
   =========================================================================================================
   
   A continuación se detalla cronológicamente el ciclo de vida y el orden de montaje de los componentes
   en la interfaz de búsqueda de desarrolladores de GitHub, desde su carga inicial hasta su visualización final:

   Paso 1: Montaje Inicial de la Aplicación (First Mount)
   ---------------------------------------------------------------------------------------------------------
   - El cliente solicita la ruta de la aplicación. Next.js monta el contenedor principal `GitHubSearchDashboard`
     (definido en `features/github-search/index.tsx`).
   - Al ejecutarse, se inicializa el hook personalizado `useGitHubSearch` con el valor por defecto "vercel".
   - Al ser la primera renderización, se dispara un `useEffect` interno en el hook para consultar la API de GitHub.
   - El estado `loading` se establece en `true`. Como resultado directo, React renderiza el componente
     `ProfileSkeleton` y `RepoListSkeleton`. El árbol de componentes es:
     
     └── GitHubSearchDashboard (loading === true)
         ├── SearchInput (Renderizado e interactivo)
         ├── ProfileSkeleton (Montado y animándose con .animate-pulse)
         └── RepoListSkeleton (Montado y animándose con .animate-pulse)

   Paso 2: Resolución de la Petición de Datos (Data Fetching & Resolution)
   ---------------------------------------------------------------------------------------------------------
   - La función asíncrona de consulta finaliza exitosamente tras descargar los datos del usuario de GitHub.
   - Los esquemas Zod (`GitHubUserSchema` y `GitHubRepoListSchema`) validan estructuralmente la información.
   - Se actualizan los estados locales de React:
     - `currentUser` recibe el objeto con la información validada del perfil de usuario.
     - `repos` recibe el arreglo con los repositorios más populares del usuario.
     - `loading` cambia a `false`.

   Paso 3: Reconciliación del DOM y Desmontaje de Skeletons (Unmounting)
   ---------------------------------------------------------------------------------------------------------
   - Al actualizarse los estados, React desencadena una fase de reconciliación (Re-render).
   - React evalúa las directivas condicionales del DOM virtual. Al comprobar que `loading` es `false` y
     `currentUser` no es nulo, detecta que los componentes `ProfileSkeleton` y `RepoListSkeleton` ya no
     deben formar parte del árbol visual.
   - React desmonta (unmounts) de forma limpia los componentes skeleton, eliminándolos de la memoria y del DOM real.

   Paso 4: Montaje y Renderizado del Perfil Final Desacoplado (Successful Mount)
   ---------------------------------------------------------------------------------------------------------
   - React monta concurrentemente la interfaz final: el visualizador de repositorios `RepoList` y la tarjeta
     del perfil `UserProfile`.
   - `UserProfile` actúa como un contenedor inteligente desacoplado que monta secuencialmente sus piezas:
     
     └── UserProfile (Recibe prop 'user')
         ├── ProfileBanner (Dibuja la cabecera geométrica/animada en el fondo)
         ├── ProfileAvatar (Monta la imagen del usuario y dibuja los anillos de brillo)
         ├── ProfileHeader (Monta el nombre, usuario de GitHub, biografía y enlace externo)
         ├── ProfileMetadataItem (Montaje dinámico y modular para cada dato disponible: Compañía, Ubicación, etc.)
         └── ProfileStats (Dibuja el bloque de tres columnas con la interacción del total de repos y seguidores)

   Paso 5: Fase de Interacción del Ciclo de Vida (Updates & Maintenance)
   ---------------------------------------------------------------------------------------------------------
   - Cuando el usuario realiza una nueva búsqueda (escribiendo un nombre de usuario y presionando Buscar):
     1. El hook `useGitHubSearch` cambia el estado `loading` a `true`.
     2. Los componentes del perfil (`UserProfile`) y repositorios (`RepoList`) se desmontan completamente del DOM.
     3. React vuelve a montar los skeletons (`ProfileSkeleton` y `RepoListSkeleton`) para dar retroalimentación inmediata.
     4. Al responder la API, se repite el proceso de desmontaje de skeletons e instalación de los nuevos componentes.
     
   Esta estructura altamente modular e independiente previene renderizaciones innecesarias (decoupling) y garantiza
   que cada pieza encapsulada pueda actualizarse de forma aislada y eficiente.
   ========================================================================================================= */

/**
 * @interface TwitterIconProps
 * @description Propiedades para el icono de Twitter/X personalizado.
 */
interface TwitterIconProps {
  /** Clases CSS adicionales de Tailwind para estilos de tamaño o márgenes */
  className?: string;
}

/**
 * @component TwitterIcon
 * @description Icono SVG personalizado para renderizar la marca tradicional de Twitter (actualmente X) de manera vectorizada y responsiva.
 * @param {TwitterIconProps} props Propiedades del componente.
 * @returns {React.ReactElement} Icono SVG vectorizado.
 */
function TwitterIcon({ className }: TwitterIconProps): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

/**
 * @component ProfileBanner
 * @description Componente visual puramente estético y desacoplado que renderiza un fondo decorativo superior
 * en el card de usuario. Emplea gradientes oscuros de neón y mallas de brillo de fondo adaptables al tema.
 * @returns {React.ReactElement} Un fragmento decorativo de banner superior absolute.
 */
export function ProfileBanner(): React.ReactElement {
  return (
    <div className="absolute top-0 left-0 right-0 h-24 bg-[var(--meta-bg)] border-b border-[var(--meta-border)] overflow-hidden select-none pointer-events-none z-0" />
  );
}

/**
 * @interface ProfileAvatarProps
 * @description Propiedades requeridas para renderizar el componente de Avatar de Usuario.
 */
interface ProfileAvatarProps {
  /** La dirección URL absoluta que apunta al avatar de GitHub */
  avatarUrl: string;
  /** El nombre completo o el alias del desarrollador para accesibilidad (alt) */
  name: string;
}

/**
 * @component ProfileAvatar
 * @description Renderiza de manera desacoplada la imagen circular de perfil del usuario de GitHub,
 * enmarcada por un anillo multicolor responsivo que brilla y gira dinámicamente al pasar el mouse por encima.
 * @param {ProfileAvatarProps} props Propiedades del avatar.
 * @returns {React.ReactElement} Bloque del avatar circular con anillo de brillo y estatus.
 */
export function ProfileAvatar({ avatarUrl, name }: ProfileAvatarProps): React.ReactElement {
  return (
    <div className="relative h-28 w-28 flex-shrink-0 sm:h-32 sm:w-32 z-10">
      {/* Imagen circular real del desarrollador con borde simple */}
      <div className="relative h-full w-full rounded-full border-4 border-[var(--card-bg)] overflow-hidden bg-[var(--meta-bg)] shadow-sm">
        <Image
          src={avatarUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 112px, 128px"
          className="object-cover"
        />
      </div>
      
      {/* Burbuja indicadora en verde */}
      <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[var(--card-bg)] bg-emerald-500" aria-label="Usuario Activo" title="Usuario Activo" />
    </div>
  );
}

/**
 * @interface ProfileHeaderProps
 * @description Propiedades para el bloque de información superior y textos del perfil.
 */
interface ProfileHeaderProps {
  /** Nombre público real del desarrollador (puede ser nulo en GitHub) */
  name: string | null | undefined;
  /** El identificador único de usuario de GitHub (login) */
  login: string;
  /** La URL del perfil del usuario para dirigir el botón de hipervínculo */
  htmlUrl: string;
  /** Biografía o descripción escrita por el desarrollador en GitHub (puede ser nula) */
  bio: string | null | undefined;
}

/**
 * @component ProfileHeader
 * @description Renderiza y centra el nombre del desarrollador, el enlace directo al perfil de GitHub con animación interactiva,
 * el nombre de usuario precedido de un arroba, y la biografía contenida en una "burbuja de cristal" minimalista.
 * @param {ProfileHeaderProps} props Propiedades del encabezado.
 * @returns {React.ReactElement} Secciones de textos principales del perfil.
 */
export function ProfileHeader({ name, login, htmlUrl, bio }: ProfileHeaderProps): React.ReactElement {
  return (
    <div className="text-center space-y-3 w-full z-10">
      <div>
        {/* Nombre y Enlace Externo a GitHub */}
        <h2 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2 text-[var(--text-primary)]">
          <span className="truncate max-w-[200px] sm:max-w-xs">
            {name || login}
          </span>
          <a
            href={htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-accent)] transition-colors p-1 rounded hover:bg-[var(--meta-hover-bg)] flex-shrink-0"
            title="Ver perfil en GitHub"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </h2>
        
        {/* Identificador de Usuario */}
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          @{login}
        </p>
      </div>

      {/* Burbuja dedicada para la Biografía */}
      <div className="bg-[var(--meta-bg)] border border-[var(--meta-border)] rounded-xl px-4 py-2.5 max-w-sm mx-auto shadow-sm">
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
          {bio || "Este desarrollador no ha añadido una biografía en su perfil de GitHub."}
        </p>
      </div>
    </div>
  );
}

/**
 * @interface ProfileMetadataItemProps
 * @description Parámetros y propiedades requeridas para instanciar una fila de metadatos genérica.
 */
interface ProfileMetadataItemProps {
  /** Icono de Lucide ReactNode que representa gráficamente el metadato */
  icon: ReactNode;
  /** El contenido textual o valor del campo a renderizar en la fila */
  text: string;
  /** Dirección web opcional. Si se especifica, el texto se renderizará como un enlace activo */
  href?: string;
  /** Tooltip de información flotante para mejorar la experiencia de usuario */
  title?: string;
}

/**
 * @component ProfileMetadataItem
 * @description Componente altamente modular y reutilizable que renderiza de manera elegante e inteligente
 * una fila de información en la tarjeta. Cuenta con un contenedor de cristal con bordes ultra-delgados que
 * se adaptan por completo a los tokens del tema, enlaces interactivos y truncamiento responsivo.
 * @param {ProfileMetadataItemProps} props Propiedades de la fila de metadatos.
 * @returns {React.ReactElement} Renglón estilizado de metadatos del usuario.
 */
export function ProfileMetadataItem({ icon, text, href, title }: ProfileMetadataItemProps): React.ReactElement {
  return (
    <div className="flex items-center gap-2.5 bg-[var(--meta-bg)] hover:bg-[var(--meta-hover-bg)] px-3 py-1.5 rounded-xl border border-[var(--meta-border)] text-[var(--meta-text)] transition-colors select-none">
      <div className="flex-shrink-0">
        {icon}
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-accent)] text-[var(--text-secondary)] transition-colors underline decoration-slate-400/25 hover:decoration-indigo-500/50 truncate w-full text-xs font-medium"
          title={title || text}
        >
          {text}
        </a>
      ) : (
        <span 
          className="truncate text-[var(--text-secondary)] text-xs font-medium w-full" 
          title={title || text}
        >
          {text}
        </span>
      )}
    </div>
  );
}

/**
 * @interface ProfileStatsProps
 * @description Estructura de propiedades para el panel numérico de estadísticas.
 */
interface ProfileStatsProps {
  /** Total de repositorios públicos que tiene el usuario en su cuenta */
  publicRepos: number;
  /** Cantidad total de usuarios que siguen a esta cuenta */
  followers: number;
  /** Cantidad total de cuentas a las que este usuario sigue */
  following: number;
}

/**
 * @component ProfileStats
 * @description Renderiza una rejilla de estadísticas (Repositorios, Seguidores, Siguiendo) con un diseño
 * de panel tecnológico adaptable por variables de tema CSS. Soporta hover transitions de escala suave.
 * @param {ProfileStatsProps} props Propiedades de las métricas.
 * @returns {React.ReactElement} Bloque completo con rejilla de 3 columnas de estadísticas.
 */
export function ProfileStats({ publicRepos, followers, following }: ProfileStatsProps): React.ReactElement {
  return (
    <div className="relative w-full mt-6 grid grid-cols-3 gap-1 rounded-xl border border-[var(--stats-border)] bg-[var(--stats-bg)] p-1.5 text-center z-10 shadow-sm">
      
      {/* Repositorios / Proyectos */}
      <div className="flex flex-col items-center justify-center py-2 rounded-lg hover:bg-[var(--meta-hover-bg)] transition-colors cursor-pointer group/stat select-none">
        <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider group-hover/stat:text-[var(--text-secondary)] transition-colors">
          <FolderGit2 className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span className="hidden sm:inline">Proyectos</span>
          <span className="sm:hidden">Repos</span>
        </div>
        <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mt-0.5">
          {publicRepos}
        </span>
      </div>
      
      {/* Seguidores */}
      <div className="flex flex-col items-center justify-center py-2 rounded-lg border-x border-[var(--meta-border)] hover:bg-[var(--meta-hover-bg)] transition-colors cursor-pointer group/stat select-none">
        <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider group-hover/stat:text-[var(--text-secondary)] transition-colors">
          <Users className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span>Seguidores</span>
        </div>
        <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mt-0.5">
          {followers}
        </span>
      </div>
      
      {/* Siguiendo */}
      <div className="flex flex-col items-center justify-center py-2 rounded-lg hover:bg-[var(--meta-hover-bg)] transition-colors cursor-pointer group/stat select-none">
        <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider group-hover/stat:text-[var(--text-secondary)] transition-colors">
          <Users className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span>Siguiendo</span>
        </div>
        <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mt-0.5">
          {following}
        </span>
      </div>
      
    </div>
  );
}

/**
 * @interface UserProfileProps
 * @description Parámetro del componente contenedor que recibe el objeto usuario ya validado de GitHub.
 */
interface UserProfileProps {
  /** Objeto de tipo GitHubUser con toda la información requerida de la API */
  user: GitHubUser;
}

/**
 * @component UserProfile
 * @description Componente contenedor de alto nivel para el perfil de usuario. Implementa las directrices
 * de diseño responsive, utilizando la clase `glass-panel` que adapta automáticamente su fondo, borde y sombra
 * según el tema visual activo de la aplicación.
 * @param {UserProfileProps} props Propiedades del perfil de usuario.
 * @returns {React.ReactElement} La tarjeta de datos de usuario final.
 */
export default function UserProfile({ user }: UserProfileProps): React.ReactElement {
  // Conversión y formateo localizado de la fecha de registro en GitHub en idioma español
  const joinedDate = new Date(user.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-6 relative overflow-hidden group">
      
      {/* Banner estético de fondo (Desacoplado) */}
      <ProfileBanner />

      <div className="relative flex flex-col items-center space-y-5 pt-12">
        {/* Avatar del usuario con anillo y estatus (Desacoplado) */}
        <ProfileAvatar avatarUrl={user.avatar_url} name={user.name || user.login} />

        {/* Bloque superior de textos principales y biografía en cristal (Desacoplado) */}
        <ProfileHeader
          name={user.name}
          login={user.login}
          htmlUrl={user.html_url}
          bio={user.bio}
        />

        {/* Fila de metadatos detallados (Modular y Desacoplado) */}
        <div className="w-full space-y-2 text-xs border-t border-[var(--meta-border)] pt-5 text-left z-10">
          {user.company ? (
            <ProfileMetadataItem
              icon={<Building className="h-4 w-4 text-[var(--text-muted)]" />}
              text={user.company}
              title={`Empresa: ${user.company}`}
            />
          ) : null}
          {user.location ? (
            <ProfileMetadataItem
              icon={<MapPin className="h-4 w-4 text-[var(--text-muted)]" />}
              text={user.location}
              title={`Ubicación: ${user.location}`}
            />
          ) : null}
          {user.blog ? (
            <ProfileMetadataItem
              icon={<LinkIcon className="h-4 w-4 text-[var(--text-muted)]" />}
              text={user.blog}
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              title={`Sitio web: ${user.blog}`}
            />
          ) : null}
          {user.twitter_username ? (
            <ProfileMetadataItem
              icon={<TwitterIcon className="h-4 w-4 text-[var(--text-muted)]" />}
              text={`@${user.twitter_username}`}
              href={`https://twitter.com/${user.twitter_username}`}
              title={`Twitter: @${user.twitter_username}`}
            />
          ) : null}
          <ProfileMetadataItem
            icon={<Calendar className="h-4 w-4 text-[var(--text-muted)]" />}
            text={`Miembro desde ${joinedDate}`}
            title={`Fecha de creación: ${joinedDate}`}
          />
        </div>

        {/* Rejilla de estadísticas (Desacoplado) */}
        <ProfileStats
          publicRepos={user.public_repos}
          followers={user.followers}
          following={user.following}
        />
        
      </div>
    </div>
  );
}
