"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, UploadCloud, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWithAuth } from "@/lib/api";
import dynamic from "next/dynamic";

const MapPreview = dynamic(() => import("@/components/MapPreview"), {
  ssr: false,
  loading: () => <div className="w-full h-48 flex items-center justify-center bg-muted/20 animate-pulse rounded-lg border">Loading map...</div>
});

export default function UploadReportPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number, alt: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude || 0,
          });
          setIsLocating(false);
          toast.success("Location captured");
        },
        (error) => {
          console.error("Error getting location", error);
          toast.error("Failed to get location. Please enable permissions.");
          setIsLocating(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  const handleSubmit = async () => {
    if (!image) return toast.error("Please select an image");
    if (!location) return toast.error("Please capture your location");

    setIsLoading(true);

    try {
      const res = await fetchWithAuth("/api/reports", {
        method: "POST",
        body: JSON.stringify({
          imageBase64: image,
          location,
        }),
      }, session?.user?.token);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit report");
      }

      toast.success("Report submitted successfully! The AI validated your image.");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Report Waste Dump</CardTitle>
          <CardDescription>
            Upload a clear picture of the garbage and we will notify the authorities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${image ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:bg-muted/50'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Preview" className="max-h-64 rounded-md object-contain" />
            ) : (
              <>
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-sm font-medium text-muted-foreground">Click to upload image</p>
                <p className="text-xs text-muted-foreground mt-1">JPEG, PNG up to 5MB</p>
              </>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={captureLocation}
              disabled={isLocating || !!location}
            >
              {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
              {location ? "Location Captured ✓" : "Capture Location"}
            </Button>
            {location && (
              <span className="text-xs text-muted-foreground flex flex-col items-start gap-1 mt-1">
                <span>Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}</span>
                <span className="font-semibold text-primary">X: {location.lng.toFixed(4)}, Y: {location.lat.toFixed(4)}, Z: {location.alt.toFixed(4)}</span>
              </span>
            )}
          </div>

          {location && (
            <div className="w-full h-48 mt-4 rounded-lg overflow-hidden border relative z-10">
              <MapPreview location={location} />
            </div>
          )}

          <Button 
            className="w-full h-12 text-lg" 
            onClick={handleSubmit}
            disabled={isLoading || !image || !location}
          >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Submit Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
