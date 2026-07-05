import { db } from "@/db";
import { jobs } from "@/db/schema";
import { count } from "drizzle-orm";

export async function seedJobs() {
  const result = await db.select({ count: count() }).from(jobs);
  
  if (result[0].count === 0) {
    console.log("Seeding jobs...");
    await db.insert(jobs).values([
      {
        title: "SSC CGL 2024 - Inspector & Assistants",
        department: "Staff Selection Commission (SSC)",
        location: "All India",
        description: "The Staff Selection Commission will hold the Combined Graduate Level Examination, 2024 for filling up of various Group 'B' and Group 'C' posts in different Ministries/ Departments/ Organizations of Government of India and various Constitutional Bodies/ Statutory Bodies/ Tribunals, etc.\n\nVacancies: 15,000+\nAge Limit: 18 to 30 years\nSelection Process: Tier-I and Tier-II Computer Based Examinations.",
        qualification: "Bachelor's Degree from a recognized University",
        salary: "Pay Level-7 (₹ 44900 to 142400)",
        lastDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month from now
        applicationUrl: "https://ssc.nic.in",
      },
      {
        title: "SBI PO Recruitment 2024",
        department: "State Bank of India (SBI)",
        location: "All India",
        description: "State Bank of India (SBI) invites applications from eligible Indian Citizens for appointment as Probationary Officers (POs).\n\nVacancies: 2,000\nAge Limit: 21 to 30 years\nSelection Process: Preliminary Exam, Main Exam, Psychometric Test, Group Exercise & Interview.",
        qualification: "Graduation in any discipline",
        salary: "Basic pay is ₹ 41,960/- (with 4 advance increments)",
        lastDate: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days from now
        applicationUrl: "https://sbi.co.in/careers",
      },
      {
        title: "UPSC Civil Services Examination 2024",
        department: "Union Public Service Commission",
        location: "All India",
        description: "The Civil Services Examination (CSE) is a national competitive examination in India conducted by the UPSC for recruitment to various Civil Services of the Government of India, including the Indian Administrative Service (IAS), Indian Foreign Service (IFS), and Indian Police Service (IPS).\n\nVacancies: 1,056\nAge Limit: 21 to 32 years.",
        qualification: "Bachelor's Degree in any discipline",
        salary: "Pay Level-10 (Starting Basic Pay ₹ 56,100)",
        lastDate: new Date(new Date().setDate(new Date().getDate() + 20)),
        applicationUrl: "https://upsconline.nic.in",
      }
    ]);
    console.log("Seeded jobs successfully.");
  }
}
