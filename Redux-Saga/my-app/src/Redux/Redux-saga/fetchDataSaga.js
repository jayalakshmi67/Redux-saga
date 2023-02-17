import {takeEvery,call,put} from '@redux-saga/core/effects'
import { deleteVaccineList, editVaccineList, getVaccineList,postVaccineList } from '../Redux-toolkit/VaccineSlice'
import { loadingFetch,successFetch,errorFetch } from '../Redux-toolkit/VaccineSlice'
import axios from 'axios'

export function* fetchDataSaga(){
    yield takeEvery(getVaccineList,fetchData)
    yield takeEvery(postVaccineList,fetchPostData)
    yield takeEvery(deleteVaccineList,fetchDeleteData)
    yield takeEvery(editVaccineList,fetchEditData)
}

function* fetchData(){
    yield put(loadingFetch())
    try{
        const url = 'http://localhost:4000/vaccine'
        const response = yield call(axios.get,url)
        yield put(successFetch(response.data))
    }catch(err){
        yield put(errorFetch(err.message))
    }
}

function* fetchPostData(action){
    const url = 'http://localhost:4000/vaccine'
    yield call(axios.post,url,action.payload)
}

function* fetchDeleteData(action){
    const id = action.payload
    const url = `http://localhost:4000/vaccine/${id}`
    yield call(axios.delete,url)
    try{
        const url = 'http://localhost:4000/vaccine'
        const response = yield call(axios.get,url)
        yield put(successFetch(response.data))
    }catch(err){
        yield put(errorFetch(err.message))
    }
}

function* fetchEditData(action){
    const data = action.payload
    const url = `http://localhost:4000/vaccine/${data.id}`
    yield call(axios.put,url,data)
}