import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "./useTheme"
import type { Theme } from "./ThemeProvider"
import { cn } from "@/lib/utils"

const themeOptions: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center rounded-lg bg-gray-100 dark:bg-slate-800 p-1 gap-0.5">
      {themeOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "p-2 rounded-md transition-all duration-200",
            theme === value
              ? "bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400"
              : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
          )}
          aria-label={`Switch to ${label} theme`}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}
