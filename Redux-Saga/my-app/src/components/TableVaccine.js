import {connect} from 'react-redux'
import { deleteVaccineList, getVaccineList } from '../Redux/Redux-toolkit/VaccineSlice'
import { useEffect, useState } from 'react'
import { editData } from '../Redux/Redux-toolkit/editVaccineslice'
import { useHistory } from 'react-router-dom'

function TableVaccine(props){
    const {loading,data,error} = props.vaccine

    const history = useHistory()
    const [pagenationData,setPagenationData] = useState({})
    const [pageCount,setPageCount] = useState(1)
  
    let count = 1
    useEffect(()=>{
      if(data.length){
        let pagenationCount =data.reduce((acc,cur,index)=>{
          if(index%5 == 0 && index !=0){
            count++
            acc[count] = [cur]
          }else{
            acc[count] = acc[count] ? [...acc[count],cur] : [cur]
          }
          return acc
        },{})
        setPagenationData(pagenationCount)
      }
    },[data])
 
    console.log(pagenationData)
    useEffect(()=>{
      props.initialDataFetchDispatch()
    },[])

    function handleDelete(id){
     props.deleteSagaDispatch(id)
    }

    function handleEdit(data){
    props.editReduxDispatch(data)
    history.push('/')
    }

    function handlePagenation(page){
      if (page == 'Previous'){
        setPageCount(pageCount-1)
      }else if(page == 'Next'){
        setPageCount(pageCount+1)
      }else{
        setPageCount(page)
      }
      }

    return(
        <div className="container mt-5">
            <h2>Vaccine Table</h2>
            <table class="table table-borderless">
               <thead>
                <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">VaccineType</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              </tr>
               </thead>
              <tbody>
                {pagenationData[pageCount]  && pagenationData[pageCount].map(e=>(
              <tr>
              <th scope="row">{e.id}</th>
              <td>{e.name}</td>
              <td>{e.date}</td>
              <td>{e.vaccine}</td>
              <td><button className='btn btn-primary' onClick={()=>handleEdit(e)}>Edit</button></td>
              <td><button className='btn btn-danger' onClick={()=>handleDelete(e.id)}>Delete</button></td>
            </tr>
            ))}
            </tbody>
            </table>
            {pagenationData[pageCount] ?
  (<div className='mt-3'>         
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li className = {`page-item ${pageCount != 1 ? '' : 'disabled'}`} onclick={()=>handlePagenation('Previous')}>
      <a class="page-link">Previous</a>
    </li>
    {
      Object.keys(pagenationData).map(e=>(
    <li class="page-item" onClick={()=>handlePagenation(e)}><a class="page-link" href="#">{e}</a></li>
    ))
  }

    <li className = {`page-item ${pageCount != Object.keys(pagenationData).length ? '' : 'disabled'}`} onclick={()=>handlePagenation('Next')}>
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
         </div>) : ''}
         </div> 
    )
}
const mapStateToProps = (state)=>{
    return state
}

const mapDispatchToProps = (dispatch)=>{
  return{
    initialDataFetchDispatch:()=>dispatch(getVaccineList()),
    deleteSagaDispatch:(id)=>dispatch(deleteVaccineList(id)),
    editReduxDispatch:(data)=>dispatch(editData(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TableVaccine)