import {createSlice} from '@reduxjs/toolkit'

const editVaccineSlice = createSlice({
    name:'editData',
    initialState:{
        name:'',
        date:'',
        vaccine:''
    },
    reducers:{
        editData:(state,action)=>{
           const {name,date,vaccine,id} = action.payload
           state.name = name
           state.date = date
           state.vaccine = vaccine
           state.id = id
           },
        editCancel:(state,action)=>{
            state.name = ''
            state.date =  ''
            state.vaccine = ''
            state.id = undefined
             
        }   
    }
})

export default editVaccineSlice.reducer
export const {editData,editCancel} = editVaccineSlice.actions