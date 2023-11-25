import { connectDb } from "@/dbConfig/dbConfig";
import { CondoOrProject } from "@/models/condo-or-project-model";

import { NextRequest, NextResponse } from "next/server";
connectDb();

// ====================As of now there is no need of the below code that is why I am commenting it
// export async function POST(req: NextRequest) {
//   try {
//     const reqBody = await req.json();
//     const {
//       name,
//       shortDescription,
//       developerName,
//       address,
//       city,
//       country,
//       landmark,
//       numberOfStorey,
//       numberOfUnits,
//       occupancyDate,
//       maintenanceFee,
//       pricedFrom,
//       images,
//       videos,
//       aboutCondo,
//       featuresAndFacilities,
//       featureImage,
//       featureVideo,
//       aboutDeveloper,
//       developerImage,
//       developerVideo,
//       uploadedByAdmin,
//       type,
//       deposit,
//     } = reqBody;

//     const newCondoOrProject = new CondoOrProject({
//       name,
//       shortDescription,
//       developerName,
//       address,
//       city,
//       country,
//       landmark,
//       numberOfStorey,
//       numberOfUnits,
//       occupancyDate,
//       maintenanceFee,
//       pricedFrom,
//       images,
//       videos,
//       aboutCondo,
//       featuresAndFacilities,
//       featureImage,
//       featureVideo,
//       aboutDeveloper,
//       developerImage,
//       developerVideo,
//       uploadedByAdmin,
//       type,
//       deposit,
//     });

//     const savedCondoOrProject = await newCondoOrProject.save();

//     return NextResponse.json(
//       {
//         message: "new condo created successfully",
//         success: true,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// ================This is the method to find all the condos and projects collectively
export async function GET(req: NextRequest) {
  try {
    const allCondosOrProjects = await CondoOrProject.find();
    return NextResponse.json(
      {
        totalCondosAndProjects: allCondosOrProjects.length,
        data: allCondosOrProjects,
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
