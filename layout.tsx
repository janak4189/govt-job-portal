import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GovJobs - Government Job Updates & Notifications",
  description: "Latest government job updates, notifications, and alerts.",
};

import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <Briefcase className="w-6 h-6" />
              <span>GovJobs</span>
            </Link>
            <nav className="flex gap-4">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-indigo-600 font-medium">Browse Jobs</Link>
              <Link href="/admin/post-job" className="text-gray-600 hover:text-indigo-600 font-medium">Post a Job</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} GovJobs Update. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
