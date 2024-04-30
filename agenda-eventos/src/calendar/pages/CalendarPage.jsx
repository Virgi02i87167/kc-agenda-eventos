import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CalendarModal, Navbar, calendarEvent } from '../'
import {localizer, getMessagesES} from "../../helpers"
import { useState } from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { FabAddNew } from '../components/FabAddNew'

//!Eliminar
// const events= [{
//     title: "Cumpleaños del teamleader",
//     notes: "Comprarle una taza de spiderman",
//     start: new Date(),
//     end: addHours(new Date(),2),
//     bgColor: "#fafafa",
//     user:{
//         _id: "123",
//         name: "Kevin"
//     }
    
// }]


  export const CalendarPage = () =>{

    const {openDateModal}= useUiStore();

   const {events,setActiveEvent}= useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem("lastView")|| "agenda")
    const eventStyleGetter= (event, start, end, isSelected) =>{
      const style={
        backgroundColor: "#134932",
        borderRadius: "0px",
        opacity: 0.8,
        color: "white"
      }
      return{style}
    }

    const onDoubleClick= (event)=>{
      // console.log({doubleClick: event})
    openDateModal();
    
    }

    const onSelect= (event)=>{
      setActiveEvent(event);
    }

    const onViewChange =(event)=>{
      localStorage.setItem("lastView", event)
      setLastView(event)
    }
    return(
    <>
    <Navbar/>
 
    <Calendar
    culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{event:calendarEvent}}
 
      //colocaremos los eventos aqui

      onSelectEvent= {onSelect}
      onDoubleClickEvent={onDoubleClick}
    onView={onViewChange}
    defaultView={lastView}
    />
    <CalendarModal/>
    <FabAddNew/>
    </>
  )
}