import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@admybrand.com',
  role: 'admin'
};

const permissions = {
  admin: ['view_dashboard', 'edit_campaigns', 'export_data', 'manage_settings', 'view_reports'],
  viewer: ['view_dashboard', 'view_reports']
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const setUserRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
  };

  const hasPermission = (permission: string) => {
    return permissions[user.role].includes(permission);
  };

  return (
    <UserContext.Provider value={{ user, setUserRole, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}