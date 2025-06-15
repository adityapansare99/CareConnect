import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const calculateage = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();

    return age;
  };

   const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateformat = (slotDate) => {
    const datearray = slotDate.split("_");
    return (
      datearray[0] + " " + months[Number(datearray[1])] + " " + datearray[2]
    );
  };

  const currency='₹'
  const value = {
    calculateage,
    dateformat,
    currency
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
