package gh.rh.controlador;

import gh.rh.excepcion.RecursoNoEncontradoExcepcion;
import gh.rh.modelo.Empleado;
import gh.rh.servicio.EmpleadoServicio;
import gh.rh.servicio.IEmpleadoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("rh-app")
@CrossOrigin(value = "http://localhost:3000")
public class EmpleadoControlador {
    private static final Logger logger = LoggerFactory.getLogger(EmpleadoControlador.class);

    @Autowired
    private IEmpleadoServicio empleadoServicio;

    @GetMapping("/empleados")
    public List<Empleado> obtenerEmpleados() {
        var empleados = empleadoServicio.listarEmpleados();
        empleados.forEach(empleado -> logger.info( empleado.toString() ) );
        return empleados;
    }

    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado) {
        return empleadoServicio.guardarEmpleado(empleado);
    }

    @GetMapping("/empleados/{id}")

    public ResponseEntity<Empleado> empleadoPorId(@PathVariable Integer id) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null) throw new RecursoNoEncontradoExcepcion("No se encontró el id: " + id);
        return ResponseEntity.ok(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Integer id, @RequestBody Empleado nuevoEmpleado) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null) throw new RecursoNoEncontradoExcepcion("No se encontró el id: " + id);
        empleado.setNombre(nuevoEmpleado.getNombre());
        empleado.setSueldo(nuevoEmpleado.getSueldo());
        empleado.setDepartamento(nuevoEmpleado.getDepartamento());
        empleadoServicio.guardarEmpleado(empleado);
        return ResponseEntity.ok(empleado);
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Map<String, Boolean>> EliminarEmpleado(@PathVariable Integer id) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado == null) throw new RecursoNoEncontradoExcepcion("No se encontró el id: " + id);
        empleadoServicio.eliminarEmpleado(empleado);
        Map<String, Boolean> response = new HashMap<>();
        response.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
