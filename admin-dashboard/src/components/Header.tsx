import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import JsonCall from './JsonCall';

type dataParameters = {
    name:string,
    url:string
}

const Header = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        JsonCall('logged-in', setData);
    },[])
    

    return(
        <div className="header">
            <div className="header-main">
                <div className="searchBar-container">
                    <SearchIcon fontSize='large' sx={{color:"black"}}/>
                    <input className="searchBar" placeholder="Search" type="text" />
                </div>
                <div className="welcome">
                    {data.map((element:dataParameters, index:number) => {
                        return(
                            <>
                                <img style={{"padding": "15px"}} height="60px" width="60px" src="http://localhost:5173/src/assets/user.png" alt="" />
                                <div className="text">
                                    <p style={{"margin": "0"}}>Hi There,</p>
                                    <h2 style={{"margin": "0"}} key={index}>{element.name} ({element.url})</h2>
                                </div>
                            </>
                            
                        )
                    })}
                </div>
            </div>
            <div className="header-aside">
                    <div className="headerProfile">
                        <NotificationsActiveIcon />
                        <img style={{"padding": "15px"}} width="45px" src="http://localhost:5173/src/assets/user.png" alt="" />
                        {data.map((element: dataParameters, index: number) => {
                            return(
                                <h4 key={index}>{element.name}</h4>
                            )
                        })}
                    </div>
                <div className="buttonField">
                        <button>New</button>
                        <button>Upload</button>
                        <button>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Header