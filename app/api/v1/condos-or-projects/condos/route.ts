import { connectDb } from "@/dbConfig/dbConfig";
import { CondoOrProject } from "@/models/condo-or-project-model";
import { Admin } from "@/models/admin-model";
import { FAQ } from "@/models/faq-model";
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
    // console.log("First line");
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
    const reqBody = await req.json();
    // console.log("This is the reqbody", reqBody);
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

    const newCondo = new CondoOrProject({
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
      type: "condo",
      deposit,
      attachments,
    });
    // console.log("This is the newCondo", newCondo);
    const savedCondo = await newCondo.save();
    adminFound.condos.push(savedCondo._id);
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
      savedCondo.faqs.push(...createdFAQs.map((faq) => faq._id));
      await savedCondo.save();
    }
    return NextResponse.json(
      {
        message: "new condo created successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    // console.log("Hello guys");
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

// ================This is the method to find all the condos
export async function GET(req: NextRequest) {
  try {
    const allCondos = await CondoOrProject.find({ type: "condo" });
    return NextResponse.json(
      {
        totalCondos: allCondos.length,
        data: allCondos,
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
