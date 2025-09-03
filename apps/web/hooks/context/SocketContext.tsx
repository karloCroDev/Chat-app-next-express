"use client";

import { useSession } from "@/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";
import * as React from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  onlineUsers: any[];
  socketGlobal: Socket | null;
}

export const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocketContext = () => {
  const ctx = React.useContext(SocketContext);

  if (!ctx) throw new Error("Oops I can't provide the value");

  return ctx;
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> =
  withReactQueryProvider(({ children }) => {
    // Karlo za inace handleaj ovo sa state mangmentom ili u rootu postavi funkciju koju ces renderati (ovo je zasad zeljeni root). Msm da ne postoji bolji nacin za handleanje ovog!
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [socketGlobal, setSocketGlobal] = React.useState<Socket | null>(null);

    const { data: user } = useSession();

    React.useEffect(() => {
      if (!user) {
        if (socketGlobal) {
          socketGlobal.close();
          setSocketGlobal(null);
        }
        return;
      }

      const socket = io("http://localhost:4000", {
        query: {
          userId: user.id, // Usera dobivamo sa servera pa nije problem handleati je li online ili nije
        },
      });

      setSocketGlobal(socket);

      socket.on("get-online-users", (data) => {
        setOnlineUsers(data);
      });
      return () => {
        socket.close();
      };
    }, [user]);

    return (
      <SocketContext.Provider value={{ onlineUsers, socketGlobal }}>
        {children}
      </SocketContext.Provider>
    );
  });
