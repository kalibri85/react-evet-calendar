const AddEvent = ({active, setActive}) => {
  

    //console.log(day.getDate());
    //const bd = new Date(day);

    return ( <div className={active ? "addEvent active" : "addEvent"} onClick={() => setActive(false)}>
        <div className="modalContent" onClick={e => e.stopPropagation()}>
            Hello,
        </div>
    
</div> );

}
 
export default AddEvent;
