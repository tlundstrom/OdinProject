import { useEffect, useState } from "react";
import JsonCall from "./JsonCall"

type dataParameters = {
    id: number,
    title: string,
    url: string
}

const Trending = () =>{
    const [data, setData] = useState([]);

    useEffect(()=>{
        JsonCall("trending", setData);
        console.log(data);
    },[])
    return (
        <div className="trending-wrapper">
            <div className="trending-list">
                <div>
                    {data.map((item: dataParameters,index: number) => {
                        return (
                            <div className="trend" key={index}>
                                <img width="45px" height="45px" src="http://localhost:5173/src/assets/user.png" />
                                <div>
                                    <p><strong>{item.url}</strong></p>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Trending