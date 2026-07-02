"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, PieChart, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Admin Dashboard", icon: LayoutDashboard, href: "/admin/dashboard", color: "text-sky-500" },
  { label: "Manage Reports", icon: FileText, href: "/admin/reports", color: "text-violet-500" },
  { label: "Manage Users", icon: Users, href: "/admin/users", color: "text-pink-700" },
  { label: "System Analytics", icon: PieChart, href: "/admin/analytics", color: "text-orange-700" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <ShieldAlert className="text-red-500 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
