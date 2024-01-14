import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManageHotelForm from "../forms/ManageHotelform/ManageHotelForm";
import { useAppContext } from "../context/AppContext";

function EditHotel() {
  const {hotelId} = useParams();
  const {showToast} = useAppContext()

  const {data: hotel} = useQuery("fetchMyHotelById", () =>apiClient.fetchMyHotelById(hotelId || ''),{
    enabled: !!hotelId
  });

  const {mutate, isLoading} = useMutation(apiClient.updateHotelById, {
    onSuccess: () =>{
      showToast({message: "Hotel Saved!", type: "SUCCESS"});
    },
    onError: ()=>{
      showToast({message: "Error Saving Hotel", type: "ERROR"});
    },
  });

  const handleSave = (hotelFormData: FormData) =>{
    mutate(hotelFormData);
  }
  return (
    <ManageHotelForm hotel= {hotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel;

function showToast(arg0: { message: string; type: string; }) {
  throw new Error("Function not implemented.");
}
