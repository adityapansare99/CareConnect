import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p className="text-3xl font-bold">
          ABOUT <span className="text-gray-900">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-2xl shadow-lg"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600">
          <p className="leading-relaxed">
            Welcome to CareConnect, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At CareConnect, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="leading-relaxed">
            CareConnect is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, CareConnect is here to support you every step of the
            way.
          </p>
          <b className="text-gray-900 text-base">Our Vision</b>
          <p className="leading-relaxed">
            Our vision at CareConnect is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p className="text-2xl font-bold text-gray-900">
          WHY <span className="text-indigo-600">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-4">
        <div className="border border-gray-200 rounded-2xl md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 text-gray-600 cursor-pointer group shadow-sm hover:shadow-xl">
          <b className="sm:mx-0 mx-4 text-lg group-hover:text-white">EFFICIENCY:</b>
          <p className="sm:mx-0 mx-4 leading-relaxed">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 text-gray-600 cursor-pointer group shadow-sm hover:shadow-xl">
          <b className="sm:mx-0 mx-4 text-lg group-hover:text-white">CONVENIENCE:</b>
          <p className="sm:mx-0 mx-4 leading-relaxed">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border border-gray-200 rounded-2xl md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 text-gray-600 cursor-pointer group shadow-sm hover:shadow-xl">
          <b className="sm:mx-0 mx-4 text-lg group-hover:text-white">PERSONALIZATION:</b>
          <p className="sm:mx-0 mx-4 leading-relaxed">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;