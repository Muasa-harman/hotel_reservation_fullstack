import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelform/ManageHotelForm"
import { useAppContext } from "../context/AppContext"
import * as apiClient from "../api-client"

const AddHotel = () => {
    const {showToast} = useAppContext();

    const {mutate, isLoading} = useMutation(apiClient.addMyHotel,{
        onSuccess: () =>{
            showToast({message: "Hotel Saved!", type: "SUCCESS"})
        },
        onError: () =>{
            showToast({message: "Error Saving Hotel", type: "ERROR"})
            console.log(onerror)
        },
    });
    const handleSave = (hotelFormData: FormData)=>{
        mutate(hotelFormData);
    };
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={{
          _id: "",
          userId: "",
          name: "",
          city: "",
          country: "",
          description: "",
          type: "",
          adultCount: 0,
          childCount: 0,
          facilities: "",
          pricePerNight: 0,
          starRating: 0,
          imageUrls: [],
          lastUpdated: new Date(),
      }}/>
  )

  }
export default AddHotel;