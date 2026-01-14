import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-bold text-gray-900">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }
            }}
            className="border border-indigo-100 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:shadow-xl transition-all duration-500 bg-white group"
            key={index}
          >
            <div className="relative overflow-hidden">
              <img 
                className="bg-gradient-to-br from-indigo-50 to-purple-50 w-full h-auto group-hover:scale-110 transition-transform duration-500" 
                src={item.image} 
                alt="" 
              />
              <div className="absolute top-3 right-3">
                {item.avaliable ? (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-md">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white shadow-md">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></span>
                    Offline
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-900 text-lg font-semibold mb-1">{item.name}</p>
              <p className="text-indigo-600 text-sm font-medium">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          {
            navigate("/doctors");
          }
          {
            scrollTo(0, 0);
          }
        }}
        className="bg-indigo-600 text-white px-12 py-3 rounded-full mt-10 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;