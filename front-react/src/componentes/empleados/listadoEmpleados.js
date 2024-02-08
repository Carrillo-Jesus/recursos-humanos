import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState([]);
 
  useEffect(() => {
   
    obtenerEmpleados();
    
  }, []);
   
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:8080/rh-app/empleados');
      const empleados = await respuesta.json();
      setEmpleados(empleados);
    } catch (error) {   
      console.log(error);
    }
  }

  const eliminarEmpleado = async (empleado) => {
    try { 
      const respuesta = await fetch(`http://localhost:8080/rh-app/empleados/${empleado.id_empleado}`, {
        method: 'DELETE'
      });
      if (respuesta.ok) { 
        obtenerEmpleados();
      } 
    
    } catch (error) {  
      console.log(error);
    }
  }

  const formatPrice = (price) => { return price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }); };




  return (
    <>
      <h2 className='p-1'>Empleados</h2>
      <Table striped responsive="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((employee) => (
          <tr key={employee.id_empleado}>
            <td>{employee.id_empleado}</td>
            <td>{employee.nombre}</td>
            <td>{employee.departamento}</td>
            <td>{formatPrice(employee.sueldo)}</td>
            <td className='d-flex justify-content-start aling-items-center'>
            <Link to={`/editar/${employee.id_empleado}`}>
              <Button style={{marginRight: '15px'}} variant="primary" size="sm">Editar</Button>
            </Link>
              <Button onClick={ () => eliminarEmpleado(employee) } variant="danger" size="sm">Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
    
  )
}
export default ListadoEmpleados;
