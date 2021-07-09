import moment from "moment";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Row} from 'reactstrap';
import { faPencilAlt, faTrashAlt, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DB = (props) => {
    const allEvents = [];
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
     // open the database with the version 1
     let request = window.indexedDB.open("EventsCalendar", 1);
     // create the Contacts object store and indexes
     request.onupgradeneeded = (e) => {
        let db = e.target.result,
                 store = db.createObjectStore("EventsStore", {keyPath: 'id', autoIncrement: true}),
                 index = store.createIndex("eventDate", "eventDate", {unique: false});
     };
     request.onerror = e => console.log("Error: " + e.target.error());

     // handle the success event
    request.onsuccess = (e) => {
        const db = e.target.result;
       
        if (props.newEvent) {
            insertEvent(db, {
                event: props.newEvent, 
                eventDate: new Date(moment(props.choosedDate).format("YYYY MMM D")), 
                eventTimeStart: props.startT, 
                eventTimeEnd: props.endT,
            }
            );
        } else {
            // get events list by date
            getEventsListByDate(db, new Date(moment(props.choosedDate).format("YYYY MMM D")));
        }
    }

        const insertEvent = (db, eventDetails) => {
            // create a new transaction
            const txn = db.transaction('EventsStore', 'readwrite');
    
            // get the Events object store
            const store = txn.objectStore('EventsStore');
            //
            let query = store.put(eventDetails);
    
            // handle success case
            query.onsuccess = e => {
                console.log(e);
                alert("Successfully added a new Event!");
            };
    
            // handle the error case
            query.onerror = e => {
                console.log(e.target.errorCode);
            }
    
            // close the database once the 
            // transaction completes
            txn.oncomplete = () => {
                db.close();
            };
        }

        const getEventsListByDate = (db, eventDate) => {
            const txn = db.transaction('EventsStore', 'readonly');
            const store = txn.objectStore('EventsStore');
    
            // get the index from the Object Store
            const index = store.index('eventDate');
           
            // query by indexes
            let query = index.getAll(eventDate);
    
            // return the result object on success
            query.onsuccess = (e) => {
                console.table(query.result); // result objects
                const rootElement = document.getElementById("events-list");
                query.result.map(ev => { 
                    if(ev.eventTimeStart === '' && ev.eventTimeEnd === ''){
                        allEvents.push(<Row className="justify-content-center align-items-center padding-buttom rowH">
                             
                        <Col md={4} sm={10} className="timeCol">
                           <FontAwesomeIcon icon={faHourglassHalf}  /> All day
                        </Col>
                        <Col md={4} sm={10} className="eventCol">
                            {ev.event}
                        </Col>
                        <Col md={2} sm={10} className="align-self-end">
                            <Button outline color="info"><FontAwesomeIcon icon={faPencilAlt}/></Button>
                            <Button onClick={() => deleteEvent(db, ev.id)} outline color="info" id="delete{ev.id}"><FontAwesomeIcon icon={faTrashAlt}/></Button>
                        </Col>
                    </Row>);
                    } else if(ev.eventTimeStart != '' && ev.eventTimeEnd === ''){
                        allEvents.push(<li>{ev.eventTimeStart}-00:00 {ev.event}</li>);
                    } else if(ev.eventTimeStart === '' && ev.eventTimeEnd != ''){
                        allEvents.push(<li>00:00-{ev.eventTimeEnd} {ev.event}</li>);
                    } else allEvents.push(<li>{ev.eventTimeStart}-{ev.eventTimeEnd} {ev.event}</li>);
                }
                    
                  );
                ReactDOM.render(allEvents, rootElement);
                
                
              
            };
    
            query.onerror = (e) => {
                console.log(e.target.errorCode);
            }
    
            // close the database connection
            txn.oncomplete = () => {
                db.close();
            };
        }
        const deleteEvent = (db, id) =>  {
            // open the database with the version 1
            let request = window.indexedDB.open("EventsCalendar", 1);
            request.onerror = e => console.log("Error: " + e.target.error());

            // handle the success event
            request.onsuccess = (e) => {
                 const db = e.target.result;

                // create a new transaction
                const txn = db.transaction('EventsStore', 'readwrite');
        
                // get the Contacts object store
                const store = txn.objectStore('EventsStore');
                //

                let query = store.delete(id);
        
                // handle the success case
                query.onsuccess = e => {
                    console.log(e);
                };
        
                // handle the error case
                query.onerror = e => {
                    console.log(e.target.errorCode);
                }
        
                // close the database once the 
                // transaction completes
                txn.oncomplete = function () {
                    db.close();
                };
            }
        
        }

    
    
    return ( 
        <div>
            <div id="events-list"></div>
        </div>
        
    );
}
 
export default DB;