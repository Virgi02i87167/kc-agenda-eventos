import {useDispatch, useSelector} from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore=()=>{

    const dispatch= useDispatch();

   const {events,activeEvent }=useSelector(state=> state.calendar);
   
   const setActiveEvent= (calendarEvent)=>{
    dispatch(onSetActiveEvent(calendarEvent) );
   }

   const startSavingEvent= async(calendarEvent)=>{
    //? Idealmente procesos deberian de llegar aca desde el backend
    if(calendarEvent._id){
        // Estamos haciendo una modificacion a la nota
    }
    else{
        //crear una nueva nota
        dispatch(onAddNewEvent({...calendarEvent, _id:new Date().getTime()}) );
    }
   }
   
   return{
        //*Propiedades
        events,
        activeEvent,

        //*metodos
        setActiveEvent,
        startSavingEvent
    }
}