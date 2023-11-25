import { connectDb } from "@/dbConfig/dbConfig";
import Lead from "@/models/lead-model";
import { NextRequest, NextResponse } from "next/server";
connectDb();

// ================This is the method to delete a particular lead after it has been taken by an ADMIN
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const id = params.id;

    const deletedLead = await Lead.findOneAndDelete({ _id: id });
    return NextResponse.json(
      {
        msg: "Lead deleted successfully",
        data: deletedLead,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
