import { connectDb } from "@/dbConfig/dbConfig";
import { CondoOrProject } from "@/models/condo-or-project-model";
import { FAQ } from "@/models/faq-model";
import { Admin } from "@/models/admin-model";
import { getPayloadFromTokenAfterVerification } from "@/helpers/getPayloadFromTokenAfterVerification";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// Defining an interface for the FAQ object
interface FAQInterface {
  question: string;
  answer: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload: any = getPayloadFromTokenAfterVerification();
    console.log("This is the payload after verfication ", payload);
    const adminFound = await Admin.findOne({ _id: payload.id });
    // console.log("@@@@@", adminFound);
    if (!adminFound) {
      throw new Error("No admin found with the provided token");
    }
    const reqBody = await req.json();
    const {
      name,
      shortDescription,
      developerName,
      address,
      city,
      country,
      landmark,
      numberOfStorey,
      numberOfUnits,
      occupancyDate,
      maintenanceFee,
      pricedFrom,
      overViewImages,
      overViewVideos,
      aboutCondo,
      aboutImages,
      aboutVideos,
      featuresAndFacilities,
      featureImages,
      featureVideos,
      aboutDeveloper,
      developerImages,
      developerVideos,
      deposit,
      faqs,
      attachments,
    } = reqBody;

    const newProject = new CondoOrProject({
      name,
      shortDescription,
      developerName,
      address,
      city,
      country,
      landmark,
      numberOfStorey,
      numberOfUnits,
      occupancyDate,
      maintenanceFee,
      pricedFrom,
      overViewImages,
      overViewVideos,
      aboutCondo,
      aboutImages,
      aboutVideos,
      featuresAndFacilities,
      featureImages,
      featureVideos,
      aboutDeveloper,
      developerImages,
      developerVideos,
      uploadedByAdmin: adminFound._id,
      type: "project",
      deposit,
      attachments,
    });

    const savedProject = await newProject.save();
    // console.log("hello !!! ", savedProject);
    adminFound.projects.push(savedProject._id);
    await adminFound.save();

    // Creating FAQs if they are provided and associating them with the newly created project
    if (faqs && faqs.length > 0) {
      const createdFAQs = await Promise.all(
        faqs.map(async (faq: FAQInterface) => {
          const newFAQ = new FAQ({
            question: faq.question,
            answer: faq.answer,
          });
          return await newFAQ.save();
        })
      );

      // Associate created FAQs with the newly saved project
      savedProject.faqs.push(...createdFAQs.map((faq) => faq._id));
      await savedProject.save();
    }
    return NextResponse.json(
      {
        message: "new project created successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    // console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

// ================This is the method to find all the projects
export async function GET(req: NextRequest) {
  try {
    const allProjects = await CondoOrProject.find({ type: "project" });
    return NextResponse.json(
      {
        totalProjects: allProjects.length,
        data: allProjects,
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
