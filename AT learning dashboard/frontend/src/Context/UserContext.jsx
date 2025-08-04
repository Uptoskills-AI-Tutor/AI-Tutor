import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const defaultUser = {
  _id: "USER_1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "Student",
  avatar: "",
  bio: "",
};

function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };



