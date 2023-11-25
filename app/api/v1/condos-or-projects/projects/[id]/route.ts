import { connectDb } from "@/dbConfig/dbConfig";
import { CondoOrProject } from "@/models/condo-or-project-model";
import { FAQ } from "@/models/faq-model";
import { Admin } from "@/models/admin-model";
import mongoose from "mongoose";

import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// Defining an interface for the FAQ object
interface FAQInterface {
  question: string;
  answer: string;
}

// ============This is the method to fetch a particular project from the database
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  const projectId = params.id;
  try {
    const foundProject = await CondoOrProject.findOne({
      _id: projectId,
      type: "project",
    });
    return NextResponse.json(
      {
        msg: "Project fetched successfully",
        data: foundProject,
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

// ================This is the method to update a particular project in the database
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    console.log("Inside try");
    const payload: any = getPayloadFromTokenAfterVerification();
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
    const reqBody = await req.json();
    const { faqs, uploadedByAdmin, ...dataExceptFaqs } = reqBody;

    let updatedProject = await CondoOrProject.findOneAndUpdate(
      { _id: id, type: "project", uploadedByAdmin: adminFound._id },
      { $set: dataExceptFaqs },
      {
        new: true,
      }
    );
    if (!updatedProject) {
      throw {
        message:
          "No project updated because id provided do not belong to a condo or you are not the admin who uploaded this condo",
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

      if (updatedProject) {
        // Associate created FAQs with the updated condo
        updatedProject = await CondoOrProject.findOneAndUpdate(
          { _id: updatedProject._id },
          { $push: { faqs: { $each: createdFAQs.map((faq) => faq._id) } } },
          {
            new: true,
          }
        );
      }
    }
    return NextResponse.json(
      {
        msg: "Project updated successfully",
        data: updatedProject,
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

// ================This is the method to delete a particular project from the database
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const payload: any = getPayloadFromTokenAfterVerification();
    const adminFound = await Admin.findOne({ _id: payload.id });
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
    const deletedProject = await CondoOrProject.findOneAndDelete({
      _id: id,
      type: "project",
      uploadedByAdmin: adminFound._id,
    });
    // const deletedCondo = await Project.deleteOne({ _id: id });
    if (!deletedProject) {
      throw {
        message:
          "No project deleted because id provided do not belong to a project or you are not the admin who uploaded this project",
        statusCode: 403,
      };
    }
    return NextResponse.json(
      {
        msg: "Project deleted successfully",
        data: deletedProject,
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
