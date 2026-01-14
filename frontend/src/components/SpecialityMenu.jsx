import React from "react";
import { specialityData } from "../assets/assets_frontend/assets.js";
import { Link } from "react-router-dom";

const Specialitymenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-bold text-gray-900">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => {
              scrollTo(0, 0);
            }}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 group"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <div className="w-16 sm:w-24 h-16 sm:h-24 mb-2 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors overflow-hidden">
              <img className="w-full h-full object-cover" src={item.image} alt="" />
            </div>
            <p className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Specialitymenu;