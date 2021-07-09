import './App.css';
import { useState, useEffect} from "react";
import moment from "moment";
import Calendar from './Calendar';
import DB from './DB';
import ModalWindow from './ModalWindow';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Label, Input, Col, Row, Button } from 'reactstrap';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
    const [value, setValue] = useState(moment());
    const [modalActive, setModalActive] = useState(false);

    const [newEvent, setNewEvent] = useState('');
    const [startT, setStartT] = useState('');
    const [endT, setEndT] = useState('');

    const [state, setState] = useState(false);


    const handleSubmit = (e) => { 
      //e.preventDefault();
      setState(true);
      console.log('zdes', state);
     
      
    } 

  return (
    <div className="App">
      <header>
        <h1>React Event Calendar</h1>
      </header>
      <main>
        <Calendar value={value} onChange={setValue} active={modalActive} setActive={setModalActive} />
      </main>
      <ModalWindow active={modalActive} setActive={setModalActive} value={value}>
        <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center align-items-center">
                  <Col md={8}>
                      <Input type="text" placeholder="Event" name="newEvent" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} required/>
                  </Col>
              </Row>
              <Row className="justify-content-center align-items-center">
                  <Col md={3}>
                      <Label htmlFor="startT">Start</Label>
                      <Input type="time" id="startT" name="startT" onChange={(e) => setStartT(e.target.value)}/>
                  </Col>    
                  <Col md={3}>
                      <Label htmlFor="endT">End</Label>
                      <Input type="time" id="endT" name="endT" onChange={(e) => setEndT(e.target.value)}/>
                  </Col>  
                  <Col md={2} className="align-self-end">
                      <Button outline color="info"><FontAwesomeIcon icon={faPlus}/> Event</Button>
                  </Col>
              </Row>
          </Form>
          {state===true ? <DB choosedDate={value} newEvent={newEvent} endT={endT} startT={startT} /> : <DB choosedDate={value} />}
   
      </ModalWindow>      
    </div>
  );
}

export default App;
