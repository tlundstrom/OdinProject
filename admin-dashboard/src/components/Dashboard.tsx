import Announcements from "./Announcements"
import Projects from "./Projects"
import Trending from "./Trending"

const DashBoard = () => {

    return(
        <div className="dashboard">
            <div className="projects">
                <h3>Your Projects</h3>
                <Projects />
            </div>
            <div className="aside-wrapper">
                <div className="announcements">
                    <h3>Announcements</h3>
                    <Announcements />
                </div>
                <div className="trending">
                    <h3>Trending</h3>
                    <Trending />
                </div>
            </div>
            
        </div>
    )
}

export default DashBoard