import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const convertTextToPassword = (text = "") => {
    const password = text
        .split("")
        .map((c, index) => <FontAwesomeIcon className="me-1" fontSize={8} key={index} icon={faCircle} />);
    return password;
};
