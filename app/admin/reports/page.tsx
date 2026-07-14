"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

export default function AdminReportsPage() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<any[]>([]);

  const fetchReports = async () => {
    if (!session?.user?.token) return;
    try {
      const res = await fetchWithAuth("/api/reports", {}, session.user.token);
      const data = await res.json();
      if (data.reports) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [session]);

  const updateStatus = async (id: string, newStatus: string) => {
    if (!session?.user?.token) return;
    try {
      const res = await fetchWithAuth(`/api/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }, session.user.token);
      
      if (res.ok) {
        toast.success("Status updated");
        fetchReports();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const deleteReport = async (id: string) => {
    if (!session?.user?.token) return;
    try {
      const res = await fetchWithAuth(`/api/reports/${id}`, {
        method: "DELETE",
      }, session.user.token);

      if (res.ok) {
        toast.success("Report deleted");
        fetchReports();
      } else {
        toast.error("Failed to delete report");
      }
    } catch (error) {
      toast.error("Error deleting report");
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report._id} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 border p-4 rounded-lg">
                <img src={report.imageUrl} alt="Garbage" className="w-32 h-32 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="font-semibold">User: {report.user?.name || "Unknown"}</p>
                  <p className="text-sm text-muted-foreground">Location: {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}</p>
                  {report.details && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-semibold">Details:</span> {report.details}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="font-semibold text-primary">AI Result:</span> {report.aiValidation?.isGarbage ? "Garbage Detected" : "Rejected"} ({report.aiValidation?.confidence}%)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 bg-muted p-2 rounded">{report.aiValidation?.message}</p>
                </div>
                <div className="flex flex-col space-y-2 min-w-[150px]">
                  <select 
                    className="border rounded p-2 text-sm"
                    value={report.status}
                    onChange={(e) => updateStatus(report._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${report.location.lat},${report.location.lng}`, '_blank')}
                  >
                    Get Directions
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteReport(report._id)}>
                    Delete Fake Report
                  </Button>
                </div>
              </div>
            ))}
            {reports.length === 0 && <p>No reports found.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
