"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UploadCloud, PieChart, User as UserIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", color: "text-sky-500" },
  { label: "Report Waste", icon: UploadCloud, href: "/dashboard/upload", color: "text-violet-500" },
  { label: "Analytics", icon: PieChart, href: "/dashboard/analytics", color: "text-orange-700" },
  { label: "Profile", icon: UserIcon, href: "/dashboard/profile", color: "text-green-700" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <span className="text-3xl">♻️</span>
          </div>
          <h1 className="text-2xl font-bold">SmartWaste</h1>
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
