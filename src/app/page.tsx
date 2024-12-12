import Image from "next/image";
import Topbar from "@/ui/Topbar";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/ui/Sidebar";

export default function Home() {
  return (
    <AuthProvider>
      {/* <Topbar /> */}
      <Sidebar />
    </AuthProvider>
  );
}
