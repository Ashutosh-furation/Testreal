import { connectDb } from "@/dbConfig/dbConfig";

import { Admin } from "@/models/admin-model";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ===============this is the method to create an Admin in the database
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, isActive, isSuperAdmin, projects, condos } = reqBody;
    console.log(reqBody);

    //check if user already exists
    const admin = await Admin.find({ email });

    if (admin.length > 0) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 409 }
      );
    }

    const newAdmin = new Admin({
      name,
      email,
      isActive,
      isSuperAdmin,
      condos,
      projects,
    });

    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);

    return NextResponse.json(
      {
        message: "Admin created successfully",
        success: true,
        data: savedAdmin,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const admins = await Admin.find();
    return NextResponse.json(
      {
        totalAdmins: admins.length,
        data: admins,
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
