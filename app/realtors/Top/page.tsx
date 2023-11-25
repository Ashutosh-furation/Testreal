"use client";

import { useState, useEffect } from "react";
import TopCards from "@/components/TopCards/TopCards";
import Image from "next/image";

interface TopCard {
  projectname: string;
  projectdescription: string;
  project: string;
}

export default function TopProjects() {
  const [topcard, Settopcard] = useState<TopCard[]>([
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
    {
      projectname: "01",
      projectdescription: "12-nov-199",
      project: "project name",
    },
  ]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen width is below a certain threshold (e.g., 640px)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Event listener to update isMobile state on window resize
    window.addEventListener("resize", checkIsMobile);

    // Initial check
    checkIsMobile();

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <>
      <div className="Top-container  border-red-900 min-h-screen">
        <div className="Top-Box w-[90%] m-auto mt-5 py-8 border-2 ">
          <h1 className="text-black font-semibold text-xl sm:text-2xl md:text-5xl px-2">
            Top 10 recently launched projects{" "}
          </h1>
        </div>

        <div className="Topproject-container  w-[90%] m-auto mt-5 gap-5 border-green-700 ">
          {topcard.length > 0 &&
            topcard.map((el, index) => {
              return (
                <div key={index}
                
                className=" w-[100%]  flex sm:flex-row flex-col-reverse  items-center   gap-5 m-auto mt-5 border-yellow-700">
                  <div className="w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] m-auto border-red-800">
                    <h1 className="  py-2 px-4 font-semibold text-2xl text-black">
                      {" "}
                      Project name here{" "}
                    </h1>
                    <div>
                      <p
                        className={`px-2 sm:px-4 ${
                          isMobile ? "truncate" : ""
                        } sm:text-clip sm:overflow-hidden  py-2 text-sm`}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Velit ipsum nostrum magni, odio doloremque culpa
                        natus cupiditate.
                      </p>
                    </div>

                    <div className="Tag-conatiner  w-[100%]  md:w-[100%] lg:w-[70%]  py-4 px-2 border-green-800 ">
                      <div className="tag-box px-2 flex gap-5 justify-between border-yellow-700">
                        <button className=" px-2  font-semibold bg-[#F4F4F4]">
                          {" "}
                          Tag one{" "}
                        </button>
                        <button className=" px-2 font-semibold bg-[#F4F4F4]">
                          {" "}
                          Tag two
                        </button>
                        <button className=" px-2 font-semibold bg-[#F4F4F4]">
                          {" "}
                          Tag three
                        </button>
                      </div>

                      <div className="py-3 sm:py-6 flex  px-4 border-red-800">
                        <h2 className="font-semibold">View project</h2>
                        <div className=" border-green-800">
                          <Image
                            src={"/assets/icon.png"}
                            alt="right arrow icon"
                            width={40}
                            height={35}
                            className="w-[5%]"
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" w-[100%] sm:w-[50%] m-auto border-green-800">
                    <div className=" py-2 border-red-800">
                      <Image
                        src={"/assets/PlaceholderImage.svg"}
                        width={100}
                        height={100}
                        alt="image"
                        className="w-[100%] sm:w-[80%] m-auto"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="invenseting-container   border-green-800 w-[90%] m-auto mt-5 ">
          <h1 className="py-2 px-2 text-xl sm:text-4xl font-semibold text-black">
            {" "}
            Investing in Condos in Toronto
          </h1>
          <div className=" w-[100%] flex sm:flex-row flex-col-reverse  items-center gap-5 m-auto border-yellow-700">
            <div className=" w-[100%] sm:w-[50%] m-auto border-red-800">
              <p className="px-4 py-2 text-sm">
                Home to over 2.8 Million people of every culture from all over
                the globe, Toronto is one of the most diverse and exciting
                cities in the world. Located in Southern Ontario just North of
                Lake Ontario, Toronto is one of the most iconic and picturesque
                cities in the world. In the past 10 years, new condos in Toronto
                have drastically changed the city’s skyline. The revitalization
                of the Downtown Core is now home to approximately 400 new condo
                projects alone. This has once again made Downtown and the
                Waterfront a highly demanded place to call home. Currently,
                there are roughly 2000 new condos in Toronto that draw the
                attention of all types of homeowners. The Toronto real estate
                market is one of, if not, THE hottest in the country with an
                average of 4000 new condos for sale at any given time and
                roughly 2000+ condos being sold monthly. Over the past 5 years,
                the average price per square foot for a new condo in Toronto has
                grown from $434/Sq.ft to $760/Sq.ft (that’s up 75%!). At times,
                the Toronto condo resale market has even outperformed the
                Toronto Stock Exchange, making new condos in Toronto an
                investment worth getting involved in.
              </p>
            </div>

            <div className=" w-[100%] sm:w-[50%]">
              <div className=" border-red-800">
                <Image
                  src={"/assets/PlaceholderImage.svg"}
                  width={100}
                  height={100}
                  alt="image"
                  className="w-[90%] m-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/**** */}

        <div className=" Transporation-container  border-red-900 
           w-[95%] m-auto mt-5 py-2 "
        >
          <div className="Transporation-Box  border-yellow-800 flex sm:flex-row flex-col  items-center ">
            <div className=" w-[100%] sm:w-[50%]  m-auto border-brown-700">
              <div className="w-[82%] m-auto py-2">
                <h1 className="py-2 text-xl sm:text-4xl font-semibold text-black">
                  {" "}
                  Transportation
                </h1>
              </div>

              <div className=" border-red-800">
                <Image
                  src={"/assets/PlaceholderImage.svg"}
                  width={100}
                  height={100}
                  alt="image"
                  className="w-[80%] m-auto"
                />
              </div>
            </div>

            <div className="w-[90%] sm:w-[45%]  m-auto border-red-800">
              <p className="py-2 text-sm">
                Buying a new condo in Toronto is a popular investment due to the
                desire to be at the heart of the city and everything that comes
                along with it. New condo developments outside of the city make a
                conscious effort to make it easy to travel into the city.
                However, for buyers who would rather skip the commute and buy or
                rent minutes away from their work, world-class entertainment,
                and any restaurant you can think of, Toronto is the place to be.
              </p>
            </div>
          </div>
        </div>

        {/*** */}

        <div className=" w-[85%] px-2 m-auto border-red-700">
          <h2 className="font-semibold py-2"> GO Train </h2>
          <p className="text-[.8rem]">
            {" "}
            GO Transit is the regional public transit service for the Greater
            Toronto and Hamilton Area. Serving more than seven million people
            across 11,000+ square KM riders can travel to Hamilton and
            Kitchener-Waterloo in the west, Newcastle and Peterborough in the
            east, Orangeville and Beaverton in the north, and Niagara Falls in
            the south.
          </p>
        </div>

        <div className=" py-2 w-[85%] px-2 m-auto border-red-700">
          <h2 className="font-semibold py-2"> VIA Rail </h2>
          <p className="text-[.8rem]">
            {" "}
            Canada’s famous VIA Rail also stops at Union Station. Whether you
            want to travel to Montreal for the weekend, or plan a vacation to
            Vancouver VIA Rail has you covered. Travel safely coast-to-coast by
            rail and your new home in Toronto will be right here waiting for
            you.
          </p>
        </div>

        <div className=" py-2 w-[85%] px-2 m-auto border-red-700">
          <h2 className="font-semibold py-2"> TTC </h2>
          <p className="text-[.8rem]">
            {" "}
            TTC is the public transit service that services the entire city of
            Toronto. With a strong network of four subway lines (soon to be
            five), buses, streetcars, and LRT’s riders can access virtually
            anywhere in the city. New condos built near subway lines and bus
            stops attract Toronto home buyers who want to explore their city.
          </p>
        </div>

        <div className=" py-2 w-[85%] px-2 m-auto ">
          <h1 className="text-xl sm:text-4xl py-4 font-semibold">
            {" "}
            Lifestyle{" "}
          </h1>

          <div className="m-auto border-red-700">
            <h2 className="font-semibold py-2"> RESTAURANTS </h2>
            <p className="text-[.8rem]">
              {" "}
              When buying a new condo in Toronto you are given the luxury of
              either cooking at home or having any cuisine of the world cooked
              for you. Toronto has every restaurant you can think of whether it
              be a large food-chain or a mom and pop bakery.
            </p>
          </div>

          <div className=" py-2  m-auto border-red-700">
            <h2 className="font-semibold py-2"> RECREATION </h2>
            <p className="text-[.8rem]">
              {" "}
              New condos in Toronto come loaded with their own private amenities
              that add to the comfort of home. However, despite the Downtown
              core being a concrete jungle, there are countless options for golf
              courses, parks, beaches, sports, and indoor activities.
            </p>
          </div>

          <div className=" py-2  m-auto border-red-700">
            <h2 className="font-semibold py-2"> ENTERAINMENT </h2>
            <p className="text-[.8rem]">
              {" "}
              Buying a new condo in Toronto you’re moments away from the best
              entertainment in the world. Catch a Jays, Leafs, Raptors, TFC, or
              Argos game any night of the week or take a trip to the Scotiabank
              Arena or Budweiser Stage to indulge in the world’s biggest names
              and talents.
            </p>
          </div>
        </div>

        {/***** */}
      </div>
    </>
  );
}
/**   <div className="w-[100%] flex justify-between gap-5 m-auto border-yellow-700">
              <div className="w-[60%] m-auto border-brown-800">
                <h1 className=" py-2 px-2 text-center text-3xl text-black">
                  {" "}
                  Transportation
                </h1>
                <div className="py-2 border-red-800">
                  <Image
                    src={"/assets/PlaceholderImage.svg"}
                    width={100}
                    height={100}
                    alt="image"
                    className="w-[60%] m-auto"
                  />
                </div>
              </div>
              <div className=" w-[40%] m-auto border-red-800">
                <p className="px-4 py-2 text-sm">
                  Home to over 2.8 Million people of every culture from all over
                  the globe, Toronto is one of the most diverse and exciting
                  cities in the world. Located in Southern Ontario just North of
                  Lake Ontario, Toronto is one of the most iconic and
                  picturesque cities in the world. In the past 10 years, new
                  condos in Toronto have drastically changed the city’s skyline.
                  The revitalization of the Downtown Core is now home to
                  approximately 400 new condo projects alone. This has once
                  again made Downtown and the Waterfront a highly demanded place
                  to call home. Currently, there are roughly 2000
                </p>
              </div>
            </div> */
