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
    <button onClick={handleClick} className="text-white px-3 font-bold bg-red-600 hover:bg-red-500">SignOut</button>
  );
};

export default SignOutButton