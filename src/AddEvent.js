import moment from "moment";

const AddEvent = ({active, setActive, value, children}) => {

    return ( 
    <div className={active ? "addEvent active" : "addEvent"} onClick={() => setActive(false)}>
        <div className={active ? "modalContent active" : "modalContent"} onClick={e => e.stopPropagation()}>
            <div className="headerModal">
                {moment(value).format("YYYY MMM D")}
            </div>
            Hello,
            {children}
        </div>
    
    </div> );

}
 
export default AddEvent;
