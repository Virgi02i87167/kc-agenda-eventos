import {createSlice} from "@reduxjs/toolkit"

export const uiSlice= createSlice({
    name: "ui",
    initialState:{
        isDateModalOpen: false
    },
    reducers:
    { 
        //Aqui crearemos los eventos
        onOpenDateModal: (state)=>{
          state.isDateModalOpen= true
        }, 
        onCloseDateModal:(state)=>{
            state.isDateModalOpen= false
        }
    }
})

export const {onOpenDateModal,onCloseDateModal}= uiSlice.actions
