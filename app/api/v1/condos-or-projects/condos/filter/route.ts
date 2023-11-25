import { connectDb } from "@/dbConfig/dbConfig";
import { CondoOrProject } from "@/models/condo-or-project-model";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to filter condos based on the filter object being provided from the frontend
export async function POST(req: NextRequest) {
  try {
    console.log("======@@@@@@@@@@@@Inside filter one of condos");
    const reqBody = await req.json();

    const { location, developer, occupancyDate, deposit } = reqBody;

    // Building a filter object based on the provided parameters from the frontend
    const filter: any = {};

    if (location) {
      filter.city = location;
    }

    if (developer) {
      filter.developerName = developer;
    }
    if (occupancyDate) {
      filter.occupancyDate = occupancyDate;
    }

    if (deposit) {
      filter.deposit = deposit;
    }

    const allFilteredCondos = await CondoOrProject.find({
      type: "condo",
      ...filter,
    });
    return NextResponse.json(
      {
        totalFilteredCondos: allFilteredCondos.length,
        data: allFilteredCondos,
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
