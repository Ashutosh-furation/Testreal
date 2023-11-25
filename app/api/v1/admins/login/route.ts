import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import { connectDb } from "@/dbConfig/dbConfig";
import { Admin } from "@/models/admin-model";
dotenv.config();
connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);

    //check if user exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "No admin found with the provided email" },
        { status: 404 }
      );
    }
    // console.log("admin exists ***********", admin);
    //create token data
    const payload = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    };

    //creating token
    const secretKey = "01605A@cluster001605A@cluster0";
    // const secretKey = process.env.TOKEN_SECRET;

    const token = await jwt.sign(payload, secretKey, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        token: token,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
