package gh.rh.respositorio;
import gh.rh.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EmpleadoRepositorio extends JpaRepository<Empleado, Integer> {
}
