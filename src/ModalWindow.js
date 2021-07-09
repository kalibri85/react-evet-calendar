import moment from "moment";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalWindow = ({active, setActive, value, children}) => {
    
    const data = JSON.parse(localStorage.getItem(moment(value).format("YYYY MMM D")));

    return ( 
        <div className={active ? "addEvent active" : "addEvent"} onClick={() => setActive(false)}>
            <div className={active ? "modalContent active" : "modalContent"} onClick={e => e.stopPropagation()}>
                <div className="headerModal">
                    {moment(value).format("YYYY MMM D")}
                    <FontAwesomeIcon icon={faTimesCircle} className="closeB" onClick={() => setActive(false)} /> 
                </div>
                <h2>Events</h2>
                {children}
            </div>
        </div>  
    );
}
 
export default ModalWindow;