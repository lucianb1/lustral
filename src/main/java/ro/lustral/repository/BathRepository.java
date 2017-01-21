package ro.lustral.repository;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.controller.BathController;
import ro.lustral.model.Bath;
import ro.lustral.repository.rowmapper.BathRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class BathRepository {

    private static final Logger LOG = Logger.getLogger(BathController.class);

    private static final BathRowMapper rowMapper = new BathRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Cacheable("cazi")
    public List<Bath> getAllOrdered() {
        LOG.info("getAll() method called");
        String sql = "SELECT * FROM cazi ORDER BY order_nr";
        return jdbcTemplate.query(sql, rowMapper);
    }
}
