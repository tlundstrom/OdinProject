import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import IGeneralInformation from "../interfaces/IGeneralInformation";

interface IProps {
  generalInfo: IGeneralInformation;
}

export default function PersonalInfo({ generalInfo }: IProps) {
  return (
    <div
      className="header"
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgb(14,55,78)",
        padding: "2.5rem 0",
        minHeight: "161.594px",
      }}
    >
      {generalInfo.name.length > 0 && (
        <>
          <h2 className="Name" style={{ paddingBottom: "1rem" }}>
            {generalInfo.name}
          </h2>
          <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <> </>
              {generalInfo.phone}
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} /> <> </>
              {generalInfo.email}
            </div>
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
              <> </> {generalInfo.location}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
