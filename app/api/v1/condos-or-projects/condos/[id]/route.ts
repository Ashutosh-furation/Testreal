import { connectDb } from "@/dbConfig/dbConfig";
import { CondoOrProject } from "@/models/condo-or-project-model";
import { Admin } from "@/models/admin-model";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";
import { FAQ } from "@/models/faq-model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connectDb();

// Defining an interface for the FAQ object
interface FAQInterface {
  question: string;
  answer: string;
}

// ============This is the method to fetch a particular condo from the database
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const condoId = params.id;
  try {
    const foundCondo = await CondoOrProject.findOne({
      _id: condoId,
      type: "condo",
    });

    return NextResponse.json(
      {
        msg: "Condo fetched successfully",
        data: foundCondo,
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

// ================This is the method to update a particular condo in the database
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    // console.log("Inside try123");
    const payload: any = getPayloadFromTokenAfterVerification();
    // console.log("This is the payload after verification :-", payload);
    const adminFound = await Admin.findOne({ _id: payload.id });
    // console.log("This is the admin found", adminFound);
    if (!adminFound) {
      throw {
        message: "No admin found with the provided token",
        statusCode: 400,
      };
    }

    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the ID is not a valid Mongoose ID
      // console.log("Invalid ID provided.");
      throw {
        message: "Invalid ID provided in the path params.",
        statusCode: 400,
      };
    }
    const reqBody = await req.json();
    const { faqs, uploadedByAdmin, ...dataExceptFaqs } = reqBody;
    let updatedCondo = await CondoOrProject.findOneAndUpdate(
      { _id: id, type: "condo", uploadedByAdmin: adminFound._id },
      { $set: dataExceptFaqs },
      {
        new: true,
      }
    );
    if (!updatedCondo) {
      throw {
        message:
          "No condo updated because id provided do not belong to a condo or you are not the admin who uploaded this condo",
        statusCode: 403,
      };
    }
    if (faqs && faqs.length > 0) {
      // Create and save FAQs
      const createdFAQs = await Promise.all(
        faqs.map(async (faq: FAQInterface) => {
          const newFAQ = new FAQ({
            question: faq.question,
            answer: faq.answer,
          });
          return await newFAQ.save();
        })
      );

      if (updatedCondo) {
        // Associate created FAQs with the updated condo
        updatedCondo = await CondoOrProject.findOneAndUpdate(
          { _id: updatedCondo._id },
          { $push: { faqs: { $each: createdFAQs.map((faq) => faq._id) } } },
          {
            new: true,
          }
        );
      }
    }
    return NextResponse.json(
      {
        msg: "Condo updated successfully",
        data: updatedCondo,
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

// ================This is the method to delete a particular condo from the database
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    console.log("Inside delete");
    const payload: any = getPayloadFromTokenAfterVerification();
    // console.log("This is the payload after verification :-", payload);
    const adminFound = await Admin.findOne({ _id: payload.id });
    // console.log("This is the admin found", adminFound);
    if (!adminFound) {
      throw {
        message: "No admin found with the provided token",
        statusCode: 400,
      };
    }
    const id = params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        message: "Invalid ID provided in the path params.",
        statusCode: 400,
      };
    }
    // ============= Any one of the below method can be used to delete a condo, but there is a difference in the returned value
    const deletedCondo = await CondoOrProject.findOneAndDelete({
      _id: id,
      type: "condo",
      uploadedByAdmin: adminFound._id,
    });
    // const deletedCondo = await Condo.deleteOne({ _id: id });
    if (!deletedCondo) {
      throw {
        message:
          "No condo deleted because id provided do not belong to a condo or you are not the admin who uploaded this condo",
        statusCode: 403,
      };
    }
    return NextResponse.json(
      {
        msg: "Condo deleted successfully",
        data: deletedCondo,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // console.log("Inside catch@");
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
