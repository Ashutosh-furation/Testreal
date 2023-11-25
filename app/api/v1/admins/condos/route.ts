import { NextRequest, NextResponse } from "next/server";
import { CondoOrProject } from "@/models/condo-or-project-model";
import { Admin } from "@/models/admin-model";
import { connectDb } from "@/dbConfig/dbConfig";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";

connectDb();
// ================This is the method to find all admin apecific condos
export async function GET(req: NextRequest) {
  try {
    const payload: any = getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ _id: payload.id });
    if (!adminFound) {
      throw {
        message: "No admin found with the provided token",
        statusCode: 400,
      };
    }
    const allCondosOfLoggedInAdmin = await CondoOrProject.find({
      type: "condo",
      uploadedByAdmin: adminFound._id,
    });
    return NextResponse.json(
      {
        totalCondosUploadedByYou: allCondosOfLoggedInAdmin.length,
        data: allCondosOfLoggedInAdmin,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }
}
