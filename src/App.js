import './App.css';
import { useState} from "react";
import moment from "moment";
import Calendar from './Calendar';
import AddEvent from './AddEvent';

function App() {
 

  const [value, setValue] = useState(moment());
  const [modalActive, setModalActive] = useState(true);

  return (
    <div className="App">
      <header>
        <h1>React Event Calendar</h1>
      </header>
      
     
      <main>
          <Calendar value={value} onChange={setValue} active={modalActive} setActive={setModalActive} />
         
      </main>
      <AddEvent active={modalActive} setActive={setModalActive} value={value}>
        <p>Oj mama chto</p>
      </AddEvent>
      
    </div>
  );
}

export default App;
