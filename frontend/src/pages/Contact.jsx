import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="text-3xl font-bold">
          CONTACT <span className="text-gray-900">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[400px] md:mr-10 rounded-2xl shadow-lg"
          src={assets.contact_image}
          alt="Contact Us"
        />

        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600">
          <b className="text-gray-900 text-base">OUR OFFICE</b>
          <p className="leading-relaxed">
            00000 Hinjawadi IT Park 000, <br /> Pune, India
          </p>
          <p className="leading-relaxed">
            Tel: (000) 000-000 <br />
            Email: example@gmail.com
          </p>
          <b className="text-gray-900 text-base">CAREERS AT CareConnect</b>
          <p className="leading-relaxed">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-gray-900 px-8 py-4 text-sm hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 rounded-lg shadow-sm hover:shadow-xl w-fit">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;