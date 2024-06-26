import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEventos={
    _id: new Date().getTime(),
    title: "Cumpleaños del teamleader",
    notes: "Comprarle una taza de spiderman",
    start: new Date(),
    end: addHours(new Date(),2),
    bgColor: "#fafafa",
    user:{
        _id: "123",
      name: "Kevin"
  }
    
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState:{
    events:[
        tempEventos
    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, {payload}) => {
      state.activeEvent= payload;
    },
    onAddNewEvent:(state, {payload})=>{
      state.events.push(payload);
      state.activeEvent=null;
    },
    onUpdateEvent:(state, {payload})=>{
      state.events = state.events.map(event =>{
        if(event._id === payload._id){
          return payload;
        }
        
        return event
      })
    }
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;

