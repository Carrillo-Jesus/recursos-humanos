import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditarEmpleado = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        nombre: '',
        sueldo: '',
        departamento: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const obtenerEmpleado = async () => {
            try {
                const respuesta = await fetch(`http://localhost:8080/rh-app/empleados/${id}`);
                const empleado = await respuesta.json();
                setEmployee(empleado);
            } catch (error) {
                console.error(error);
            }
        };
        if(!isNaN(id)) obtenerEmpleado();
    }, [id]);

    

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (employee.nombre?.trim() === '' || employee.sueldo.toString().trim() === '' || employee.departamento?.trim() === '' || isNaN(employee.sueldo)) {
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) return;
        setIsLoading(true);

        fetch(`http://localhost:8080/rh-app/empleados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
            .then(response => response.json())
            .then(data => {
                if(!isNaN(data?.id_empleado)) navigate('/');
            })
            .catch(error => {
                console.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <h2 className='p-1'>Editar Empleado</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control required type="text" name="nombre" value={employee.nombre} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3"  controlId="formSueldo">
                    <Form.Label>Sueldo:</Form.Label>
                    <Form.Control required type="text" name="sueldo" value={employee.sueldo} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3"  controlId="formDepartamento">
                    <Form.Label>Departamento:</Form.Label>
                    <Form.Control required type="text" name="departamento" value={employee.departamento} onChange={handleChange} />
                </Form.Group>

                <Button disabled={isLoading} variant="primary" type="submit">Editar Empleado</Button>
            </Form>
        </>
    );
};

export default EditarEmpleado;