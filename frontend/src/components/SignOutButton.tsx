import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

 const SignOutButton = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async()=>{
            showToast({message: "Signed out!", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken")
        },
        onError:(error: Error)=>{
            showToast({message: error.message, type: "ERROR"});
            
        },
    });

    const handleClick = () =>{
        mutation.mutate();
        console.log("signout")
    }
  return (
    <button onClick={handleClick} className="text-gray-600 px-3 font-bold bg-white hover:bg-gray-100">SignOut</button>
  );
};

export default SignOutButton