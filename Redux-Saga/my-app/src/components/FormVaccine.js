import { useState,useEffect } from "react"
import { editVaccineList, postVaccineList } from "../Redux/Redux-toolkit/VaccineSlice" 
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom"
import { editCancel } from "../Redux/Redux-toolkit/editVaccineslice"

function FormVaccine(props){
    
     const history = useHistory()

    const [input,setInput] = useState({
        name:'',
        date:'',
        vaccine:''
    })
        const{name,date,vaccine} = input

    
    useEffect(()=>{
        const {editData} = props
        if(editData.id){
            setInput(editData)
        }
    },[])
        function handleChange(e){
          setInput({
            ...input,
            [e.target.id] : e.target.value
          })
    } 

    function handleSubmit(){
         if(input.id){
        props.editSagaDispatch(input)
        props.editCancelReduxdispatch()
        setInput({
            name:'',
            date:'',
            vaccine:''
        })
        history.push('/table')
         }else{
               const {postSagaDispatch} = props
               postSagaDispatch(input)
                  setInput({
                   name:'',
                   date:'',
                   vaccine:''
        })
        history.push('/table')
    }
}
    return(
        <div className = "container mt-5" style = {{maxWidth:'700px'}}>
            <div className = "text-center">
                <h2>Vaccination Form</h2>
            </div>
            <label htmlFor ="">Name</label>
            <input type = "text" id="name" value={name} onChange={handleChange} className = "form-control"/>
            <label htmlFor ="">Date</label>
            <input type = "date" id="date" value={date} onChange={handleChange} className = "form-control"/>
            <label htmlFor ="">VaccineType</label>
            <select className = "form-control" id="vaccine" value={vaccine} onChange={handleChange}>
             <option value="" selected hidden>Please Select Vaccine Type</option>
             <option value = "CO-VACCINE">CO-VACCINE</option>
             <option value = "COVID-SHIELD">COVID_SHIELD</option>
            </select>
            <div className = "text-center mt-5">
                <button className = 'btn btn-success' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = (dispatch)=>{
    return{
        postSagaDispatch:(data)=>dispatch(postVaccineList(data)),
        editSagaDispatch:(data)=>dispatch(editVaccineList(data)),
        editCancelReduxdispatch:()=>dispatch(editCancel())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FormVaccine)