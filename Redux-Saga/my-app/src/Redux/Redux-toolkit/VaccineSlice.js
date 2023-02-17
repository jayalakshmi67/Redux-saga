import {createSlice,createAction} from '@reduxjs/toolkit'

const VaccineSlice = createSlice({
    name:'vaccine',
    initialState:{
        loading:false,
        data:[],
        error:''
    },
    reducers:{
        loadingFetch:(state,action)=>{
            state.loading = true
            state.data = []
            state.error = ''
          },
          successFetch:(state,action)=>{
            state.loading = false
            state.data = action.payload.reverse()
            state.error = ''
          },
          errorFetch:(state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.payload
          }
    }
})
export const getVaccineList = createAction('getVaccineList')
export const postVaccineList = createAction('postVaccineList')
export const deleteVaccineList = createAction('deleteVaccineList')
export const editVaccineList = createAction('editVaccineList')

export default VaccineSlice.reducer

export const {loadingFetch,successFetch,errorFetch} = VaccineSlice.actions