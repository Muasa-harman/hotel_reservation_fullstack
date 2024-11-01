// import { FormEvent, useState } from "react";
// import { useSearchContext } from "../context/SearchContext";
// import { MdTravelExplore } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";

// const SearchBar = () => {
//   const search = useSearchContext();
//   const navigate = useNavigate();
  
//   const [destination, setDestination] = useState<string>(search.destination || '');
//   const [checkIn, setCheckIn] = useState<Date | null>(search.checkIn || null);
//   const [checkOut, setCheckOut] = useState<Date | null>(search.checkOut || null);
//   const [adultCount, setAdultCount] = useState<number>(search.adultCount || 1);
//   const [childCount, setChildCount] = useState<number>(search.childCount || 0);

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
//     navigate("/search");
//   };

//   const handleClear = () => {
//     setDestination('');
//     setCheckIn(null);
//     setCheckOut(null);
//     setAdultCount(1);
//     setChildCount(0);
//   };

//   const minDate = new Date();
//   const maxDate = new Date();
//   maxDate.setFullYear(maxDate.getFullYear() + 1);

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
//     >
//       <div className="flex flex-row items-center flex-1 bg-white p-2 rounded">
//         <MdTravelExplore size={25} className="mr-2" />
//         <input
//           type="text"
//           placeholder="Where are you going?"
//           className="text-md w-full focus:outline-none"
//           value={destination}
//           onChange={(event) => setDestination(event.target.value)}
//         />
//       </div>
//       <div className="flex bg-white px-2 py-1 gap-2 rounded">
//         <label className="items-center flex">
//           Adults:
//           <input
//             className="w-full p-1 focus:outline-none font-bold"
//             type="number"
//             min={1}
//             max={20}
//             value={adultCount}
//             onChange={(event) => setAdultCount(Math.max(1, parseInt(event.target.value)))}
//           />
//         </label>
//         <label className="items-center flex">
//           Children:
//           <input
//             className="w-full p-1 focus:outline-none font-bold"
//             type="number"
//             min={0}
//             max={20}
//             value={childCount}
//             onChange={(event) => setChildCount(Math.max(0, parseInt(event.target.value)))}
//           />
//         </label>
//       </div>

//       <div className="flex flex-col w-full">
//         <DatePicker
//           selected={checkIn ? checkIn : undefined} // Pass undefined if checkIn is null
//           onChange={(date) => setCheckIn(date)}
//           selectsStart
//           startDate={checkIn}
//           endDate={checkOut}
//           minDate={minDate}
//           maxDate={maxDate}
//           placeholderText="Check-in Date"
//           className="min-w-full bg-white p-2 focus:outline-none rounded"
//         />
//       </div>
//       <div className="flex flex-col w-full">
//         <DatePicker
//           selected={checkOut ? checkOut : undefined} // Pass undefined if checkOut is null
//           onChange={(date) => setCheckOut(date)}
//           selectsEnd
//           startDate={checkIn}
//           endDate={checkOut}
//           minDate={checkIn ? checkIn : minDate} // Ensure minDate is handled correctly
//           maxDate={maxDate}
//           placeholderText="Check-out Date"
//           className="min-w-full bg-white p-2 focus:outline-none rounded"
//         />
//       </div>
//       <div className="flex gap-1">
//         <button className="w-2/3 bg-gray-600 text-white h-full p-2 font-bold text-xl hover:bg-gray-500 transition">
//           Search
//         </button>
//         <button
//           type="button"
//           onClick={handleClear}
//           className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 transition"
//         >
//           Clear
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;


import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in Date"
          className="min-w-full bg-green p-2 text-black focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-green-600 text-white h-full p-2 font-bold text-xl hover:bg-green-500">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
