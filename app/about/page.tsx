import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-2xl mr-2">♻️</span>
          <span className="font-bold text-xl hidden sm:inline-block">SmartWaste</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/">
            <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-24 max-w-5xl">
        <div className="space-y-16">
          
          {/* What we are */}
          <section className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Us</h1>
            <h2 className="text-2xl font-semibold text-primary">What We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SmartWaste is an innovative, community-driven platform designed to tackle urban waste management challenges. 
              We are a dedicated team of environmental enthusiasts and technologists who believe in the power of artificial intelligence 
              and crowd-sourced reporting to keep our cities clean and sustainable. Our system bridges the gap between citizens 
              who spot illegal dumping and the authorities responsible for cleaning it up.
            </p>
          </section>

          {/* What we are offering */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-primary text-center md:text-left">What We Are Offering</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">AI-Powered Verification</h3>
                  <p className="text-muted-foreground">We offer a state-of-the-art AI image analysis tool that automatically verifies if a submitted photo actually contains garbage, preventing spam and false reports.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Interactive Heatmaps</h3>
                  <p className="text-muted-foreground">A real-time geographical map that visualizes waste hotspots, helping authorities prioritize their cleaning routes efficiently.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Seamless Reporting</h3>
                  <p className="text-muted-foreground">A simple, intuitive interface for everyday citizens to snap a picture, tag their location, and submit a report in under 30 seconds.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Admin Dashboard</h3>
                  <p className="text-muted-foreground">A comprehensive control panel for city officials to track, manage, and update the status of waste reports from 'Pending' to 'Resolved'.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How this system work */}
          <section className="space-y-6 bg-muted/30 p-8 rounded-2xl border">
            <h2 className="text-2xl font-semibold text-primary text-center">How This System Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center pt-4">
              <div className="space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">1</div>
                <h3 className="font-semibold text-lg">Snap & Report</h3>
                <p className="text-muted-foreground text-sm">A user encounters uncollected waste, takes a photo on their phone, and submits it through our portal. The GPS location is automatically attached.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">2</div>
                <h3 className="font-semibold text-lg">AI Validation</h3>
                <p className="text-muted-foreground text-sm">Our Gemini Vision AI immediately analyzes the image. If it confirms the presence of garbage, the report is officially logged into our database.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">3</div>
                <h3 className="font-semibold text-lg">Action & Resolution</h3>
                <p className="text-muted-foreground text-sm">Local authorities view the verified report on their dashboard, dispatch a cleaning crew, and mark the issue as resolved once the area is clean.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
        <p className="text-xs text-muted-foreground">
          © 2026 SmartWaste Reporting System. Final Year Project.
        </p>
      </footer>
    </div>
  );
}
