import {
  footerSocialLink,
  footerTermsLinks,
  footerroutes,
} from "@/app/constants";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="w-full  bg-gray-400 text-white">
      <footer className="max-w-7xl mx-auto  text-black">
        <div className="upper-part flex flex-row justify-between">
          <div className="left-container">
            <div>Logo</div>
            <ul className="flex flex-row gap-3">
              {footerroutes.map((route) => (
                <li key={route.id}>
                  <Link href={route.route}>{route.name}</Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-row gap-3">
              {footerSocialLink.map((route) => (
                <li key={route.id}>
                  <Image
                    src={route.image}
                    alt="social image"
                    width={50}
                    height={50}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="right-container">
            <h4>Ask your questions</h4>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Enter your email"
            />
            <textarea
              name="message"
              id="message"
              placeholder="Your message"
            ></textarea>
            <button className="bg-black text-white  px-3 py-2 rounded-md">
              Submit
            </button>
          </div>
        </div>
        <hr className="bg-black " />
        <div className="lower-part lex flex-row justify-between">
          <div className="">
            {footerTermsLinks.map((terms) => (
              <Link href={terms.route} key={terms.id} className="underline">
                {terms.name}
              </Link>
            ))}
          </div>
          <div>© 2023 Relume. All rights reserved.</div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
