import { useAuthStore } from "@/hooks/stores";
import { useAuth } from "@/api/queries";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider>
      <AuthLoader>{children}</AuthLoader>
    </QueryClientProvider>
  )
}

const AuthLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, setLoading, accessToken } = useAuthStore();
  const qc = useQueryClient();
  const { mutate } = useAuth();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      setLoading(true);
      try {
        const user = await mutate({})
        if (!mounted) return;
        setUser(me);
      } catch (e) {
        setUser(null);
        qc.clear();
      } finally {
        setLoading(false);
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [accessToken, setUser, setLoading, qc]);

  return <>{children}</>;
};
