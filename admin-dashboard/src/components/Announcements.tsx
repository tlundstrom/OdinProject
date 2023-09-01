import { useEffect, useState } from "react";
import JsonCall from "./JsonCall";

interface IAnnouncementData {
	title: string;
	content: string;
}

const Announcements: React.FC = () => {
	const [data, setData] = useState<IAnnouncementData[]>([]);

	useEffect(() => {
		JsonCall("announcements", setData);
	}, []);
	return (
		<div className="announcement-wrapper">
			<div className="announcement-list">
				<div>
					{data.map((item: IAnnouncementData, index: number) => {
						return (
							<div key={index}>
								{index > 0 ? <hr /> : null}
								<h4>{item.title}</h4>
								<p>{item.content.substring(0, 100)}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Announcements;
