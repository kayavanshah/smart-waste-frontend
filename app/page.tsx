import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, Map as MapIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-2xl mr-2">♻️</span>
          <span className="font-bold text-xl hidden sm:inline-block">SmartWaste</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/about">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Report Waste. Save the Planet.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Take a photo of a garbage dump, our AI verifies it, and we alert the authorities. Together we can keep our cities clean.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" className="h-11 px-8">
                    Start Reporting <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Leaf className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">AI Verification</h2>
                <p className="text-muted-foreground">
                  Our Gemini-powered AI ensures only valid waste images are reported, filtering out spam.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <MapIcon className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Smart Mapping</h2>
                <p className="text-muted-foreground">
                  GPS coordinates are automatically attached to your reports and displayed on interactive heatmaps.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Direct Action</h2>
                <p className="text-muted-foreground">
                  Local authorities are notified immediately with exact locations and photographic evidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2026 SmartWaste Reporting System. Final Year Project.
        </p>
      </footer>
    </div>
  );
}
