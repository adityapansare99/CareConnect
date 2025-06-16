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
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {reldoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50 " src={item.image} alt="" />
            <div className="p-4 ">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.avaliable ? "text-green-500" : "text-gray-500"
                }`}
              >
                <p
                  className={`h-2 w-2 rounded-full ${
                    item.avaliable ? "bg-green-500" : "bg-gray-500"
                  } `}
                ></p>
                <p>{item.avaliable ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
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
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default Relateddoctors;
