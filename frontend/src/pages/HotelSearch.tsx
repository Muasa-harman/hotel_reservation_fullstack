import { useQuery } from "react-query";
import { fetchMyHotels } from "../api-client";
import { HotelType } from "../../../backend/src/shared/types"; 

const HotelSearch = () => {
  const { data: hotels, isLoading, error } = useQuery<HotelType[]>(
    "fetchHotels", 
    fetchMyHotels
  )

  if (isLoading) 
    return <div>Loading hotels...</div>
  if (error) {
    console.error("Error fetching hotels:", error)
    return <div>Error fetching hotels: {(error as Error).message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel._id} className="border rounded-lg overflow-hidden shadow-lg">
              <img
                src={hotel.imageUrls[0]} 
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <p className="text-gray-700">{hotel.description}</p>
                <p className="font-semibold">${hotel.pricePerNight} per night</p>
              </div>
            </div>
          ))
        ) : (
          <div>No hotels available at the moment.</div>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;

