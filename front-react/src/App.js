import ListadoEmpleados from "./componentes/empleados/listadoEmpleados";
import NavLinks from "./componentes/header/navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AgregarEmpleado from "./componentes/empleados/agregarEmpleado";
import EditarEmpleado from "./componentes/empleados/editarEmpleado";

function App() {
  return (
    <div className="container text-center">
      <h3>Sistema de recursos humanos</h3>
      <Router>
      <NavLinks />
        <Routes>
          <Route exact path="/" element={  <ListadoEmpleados />} />
        
          <Route exact path="/agregar" element={ <AgregarEmpleado />} />
          <Route exact path="/editar/:id" element={ <EditarEmpleado />} />
        </Routes>
      </Router>
     
    </div>
    
 

  );
}

export default App;
