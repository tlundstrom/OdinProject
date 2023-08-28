import ComponentTitle from "./ComponentTitle"
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
            <ComponentTitle componentTitle="Trending"/>
            <div className="trending-list">
                <div>
                    {data.map((item: dataParameters,index: number) => {
                        return (
                            <div key={index}>
                                <p><strong>{item.title}</strong></p>
                                <p>{item.url}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Trending