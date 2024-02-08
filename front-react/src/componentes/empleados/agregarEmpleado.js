import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AgregarEmpleado = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        nombre: '',
        sueldo: '',
        departamento: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (employee.nombre.trim() === '' || employee.sueldo.toString().trim() === '' || employee.departamento.trim() === '' || isNaN(employee.sueldo)) {
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) return;
        setIsLoading(true);

        fetch('http://localhost:8080/rh-app/empleados', {
            method: 'POST',
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
            <h2 className='p-1'>Agregar Empleado</h2>
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

                <Button disabled={isLoading} variant="success" type="submit">Agregar Empleado</Button>
            </Form>
        </>
    );
};

export default AgregarEmpleado;