"use client"

import Link from "next/link"
import { useSyncExternalStore } from "react"
import { Apple, Windows, Linux } from "@thesvg/react"
import { getBrowserPlatform } from "@workspace/ui/lib/platform"
import { ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import type { DownloadUrls } from "@workspace/ui/lib/platform"
const subscribe = () => () => {}
const serverPlatform = () => "unknown" as const
const platforms = {
  macos: {
    label: "macOS",
    icon: <Apple variant="mono" width={16} height={16} aria-hidden="true" />,
  },
  windows: {
    label: "Windows",
    icon: <Windows width={16} height={16} aria-hidden="true" />,
  },
  linux: {
    label: "Linux",
    icon: <Linux variant="mono" width={16} height={16} aria-hidden="true" />,
  },
}

export function DownloadButton({
  urls,
  className,
}: {
  urls: DownloadUrls
  className?: string
}) {
  const platform = useSyncExternalStore(
    subscribe,
    getBrowserPlatform,
    serverPlatform
  )
  const selected =
    platform in platforms ? platforms[platform as keyof typeof platforms] : null
  return (
    <Button
      nativeButton={true}
      variant="outline"
      render={<Link href={urls.fallback} />}
      className={className}
    >
      {selected?.icon}
      {selected ? `Download for ${selected.label}` : "Download Symtab"}{" "}
    </Button>
  )
}
