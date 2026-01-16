import React, { use, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Relateddoctors = (props) => {
  const { doctors } = useContext(AppContext);
  const [reldoc, setreldoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && props.speciality) {
      const docdata = doctors.filter(
        (item) =>
          item.speciality === props.speciality && item._id !== props.docId
      );
      setreldoc(docdata);
    }
  }, [doctors, props.docId, props.speciality]);

  return (
    <div className="flex flex-col items-center gap-6 mt-16 text-gray-900">

      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">
          Related <span className="text-indigo-600">Doctors</span>
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          Explore other specialists in {props.speciality} to find the perfect
          match for your healthcare needs.
        </p>
      </div>

      {reldoc.length > 0 ? (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
            {reldoc.slice(0, 5).map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                key={index}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                  <img
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute top-3 right-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        item.avaliable
                          ? "bg-green-100/80 text-green-700 border border-green-200"
                          : "bg-gray-100/80 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {item.avaliable ? "Available" : "Not Available"}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.avaliable ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    <p
                      className={`text-xs font-medium ${
                        item.avaliable ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {item.avaliable ? "Available Today" : "Unavailable"}
                    </p>
                  </div>

                  <p className="text-gray-900 text-lg font-bold group-hover:text-indigo-600 transition-colors duration-300">
                    {item.name}
                  </p>

                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="mt-6 px-10 py-3 rounded-lg text-sm font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            View All Doctors
          </button>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No related doctors found at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Relateddoctors;