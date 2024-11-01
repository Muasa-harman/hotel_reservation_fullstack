import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {HotelSearchResponse, HotelType, UserType} from "../../backend/src/shared/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/';

export const fetchCurrentUser = async():Promise<UserType> =>{
    const response = await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials:"include"
    });
    if(!response.ok){
        throw new Error("Error fetching user");
    }
    return response.json();
}

export const register = async (FormData:RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData)
    });

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message)
    }
};

export const signIn = async(FormData:SignInFormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(FormData)
    })
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    }
    return body;
}

export const validateToken = async () =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Token invalid")
    }

    return response.json();
};

export const signOut = async() =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials: "include"
    });
    if(!response.ok){
        throw new Error("Error during sign out");
    }
}

export const addMyHotel = async (hotelFormData: FormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });
    console.log("imageurl",response)
    if(!response.ok){
        throw new Error("failed to add hotel");
    }

    return response.json();
};

export const fetchMyHotels = async(): Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: "include"
    });
    if (!response.ok) {
        const errorBody = await response.text(); // Get the response as text to see the error page
        throw new Error(`Error fetching hotels: ${response.status} ${errorBody}`);
      }

    return response.json();
};

export const fetchMyHotelById = async (hotelId: string):Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials: "include"
    });
    if(!response.ok){
        console.log("fetchHotel log:",response)
    }
    return response.json();
};

export const updateHotelById = async (hotelFormData: FormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method: "PUT",
        body:hotelFormData,
        credentials: "include",
    },);
    if(!response.ok){
        throw new Error("Failed to update Hotel")
    }

    return response.json()
};

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?:string[];
    stars?: string[];
    types?: string[];
    maxPrice?: string;
    sortOptions?:string;
};

export const searchHotels = async(searchParams: SearchParams):Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOptions || "");

    searchParams.facilities?.forEach((facility)=> queryParams.append("facilities", facility));

    searchParams.types?.forEach((type: string)=> queryParams.append("types",type))
    searchParams.stars?.forEach((star)=> queryParams.append("stars", star))

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if(!response.ok){
        throw new Error("Error fetching hotels");
    }

    return response.json();
};

export const fetchHotelById = async(hotelId: string): Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if(!response.ok){
        throw new Error("Error fetching Hotels");
    }

    return response.json();
}