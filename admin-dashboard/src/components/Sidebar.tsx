import {
	Dashboard as DashboardIcon,
	Home as HomeIcon,
	AccountBox as AccountBoxIcon,
	ModeComment as ModeCommentIcon,
	WatchLater as WatchLaterIcon,
	InsertDriveFile as InsertDriveFileIcon,
	Groups as GroupsIcon,
	Settings as SettingsIcon,
	HelpCenter as HelpCenterIcon,
	PrivacyTip as PrivacyTipIcon,
} from "@mui/icons-material";

const SideBar = () => {
	return (
		<div className="side-bar">
			<div className="sidebar-header">
				<DashboardIcon fontSize="large" />
				<h2 style={{ color: "white" }}>Dashboard</h2>
			</div>
			<div className="navigation">
				<div>
					<HomeIcon />
					Home
				</div>
				<div>
					<AccountBoxIcon />
					Profile
				</div>
				<div>
					<ModeCommentIcon />
					Messages
				</div>
				<div>
					<WatchLaterIcon />
					History
				</div>
				<div>
					<InsertDriveFileIcon />
					Tasks
				</div>
				<div>
					<GroupsIcon />
					Community
				</div>
			</div>
			<div className="navigation">
				<div>
					<SettingsIcon />
					Settings
				</div>
				<div>
					<HelpCenterIcon />
					Support
				</div>
				<div>
					<PrivacyTipIcon />
					Privacy
				</div>
			</div>
		</div>
	);
};

export default SideBar;
