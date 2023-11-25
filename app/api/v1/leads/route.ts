import { connectDb } from "@/dbConfig/dbConfig";
import Lead from "@/models/lead-model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to create a new lead in the database
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { developerEmail, messageFromDeveloper } = reqBody;

    const newLead = new Lead({
      developerEmail,
      messageFromDeveloper,
    });
    // console.log("This is the new lead:--", newLead);
    const savedLead = await newLead.save();
    // console.log("This is the saved lead", savedLead);

    return NextResponse.json(
      {
        message: "new lead created successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    // console.log("Inside catch this is the error", error.message);
    if (
      error.message ===
      "Lead validation failed: developerEmail: Please fill a valid email address !"
    ) {
      error.statusCode = 400;
    }
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
}

// ================This is the method to find all the leads from the database
export async function GET(req: NextRequest) {
  try {
    const allLeads = await Lead.find();
    return NextResponse.json(
      {
        totalLeads: allLeads.length,
        data: allLeads,
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
