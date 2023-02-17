
import FormVaccine from './components/FormVaccine';
import Navbar from './components/Navbar';
import TableVaccine from './components/TableVaccine';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className = 'App'>
      <Navbar/>
      <Switch>
      
      <Route exact path='/'>
      <FormVaccine/>
      </Route>
      
     
      <Route path='/table'>
      <TableVaccine/>
      </Route>
      
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
