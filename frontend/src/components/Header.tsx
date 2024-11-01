import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <div className="bg-gray-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">DonfilesHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? <>
          <Link className="flex items-center text-white px-3 font-bold hover:bg-gray-600" to="/my-bookings">My Bookings</Link>
          <Link className="flex items-center text-white px-3 font-bold hover:bg-gray-600" to="/my-hotels">My Hotels</Link>
          <SignOutButton/>
          </> : 
          <Link
            to="/sign-in"
            className="flex bg-orange-400 items-center text-white px-3 font-bold hover:bg-gray-100"
          >
            Sign In
          </Link>
          }
        </span>
      </div>
    </div>
  );
};

export default Header;
