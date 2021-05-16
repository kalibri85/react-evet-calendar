import { useState, useEffect } from "react";
import AddEvent from "./AddEvent";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col  } from 'reactstrap';
  


import Build from "./Build";

const Calendar = ({value, onChange, active, setActive}) => {
    const [calendar, setCalendar] = useState([]);
    
    useEffect(() => {
        setCalendar(Build(value));
    }, [value]);

    const isSelected = day =>  value.isSame(day, "day");
    const beforeToday = day => day.isBefore(new Date(), "day");
    const isToday = day =>  day.isSame(new Date(), "day");
    
    const dayStyles = day =>  {
        if (beforeToday(day))return "before"
        if (isSelected(day))return "selected"
        if (isToday(day))return "today"

        return  ""
    }

    const currMonthName = () =>  value.format("MMM");
    const currYear = () => value.format("YYYY");
    const prevMonth = () => value.clone().subtract(1, "month");
    const nextMonth = () => value.clone().add(1, "month");
    const thisMonth = () => value.isSame(new Date(), "month");
    const arrowLeft = <FontAwesomeIcon icon={faAngleDoubleLeft} />;
    
    return (
        <Container className="calendar p-0 justify-content-md-center">
            <Row className="header p-0 m-0 rounded-top">
                <Col className="previous" onClick={() => !thisMonth() && onChange(prevMonth())}>
                    {!thisMonth() ? arrowLeft : null}
                </Col>
                <Col md={9} className="current">{currMonthName()} {currYear()}</Col>
                <Col className="next"
                onClick={() => onChange(nextMonth())}>
                    <FontAwesomeIcon icon={faAngleDoubleRight}/>
                </Col>
            </Row>
            <div className="body">
                <div className="day-names">
                    {
                        ["s", "m", "t", "w", "t", "f", "s"].map(d => <div className="week">{d}</div>)
                    }
                </div>
                {calendar.map((week)  => (
                    <div>
                        {week.map(day => (
                            <div className="day"
                            onClick={()=> !beforeToday(day) && onChange(day)}>
                                <div className={dayStyles(day)} onDoubleClick={()=>AddEvent(active, setActive(true))}>{day.format("D").toString()}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Container>
    );
   
}
 
export default Calendar;