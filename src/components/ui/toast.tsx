import * as React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Toast {
  id: string
  title?: string
  message: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

export function ToastComponent({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isLeaving, setIsLeaving] = React.useState(false)

  React.useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = React.useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(toast.id)
    }, 300) // Match animation duration
  }, [onClose, toast.id])

  React.useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, handleClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[toast.type]

  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  const iconStyles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 ease-in-out max-w-md",
        typeStyles[toast.type],
        isVisible && !isLeaving
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
    >
      <Icon
        className={cn("w-5 h-5 mt-0.5 flex-shrink-0", iconStyles[toast.type])}
      />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold text-sm mb-1">{toast.title}</div>
        )}
        <div className="text-sm">{toast.message}</div>

        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}

// Toast context and hook
interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000, // Default 5 seconds
    }

    setToasts((prev) => [...prev, newToast])
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return {
    ...context,
    success: (
      message: string,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => context.addToast({ ...options, message, type: "success" }),
    error: (
      message: string,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => context.addToast({ ...options, message, type: "error" }),
    warning: (
      message: string,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => context.addToast({ ...options, message, type: "warning" }),
    info: (
      message: string,
      options?: Partial<Omit<Toast, "id" | "type" | "message">>
    ) => context.addToast({ ...options, message, type: "info" }),
  }
}
