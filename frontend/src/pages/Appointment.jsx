import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import Relateddoctors from "../components/Relateddoctors.jsx";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency } = useContext(AppContext);
  const [docinfo, setdocinfo] = useState(null);
  const [docslot, setdocslot] = useState([]);
  const [slotindex, setslotindex] = useState(0);
  const [slottime, setslottime] = useState("");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchDocInfo = async () => {
    const docinfo = doctors.find((doc) => doc._id === docId);
    setdocinfo(docinfo);
  };

  const getavailableslots = async () => {
    setdocslot([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endtime) {
        let formatteddate = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formatteddate,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setdocslot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getavailableslots();
  }, [docinfo]);

  useEffect(() => {
    console.log(docslot);
  }, [docslot]);

  return (
    docinfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg"
              src={docinfo.image}
              alt={docinfo.name}
            />
          </div>

          <div className="flex-1 border bordder-gray-400  rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docinfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docinfo.degree}-{docinfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docinfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500  max-w-[700px] mt-1">
                {docinfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currency}
                {docinfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*Available Slots*/}

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          <div className="flex gap-3 items-center w-full overscroll-x-scroll mt-4">
            {docslot.length &&
              docslot.map((item, index) => (
                <div
                  onClick={() => {
                    setslotindex(index);
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotindex === index
                      ? "bg-[#5f6FFF] text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && days[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docslot.length && docslot[slotindex].map((item, index) => (
              <p onClick={()=>{
                setslottime(item.time);
              }} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slottime ? "bg-[#5f6FFF] text-white" : "border border-gray-200"}`} key={index}> 
              {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button className="bg-[#5f6FFF] text-white font-light text-sm px-14 py-3 rounded-full my-6">Book an appointment</button>
        </div>

        <Relateddoctors docId={docId} speciality={docinfo.speciality}/>

      </div>
    )
  );
};

export default Appointment;
