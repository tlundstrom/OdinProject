import { useEffect, useState } from "react"
import JsonCall from "./JsonCall";
import ComponentTitle from "./ComponentTitle";

type dataParameters = {
    id: number,
    title: string,
    content: string
}

const Projects = () => {
    const [data, setdata] = useState([]);

    useEffect(() =>{
        JsonCall('projects', setdata);
        console.log(data);
    },[])
    return(
        <div className="projects-wrapper">
            <ComponentTitle componentTitle="Your Projects"/>
            <div className="projects-list">
                <div>
                    {data.map((item:dataParameters,index: number) => {
                        return (
                            <div key={index}>
                                <h5><strong>{item.title}</strong></h5>
                                <p>{item.content.substring(0,150)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Projects