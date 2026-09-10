"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Monitor, Sun, MoonStar } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const subscribe = () => () => {}
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  return <div className="theme-switcher" role="group" aria-label="Color theme">
    {[{value:"system",Icon:Monitor},{value:"light",Icon:Sun},{value:"dark",Icon:MoonStar}].map(({value,Icon}) =>
      <Button key={value} size="icon" variant="ghost" className="size-8 rounded-full border border-transparent bg-transparent text-muted-foreground transition-none hover:bg-transparent hover:text-foreground active:translate-y-0 aria-pressed:border-foreground/25 aria-pressed:bg-background aria-pressed:text-foreground" aria-label={`Use ${value} theme`} title={`Use ${value} theme`} aria-pressed={mounted && theme === value} onClick={() => setTheme(value)}>
        <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
      </Button>)}
  </div>
}
