import { CondoOrProject } from "@/models/condo-or-project-model";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching top 10 recent condos");
    const top10RecentCondos = await CondoOrProject.find({ type: "condo" })
      .sort({ createdAt: -1 }) // Sorting the condos in descending order based on createdAt timestamp
      .limit(10); // Limiting the results to upto 10 condos

    return NextResponse.json(
      {
        top10RecentCondos: top10RecentCondos.length,
        data: top10RecentCondos,
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
