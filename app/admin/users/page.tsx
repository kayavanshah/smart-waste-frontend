import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  let users: any[] = [];
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: "no-store",
    });
    
    if (res.ok) {
      users = await res.json();
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user._id.toString()} className="border-b">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
