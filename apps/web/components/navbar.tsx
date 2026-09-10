"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"

import { DownloadButton } from "@workspace/ui/components/utilities/download-button"
import { ProgressiveBlur } from "@workspace/ui/components/utilities/progressive-blur"

import { downloads } from "@/lib/marketing-config"
import { repositoryUrl } from "@/lib/project-content"

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface NavItem {
  title: string
  href: string
  description: string
  external?: boolean
}

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const productItems: readonly NavItem[] = [
  {
    title: "Overview",
    href: "/",
    description: "Learn how Symtab fits into your workflow.",
  },
  {
    title: "Features",
    href: "/#features",
    description: "Explore the core capabilities of Symtab.",
  },
  {
    title: "Integrations",
    href: "/#integrations",
    description: "Connect Symtab with the tools you already use.",
  },
]

const resourceItems: readonly NavItem[] = [
  {
    title: "Releases",
    href: "/changelog",
    description: "Read the latest release notes from Symtab.",
  },
  {
    title: "Community",
    href: "/#community",
    description: "Join the community building and using Symtab.",
  },
  {
    title: "GitHub",
    href: repositoryUrl,
    description: "Explore the source code and contribute to Symtab.",
    external: true,
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    description: "See what we are building and what comes next.",
  },
]

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  return (
    <header id="site-header" className="site-header">
      <ProgressiveBlur />
      <div className="site-shell relative flex h-(--site-header-height) items-center justify-between">
        <Brand />

        <DesktopNavigation />

        <HeaderActions />
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/* Brand                                                                      */
/* -------------------------------------------------------------------------- */

function Brand() {
  return (
    <div className="shrink-0">
      <Link
        href="/"
        aria-label="Symtab home"
        className="relative inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Image
          src="/logo.png"
          alt=""
          width={32}
          height={32}
          className="size-8 rounded-[6px]"
          aria-hidden="true"
        />

        <span className="text-[19px] font-semibold tracking-[-0.03em]">
          symtab
        </span>
      </Link>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Desktop Navigation                                                         */
/* -------------------------------------------------------------------------- */

function DesktopNavigation() {
  return (
    <div className="hidden lg:block">
      <nav
        aria-label="Primary navigation"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <NavigationMenu>
          <NavigationMenuList>
            {/* Product */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="w-96">
                  {productItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {resourceItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      external={item.external}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Changelog */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/changelog">Changelog</Link>}
              />
            </NavigationMenuItem>

            {/* Docs */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <a
                    href={`${repositoryUrl}#readme`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Docs <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                }
              />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Header Actions                                                             */
/* -------------------------------------------------------------------------- */

function HeaderActions() {
  const dialog = React.useRef<HTMLDialogElement>(null)
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    dialog.current?.close()
  }, [pathname])

  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)")
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close()
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  return (
    <div className="header-actions">
      <DownloadButton
        urls={downloads}
        className="rounded-md"
      />
      <button
        className="menu-toggle"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => {
          const headerTop = document.getElementById("site-header")?.getBoundingClientRect().top ?? 0
          dialog.current?.style.setProperty("--menu-header-top", `${Math.max(0, headerTop)}px`)
          dialog.current?.showModal()
          setOpen(true)
        }}
      >
        <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navigation"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) dialog.current?.close()
        }}
      >
        <div className="mobile-navigation-top site-shell">
          <Brand />
          <button
            className="menu-toggle"
            aria-label="Close navigation"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <nav
          className="mobile-navigation-links site-shell"
          aria-label="Mobile navigation"
        >
          <details>
            <summary>
              Product <ChevronDown aria-hidden="true" />
            </summary>
            <div className="mobile-submenu">
              {productItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.title}
                </Link>
              ))}
            </div>
          </details>
          <a href={`${repositoryUrl}#readme`} target="_blank" rel="noreferrer">
            Docs <ArrowUpRight aria-hidden="true" />
          </a>
          <Link href="/changelog">Changelog</Link>
          <details>
            <summary>
              Resources <ChevronDown aria-hidden="true" />
            </summary>
            <div className="mobile-submenu">
              {resourceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.title}
                  {item.external && <ArrowUpRight aria-hidden="true" />}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="mobile-navigation-bottom site-shell">
          <DownloadButton urls={downloads} className="download-button" />
          <p>Open files. Open formats. Open source.</p>
        </div>
      </dialog>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Navigation Item                                                            */
/* -------------------------------------------------------------------------- */

function ListItem({
  title,
  children,
  href,
  external = false,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string
  external?: boolean
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          external ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1.5 leading-none font-medium">
                  <span>{title}</span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 text-muted-foreground"
                  />
                </div>

                <div className="line-clamp-2 text-muted-foreground">
                  {children}
                </div>
              </div>
            </a>
          ) : (
            <Link href={href}>
              <div className="flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>

                <div className="line-clamp-2 text-muted-foreground">
                  {children}
                </div>
              </div>
            </Link>
          )
        }
      />
    </li>
  )
}
