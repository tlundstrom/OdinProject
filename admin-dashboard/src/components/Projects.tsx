import { useEffect, useState } from "react";
import JsonCall from "./JsonCall";
import {
	AltRouteOutlined as AltRouteOutlinedIcon,
	VisibilityOutlined as VisibilityOutlinedIcon,
	StarBorderPurple500Outlined as StarBorderPurple500OutlinedIcon,
} from "@mui/icons-material";

type dataParameters = {
	id: number;
	title: string;
	content: string;
};

const Projects = () => {
	const [data, setdata] = useState([]);

	useEffect(() => {
		JsonCall("projects", setdata);
		console.log(data);
	}, []);
	return (
		<div className="projects-wrapper">
			<div className="projects-list">
				<div>
					{data.map((item: dataParameters, index: number) => {
						return (
							<div className="project" key={index}>
								<div>
									<h3>{item.title}</h3>
									<p>{item.content.substring(0, 150)}</p>
								</div>
								<div>
									<StarBorderPurple500OutlinedIcon />
									<VisibilityOutlinedIcon />
									<AltRouteOutlinedIcon />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Projects;
