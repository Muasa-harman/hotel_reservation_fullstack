import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  SearchParamsType,
  UserType,
} from "../../backend/src/shared/types";



// Generic API Fetch Function
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
  
    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }
  
    // Return parsed JSON response
    return response.json() as Promise<T>; // This allows the response to be cast to the expected type
  }
  

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3001";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// fetch('http://localhost:3001/api/auth/validate-token', { credentials: 'include' })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));

// Fetch current user
export const fetchCurrentUser = async (): Promise<UserType> => {
    return apiFetch<UserType>(`${API_BASE_URL}/api/users/me`, {
      credentials: "include",
    });
  };

// Register new user
export const register = async (formData: RegisterFormData) => {
  return apiFetch<void>(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

// Sign in
export const signIn = async (formData: SignInFormData) => {
  return apiFetch<UserType>(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

// Validate token function
export const validateToken = async (): Promise<UserType> => {
    try {
      // Fetch the response from the API using the generic apiFetch
      const userData: UserType = await apiFetch<UserType>(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
        method: "GET", // Explicitly specify the method (optional, defaults to GET)
      });
  
      return userData; 
    } catch (error) {
      console.error('Error during token validation:', error);
      throw error; 
    }
  };
  

// // Validate token
// export const validateToken = async (): Promise<UserType> => {
//   return apiFetch<UserType>(`${API_BASE_URL}/api/auth/validate-token`, {
//     credentials: "include",
//   })
  
// };

// Sign out
export const signOut = async () => {
  return apiFetch<void>(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

// Add a new hotel
export const addMyHotel = async (
  hotelFormData: FormData
): Promise<HotelType> => {
  return apiFetch<HotelType>(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
};

// Fetch all hotels
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  return apiFetch<HotelType[]>(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
};

// Fetch a hotel by ID
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  return apiFetch<HotelType>(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
};

// Update a hotel by ID
export const updateHotelById = async (
  hotelFormData: FormData
): Promise<HotelType> => {
  const hotelId = hotelFormData.get("hotelId") as string;
  return apiFetch<HotelType>(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "PUT",
    credentials: "include",
    body: hotelFormData,
  });
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  return apiFetch<HotelType>(`${API_BASE_URL}/api/hotels/${hotelId}`);
};

// Example of defining searchHotels in apiClient
export const searchHotels = async (params: SearchParamsType): Promise<HotelType[]> => {
    const response = await apiFetch<HotelType[]>(`${API_BASE_URL}/api/hotels/search`, {
      method: "GET",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response; // Assuming apiFetch handles the parsing
  };
  

// import { RegisterFormData } from "./pages/Register";
// import { SignInFormData } from "./pages/SignIn";
// import {HotelSearchResponse, HotelType, UserType} from "../../backend/src/shared/types"

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/';

// export const fetchCurrentUser = async():Promise<UserType> =>{
//     const response = await fetch(`${API_BASE_URL}/api/users/me`,{
//         credentials:"include"
//     });
//     if(!response.ok){
//         throw new Error("Error fetching user");
//     }
//     return response.json();
// }

// export const register = async (FormData:RegisterFormData) => {
//     const response = await fetch(`${API_BASE_URL}/api/users/register`,{
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(FormData)
//     });

//     const responseBody = await response.json();

//     if(!response.ok){
//         throw new Error(responseBody.message)
//     }
// };

// export const signIn = async(FormData:SignInFormData) =>{
//     const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
//         method: "POST",
//         credentials: "include",
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(FormData)
//     })
//     const body = await response.json();
//     if(!response.ok){
//         throw new Error(body.message)
//     }
//     return body;
// }

// export const validateToken = async () =>{
//     const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
//         credentials: "include"
//     });

//     if(!response.ok){
//         throw new Error("Token invalid")
//     }

//     return response.json();
// };

// export const signOut = async() =>{
//     const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
//         method:"POST",
//         credentials: "include"
//     });
//     if(!response.ok){
//         throw new Error("Error during sign out");
//     }
// }

// export const addMyHotel = async (hotelFormData: FormData) =>{
//     const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
//         method: "POST",
//         credentials: "include",
//         body: hotelFormData,
//     });
//     console.log("imageurl",response)
//     if(!response.ok){
//         throw new Error("failed to add hotel");
//     }

//     return response.json();
// };

// export const fetchMyHotels = async(): Promise<HotelType[]>=>{
//     const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
//         credentials: "include"
//     });
//     if (!response.ok) {
//         const errorBody = await response.text();
//         throw new Error(`Error fetching hotels: ${response.status} ${errorBody}`);
//       }

//     return response.json();
// };

// export const fetchMyHotelById = async (hotelId: string):Promise<HotelType> =>{
//     const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
//         credentials: "include"
//     });
//     if(!response.ok){
//         console.log("fetchHotel log:",response)
//     }
//     return response.json();
// };

// export const updateHotelById = async (hotelFormData: FormData) =>{
//     const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
//         method: "PUT",
//         body:hotelFormData,
//         credentials: "include",
//     },);
//     if(!response.ok){
//         throw new Error("Failed to update Hotel")
//     }

//     return response.json()
// };

// export type SearchParams = {
//     destination?: string;
//     checkIn?: string;
//     checkOut?: string;
//     adultCount?: string;
//     childCount?: string;
//     page?: string;
//     facilities?:string[];
//     stars?: string[];
//     types?: string[];
//     maxPrice?: string;
//     sortOptions?:string;
// };

// export const searchHotels = async(searchParams: SearchParams):Promise<HotelSearchResponse> => {
//     const queryParams = new URLSearchParams();
//     queryParams.append("destination", searchParams.destination || "");
//     queryParams.append("checkIn", searchParams.checkIn || "");
//     queryParams.append("checkOut", searchParams.checkOut || "");
//     queryParams.append("adultCount", searchParams.adultCount || "");
//     queryParams.append("childCount", searchParams.childCount || "");
//     queryParams.append("page", searchParams.page || "");

//     queryParams.append("maxPrice", searchParams.maxPrice || "");
//     queryParams.append("sortOption", searchParams.sortOptions || "");

//     searchParams.facilities?.forEach((facility)=> queryParams.append("facilities", facility));

//     searchParams.types?.forEach((type: string)=> queryParams.append("types",type))
//     searchParams.stars?.forEach((star)=> queryParams.append("stars", star))

//     const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

//     if(!response.ok){
//         throw new Error("Error fetching hotels");
//     }

//     return response.json();
// };

// export const fetchHotelById = async(hotelId: string): Promise<HotelType>=>{
//     const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
//     if(!response.ok){
//         throw new Error("Error fetching Hotels");
//     }

//     return response.json();
// }
