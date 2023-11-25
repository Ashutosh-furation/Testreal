import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/admin-model";
import mongoose from "mongoose";

connectDb();

// ================This is the method to delete an admin from the database
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        message: "Invalid ID provided in the path params",
        statusCode: 400,
      };
    }
    // ============= Any one of the below method can be used to delete a admin, but there is a difference in the returned value
    const deletedAdmin = await Admin.findOneAndDelete({
      _id: id,
      isSuperAdmin: false,
    });
    // const deletedAdmin = await Admin.deleteOne({ _id: id ,  isSuperAdmin: false,});

    if (!deletedAdmin) {
      throw {
        message:
          "No Admin deleted because the id provided in the path params do not belong to any Admin in the DB",
        statusCode: 404, // I wrote 403 here because at later point in time I will check that this deletion can only be performed by a super admin and since I will be knowing that
      };
    }
    return NextResponse.json(
      {
        msg: "admin deleted successfully",
        data: deletedAdmin,
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
        status: error.statusCode,
      }
    );
  }
}
