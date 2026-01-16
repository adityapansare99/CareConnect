import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setfilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filter, setfilter] = useState(false);

  const applyfilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600 text-lg">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        <button
          className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all sm:hidden ${
            filter ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => setfilter((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </div>
        </button>

        <div
          className={`flex-col gap-3 text-sm text-gray-600 ${
            filter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p className="text-lg font-semibold text-gray-900 mb-2">Specialities</p>
          
          <p
            onClick={() => {
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician");
            }}
            className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-16 border rounded-lg transition-all cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 ${
              speciality === "General physician" 
                ? "bg-indigo-50 text-indigo-600 border-indigo-600 font-medium" 
                : "border-gray-300"
            }`}
          >
            General physician
          </p>
          <p
            onClick={() => {
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist");
            }}
            className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-16 border rounded-lg transition-all cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 ${
              speciality === "Gynecologist" 
                ? "bg-indigo-50 text-indigo-600 border-indigo-600 font-medium" 
                : "border-gray-300"
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist");
            }}
            className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-16 border rounded-lg transition-all cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 ${
              speciality === "Dermatologist" 
                ? "bg-indigo-50 text-indigo-600 border-indigo-600 font-medium" 
                : "border-gray-300"
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => {
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians");
            }}
            className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-16 border rounded-lg transition-all cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 ${
              speciality === "Pediatricians" 
                ? "bg-indigo-50 text-indigo-600 border-indigo-600 font-medium" 
                : "border-gray-300"
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => {
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist");
            }}
            className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-16 border rounded-lg transition-all cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 ${
              speciality === "Neurologist" 
                ? "bg-indigo-50 text-indigo-600 border-indigo-600 font-medium" 
                : "border-gray-300"
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => {
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist");
            }}
            className={`w-[94vw] sm:w-auto pl-4 py-2.5 pr-16 border rounded-lg transition-all cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-50 text-indigo-600 border-indigo-600 font-medium"
                : "border-gray-300"
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
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
      </div>
    </div>
  );
};

export default Doctors;