import { useEffect } from "react";

const JsonCall= (source: string, setData:Array) => {

    const getData = () =>{
        let requestOptions ={
            method: "GET",
            redirect: "follow"
        };

        fetch(`http://localhost:3030${source}`, requestOptions)
            .then((response) =>response.json())
            .then((result) => setData(result))
            .catch((error)=>console.log("error: ", error))
    }

    useEffect(()=>{
        getData();
    })    
}

export default JsonCall;