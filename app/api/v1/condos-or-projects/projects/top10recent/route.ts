import { CondoOrProject } from "@/models/condo-or-project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching top 10 recent projects");
    const top10RecentProjects = await CondoOrProject.find({ type: "project" })
      .sort({ createdAt: -1 }) // Sorting the projects in descending order based on createdAt timestamp
      .limit(10); // Limiting the results to upto 10 projects

    return NextResponse.json(
      {
        top10RecentProjects: top10RecentProjects.length,
        data: top10RecentProjects,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
