"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";

export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex items-center p-4 border-b h-16 w-full bg-background">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-slate-900 border-none w-72">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            {isAdmin ? <AdminSidebar /> : <Sidebar />}
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full justify-end items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">{session?.user?.name || "User"}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/login" })}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
