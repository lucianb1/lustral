package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.repository.rowmapper.ColectieRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class ColectieRepository {

    private static final ColectieRowMapper rowMapper = new ColectieRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Colectie> getAll() {
        String sql = "SELECT * from colectii ORDER BY order_nr";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<Colectie> findColectii() {
        return null;
    }

}
