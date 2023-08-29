import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

const SideBar = () => {

    return(
        <div className="side-bar">
            <div className="sidebar-header">
                <DashboardIcon fontSize='large' />
                <h2 style={{"color": "white"}}>Dashboard</h2>
            </div>
            <div className='navigation'>
                <div><HomeIcon />Home</div>
                <div><AccountBoxIcon />Profile</div>
                <div><ModeCommentIcon />Messages</div>
                <div><WatchLaterIcon />History</div>
                <div><InsertDriveFileIcon />Tasks</div>
                <div><GroupsIcon />Community</div>
            </div>
            <div className='navigation'>
                <div>
                    <SettingsIcon />Settings
                </div>
                <div>
                    <HelpCenterIcon />Support
                </div>
                <div>
                    <PrivacyTipIcon />Privacy
                </div>
            </div>
        </div>
    )
}

export default SideBar
