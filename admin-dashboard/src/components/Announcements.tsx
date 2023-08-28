import ComponentTitle from "./ComponentTitle"
import { useEffect, useState } from "react";
import JsonCall from "./JsonCall"


const Announcements: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        JsonCall("announcements", setData)
    },[])
    return (
        <div className="announcement-wrapper">
            <ComponentTitle componentTitle="Announcments"/>
            <div className="announcement-list">
                <div>
                    {data.map((item,index) => {
                        return (
                            <div key={index}>
                                <h4>{item.title}</h4>
                                <p>{item.content.substring(0,75)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Announcements