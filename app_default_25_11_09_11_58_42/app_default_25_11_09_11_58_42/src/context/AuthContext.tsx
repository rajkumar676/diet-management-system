import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserRole = "user" | "guide" | "unassigned" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  token: string | null;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = "dms_auth_state";

interface StoredAuthState {
  token: string | null;
  userRole: UserRole;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRoleState] = useState<UserRole>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: StoredAuthState = JSON.parse(stored);
        if (parsed.token && parsed.userRole) {
          setToken(parsed.token);
          setUserRoleState(parsed.userRole);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      if (token && userRole) {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ token, userRole })
        );
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [token, userRole]);

  const login = (newToken: string, role: UserRole) => {
    setToken(newToken);
    setUserRoleState(role);
  };

  const logout = () => {
    setToken(null);
    setUserRoleState(null);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const value: AuthContextType = {
    isAuthenticated: Boolean(token),
    userRole,
    token,
    login,
    logout,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
