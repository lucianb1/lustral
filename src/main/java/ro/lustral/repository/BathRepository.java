package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.model.Bath;
import ro.lustral.repository.rowmapper.BathRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class BathRepository {

    private static final BathRowMapper rowMapper = new BathRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Bath> getAllOrdered() {
        String sql = "SELECT * FROM cazi ORDER BY order_nr";
        return jdbcTemplate.query(sql, rowMapper);
    }
}
