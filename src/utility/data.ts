import axios from "axios";
import type { dataObjType } from "./types";

export const getData = async (pageNo:number):Promise<dataObjType[]> =>{
    const url = "https://api.artic.edu/api/v1/artworks?page="
    try {
        const response =await axios.get(url+pageNo);
        const dataArray = response.data.data;
    const data:dataObjType[] =dataArray.map((dataItem:dataObjType,index:number)=>{
        return{
            index:(pageNo-1)*12+index,
            title:dataItem.title,
            place_of_origin:dataItem.place_of_origin,
            artist_display:dataItem.artist_display,
            inscriptions:dataItem.inscriptions||"data not available",
            date_start:dataItem.date_start,
            date_end:dataItem.date_end
        }
    })
    console.log(data);
    return data;
    } catch (error) {
        console.error("error while fetching data"+error);
        return [];
    }
     
  
}