import { useState,useEffect } from "react";
import { menu_api } from "../utils/constants";
import useOnlineStatus from "./useOnlineStauts";
const useRestaurantMenu =(resId)=>{
    const status=useOnlineStatus();
    if(status==false) return  <h1>Oops something went wrong you are offline !!!...</h1>

    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        const fetchResInfo = async () => {
        try {
            const response = await fetch(`${menu_api}${resId}`);
            if (!response.ok) {
            throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setResInfo(data); // Store the fetched data in state
        } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchResInfo();
  }, [resId]); // Adding resId as a dependency so the effect runs again when resId changes

return resInfo;

}
export default useRestaurantMenu;