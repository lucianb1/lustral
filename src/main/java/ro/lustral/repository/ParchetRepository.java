package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.repository.rowmapper.ParchetRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class ParchetRepository {

    private static final ParchetRowMapper rowMapper = new ParchetRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Parchet> getAll() {
        String sql = "SELECT * FROM parchet ORDER by order_nr";
        return jdbcTemplate.query(sql, rowMapper);

    }

}
