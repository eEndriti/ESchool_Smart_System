import { createContext, useContext, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";

const ToastContext = createContext(null);

export function ToastProvider({ children, defaultPosition = "top-right" }) {
  const api = useMemo(() => ({
    show: (message, opts) => toast(message, opts),
    success: (message, opts) => toast.success(message, opts),
    error: (message, opts) => toast.error(message, opts),
    loading: (message, opts) => toast.loading(message, opts),
    promise: (promiseOrFn, { loading = "Working...", success = "Done!", error = "Something went wrong" } = {}, opts) => {
      const p = typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn;
      return toast.promise(p, { loading, success, error }, opts);
    },
    dismiss: (id) => toast.dismiss(id),
    remove: (id) => toast.remove(id),
  }), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toaster
        position={defaultPosition}
        toastOptions={{
          duration: 3000,
          style: { fontSize: 18,padding:20 },
          success: { iconTheme: { primary: "#16a34a", secondary: "white" } },
          error: { iconTheme: { primary: "#dc2626", secondary: "white" } },
        }}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}