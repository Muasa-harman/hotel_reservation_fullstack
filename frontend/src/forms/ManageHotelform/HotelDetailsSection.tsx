import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
    const {register,formState: {errors},} = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
        <h1 className="flex-3xl font-bold mb-3">Add Hotel</h1>
        <label className="text-gray-700 text-sm font-bold flex-1">Name
        <input className="border rounded w-full py-1 px-2  font-normal" {...register("name",{required: "This field is required"})} type="text" />
        {errors.name && (
        <span className="text-red-500">{errors.name?.message}</span>
        )}
        </label>
        <div className="flex justify-between">
        <label className="text-gray-700 text-sm font-bold flex-1">City
        <input className="border rounded w-full py-1 px-2  font-normal" {...register("city",{required: "This field is required"})} type="text" />
        {errors.city && (
        <span className="text-red-500">{errors.city?.message}</span>
        )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">Country
        <input className="border rounded w-full py-1 px-2  font-normal" {...register("country",{required: "This field is required"})} type="text" />
        {errors.country && (
        <span className="text-red-500">{errors.country?.message}</span>
        )}
        </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">Description
        <textarea rows={10} className="border rounded w-full py-1 px-2  font-normal" {...register("description",{required: "This field is required"})} />
        {errors.description && (
        <span className="text-red-500">{errors.description?.message}</span>
        )}
        </label>
        <label className="text-gray-700 text-sm max-w-[50%] font-bold flex-1">pricePerNight
        <input min={1} className="border rounded w-full py-1 px-2  font-normal" {...register("pricePerNight",{required: "This field is required"})} type="number" />
        {errors.pricePerNight && (
        <span className="text-red-500">{errors.pricePerNight?.message}</span>
        )}
        </label>
        <label className="text-gray-700 text-sm max-w-[50%] font-bold flex-1">starRating
        <select {...register("starRating", {required: "This field is required",})} className="border rounded w-full p-2 text-gray-700 font-normal">
            <option value="" className="testarRatingt-sm font-bold">
                Rating
            </option>
            {[1,2,3,4,5].map((num)=>(<option value={num}>{num}</option>))}
        </select>
        {errors.starRating && (
        <span className="text-red-500">{errors.starRating?.message}</span>
        )}
        </label>
    </div>
  )
}

export default HotelDetailsSection