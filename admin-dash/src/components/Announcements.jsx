import { useEffect } from "react"
import Title from "./ComponentTitle"
import JsonCall from "./JsonCall"


const Announcements= () => {
    const [data, setData] = ([])
    
    useEffect(() =>{
        console.log("test");
    }),[];
    
    return (
        <div className="announcement-wrapper">
            <Title componentTitle="Announcments test"/>
            <div className="announcement-list">
                
            </div>
        </div>
    )
}

export default Announcements