import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal"
import Datepicker, {registerLocale} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../hooks";


registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const CalendarModal = () => {
//estado del modal
    // const [isOpen, setIsOpen]= useState(true);

    const {isDateModalOpen, closeDateModal}=useUiStore();

    // Extrar las dependencias que nos interesan de UseCalendarStore

    //TODO: extraemos la funcion de hacer grabacion

   const {activeEvent, startSavingEvent}= useCalendarStore(); 
    
//nuevo estado para cuando se ingrese el evento
const [formSubmitted, setformSubmitted]= useState(false)

    const [formValues, setFormValues]=useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(),2)
    })

    

    //utilizamos el useMemo 
    const titleClass = useMemo(()=> {
        if(!formSubmitted) return "";

        return (formValues.title.length>0)? "is-valid" : "is-invalid"
    },[formValues.title, formSubmitted])

    //crear useEffect
    useEffect(()=>{
    if(activeEvent!==null){
        setFormValues({...activeEvent})
    }
    },[activeEvent])

    const onInputChanged= ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const onCloseModal = () => {
     closeDateModal();
   console.log("Cerrando modal");
    }
    const onSubmit=async (event)=>{
        event.preventDefault();
        setformSubmitted(true);
         const difference =differenceInSeconds(formValues.end, formValues.start)
    console.log({difference})

    if(isNaN(difference) ||difference<0){
       Swal.fire("Fechas Incorrectas", "Por favor revisa las fechas ingresadas", "error")
        
    }
    if( formValues.title.length<=0){
        Swal.fire({
            title: "Tituloooooo",
            text: "Hace falta title insane",
            imageUrl: "https://c0.klipartz.com/pngpicture/45/496/gratis-png-dibujo-gunther-magnuson-animacion-dibujos-animados-disney-xd-pateado.png",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }
    console.log(formValues)
    await startSavingEvent(formValues);
    closeDateModal();

    }
    const onDateChanged= (event,changing)=>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }
    return(
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h2>Nuevo Evento</h2>
            <hr/>
            <form className="container" onSubmit={onSubmit}>


            <div className="form-group mb-2">
            <label >Fecha y Hora de Inicio</label>    
            <Datepicker
           
            selected={formValues.start}
            className="form-control"
            onChange={(event)=>onDateChanged(event,"start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="hora"
            />
            </div>   

            <div className="form-group mb-2">
            <label >Fecha de Finalización</label>    
               <Datepicker
            // minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event)=>onDateChanged(event,"end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            />
            </div>    
            <hr/>
            <div className="form-group mb-2">
            <label >Titulo y notas</label>
            <input type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Titulo del evento"
                    autoComplete="off"
                    name="title"
                    value={formValues.title}
                    onChange={onInputChanged}
            />
            <small className="form-text text-muted">Una descripción corta</small>
            </div>
            <div className="form-group mb-2">
                <textarea 
                    type="text"
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChanged}
                ></textarea>
                <small className="form-text text-muted">Información adicional</small>
            </div>

            <button  
            type="submit"
            className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                &nbsp;
                <span>  Guardar</span>
            </button>

            </form>
           

        </Modal>
    )
}  