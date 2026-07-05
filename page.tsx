import { db } from "@/db";
import { jobs } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import Link from "next/link";
import { format } from "date-fns";
import { Search, MapPin, Building, Calendar, ArrowRight } from "lucide-react";

import { seedJobs } from "@/db/seed";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Ensure we have some sample data
  await seedJobs();

  const params = await searchParams;
  const query = params.q || "";

  let latestJobs;
  
  if (query) {
    latestJobs = await db.select()
      .from(jobs)
      .where(sql`${jobs.title} ILIKE ${`%${query}%`} OR ${jobs.department} ILIKE ${`%${query}%`}`)
      .orderBy(desc(jobs.postedDate))
      .limit(20);
  } else {
    latestJobs = await db.select()
      .from(jobs)
      .orderBy(desc(jobs.postedDate))
      .limit(10);
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Find Your Dream Government Job
        </h1>
        <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Get the latest updates, notifications, and alerts for state and central government jobs.
        </p>
        
        <form className="max-w-3xl mx-auto bg-white p-2 rounded-lg flex items-center shadow-md">
          <Search className="text-gray-400 w-6 h-6 ml-3" />
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search by job title or department..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 px-4 py-3 outline-none"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Search
          </button>
        </form>
      </section>

      {/* Jobs List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {query ? `Search Results for "${query}"` : "Latest Job Notifications"}
          </h2>
          {!query && (
            <Link href="/jobs" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {latestJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestJobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="group">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-300 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <Building className="w-4 h-4" />
                      <span className="truncate">{job.department}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Last Date: <span className="font-medium text-red-600">{format(new Date(job.lastDate), 'MMM dd, yyyy')}</span></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
