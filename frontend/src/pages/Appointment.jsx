import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import Relateddoctors from "../components/Relateddoctors.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency, backendurl, getdocdata, token } =
    useContext(AppContext);
  const [docinfo, setdocinfo] = useState(null);
  const [docslot, setdocslot] = useState([]);
  const [slotindex, setslotindex] = useState(0);
  const [slottime, setslottime] = useState(null);
  const navigate = useNavigate();
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

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let slotDate = day + "_" + month + "_" + year;
        const slotTime = formatteddate;

        const isslotavailable =
          docinfo?.slots_booked &&
          docinfo.slots_booked[slotDate] &&
          docinfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isslotavailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formatteddate,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setdocslot((prev) => [...prev, timeSlots]);
    }
  };

  const bookappointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docslot[slotindex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        `${backendurl}/user/book-appointment`,
        { docId, slotDate, slotTime: slottime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getdocdata();
        navigate("/my-appointments");
      } else {
        const msg = err?.response?.data?.message || "Something went wrong!";
        toast.error(msg);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getavailableslots();
  }, [docinfo]);

  useEffect(() => {}, [docslot]);

  return (
    docinfo && (
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="text-center text-2xl mb-10 text-gray-500">
          <p className="text-3xl font-bold">
            BOOK <span className="text-gray-900">APPOINTMENT</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
          <div className="flex flex-col sm:flex-row gap-6 p-6 md:p-8">

            <div className="flex-shrink-0">
              <img
                className="w-full sm:w-72 h-72 object-cover rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 shadow-md"
                src={docinfo.image}
                alt={docinfo.name}
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {docinfo.name}
                </p>
                <img
                  className="w-6 h-6"
                  src={assets.verified_icon}
                  alt="Verified"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-indigo-600 font-medium">
                  {docinfo.degree} - {docinfo.speciality}
                </span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs rounded-full font-medium">
                  {docinfo.experience}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <p className="flex items-center gap-2 text-base font-bold text-gray-900">
                  About
                  <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
                </p>
                <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                  {docinfo.about}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  Appointment fee:{" "}
                  <span className="text-2xl font-bold text-gray-900 ml-2">
                    {currency}
                    {docinfo.fees}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
          <p className="text-xl font-bold text-gray-900 mb-6">
            Available Booking Slots
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Select Date
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {docslot.length > 0 &&
                docslot.map((item, index) => (
                  <div
                    onClick={() => {
                      setslotindex(index);
                      setslottime(null);
                    }}
                    className={`flex-shrink-0 text-center py-4 px-6 min-w-[80px] rounded-xl cursor-pointer transition-all duration-300 ${
                      slotindex === index
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                        : "border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md"
                    }`}
                    key={index}
                  >
                    <p className="text-xs font-medium mb-1">
                      {item[0] && days[item[0].datetime.getDay()]}
                    </p>
                    <p className="text-2xl font-bold">
                      {item[0] && item[0].datetime.getDate()}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Select Time Slot
            </p>
            <div className="flex flex-wrap gap-3">
              {docslot.length > 0 &&
                docslot[slotindex].map((item, index) => (
                  <button
                    onClick={() => {
                      setslottime(item.time);
                    }}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      item.time === slottime
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                        : "border-2 border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-md"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={bookappointment}
              disabled={!slottime}
              className={`w-full sm:w-auto px-12 py-4 rounded-lg text-base font-semibold transition-all duration-300 ${
                slottime
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:scale-105 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {slottime ? "Book Appointment" : "Please Select a Time Slot"}
            </button>
          </div>

          {slottime && (
            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Selected Slot:</span>{" "}
                {docslot[slotindex][0] &&
                  days[docslot[slotindex][0].datetime.getDay()]}{" "}
                {docslot[slotindex][0] &&
                  docslot[slotindex][0].datetime.getDate()}{" "}
                at {slottime}
              </p>
            </div>
          )}
        </div>

        <Relateddoctors docId={docId} speciality={docinfo.speciality} />
      </div>
    )
  );
};

export default Appointment;