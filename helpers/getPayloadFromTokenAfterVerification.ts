import jwt from "jsonwebtoken";
import { headers } from "next/headers";
// import { NextResponse } from "next/server";

function getPayloadFromTokenAfterVerification() {
  const headersList = headers();

  try {
    // console.log("This is the header list()", headersList);
    let authorization = headersList.get("authorization");
    let token = authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Please provide the token");
    }
    const secretKey = "01605A@cluster001605A@cluster0";
    // const secretKey = process.env.TOKEN_SECRET;

    let payload = jwt.verify(token, secretKey);

    // console.log("**********", payload);
    return payload;
  } catch (error: any) {
    console.log("This is the error:-", error.message);
    throw { message: error.message, statusCode: 401 };
  }
}

export { getPayloadFromTokenAfterVerification };
