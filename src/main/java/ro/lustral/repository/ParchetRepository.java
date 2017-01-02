package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;
import ro.lustral.repository.rowmapper.ParchetDetailsRowMapper;
import ro.lustral.repository.rowmapper.ParchetRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class ParchetRepository {

    private static final ParchetRowMapper rowMapper = new ParchetRowMapper();
    private static final ParchetDetailsRowMapper detailsRowMapper = new ParchetDetailsRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Parchet> getAll() {
        String sql = "SELECT * FROM parchet ORDER BY order_nr"; //TODO
        return jdbcTemplate.query(sql, rowMapper);
    }

    public ParchetDetails getParchetDetails(int id) {
        String sql = "SELECT * FROM parchet WHERE id = :id ORDER BY order_nr";
        try {
            return jdbcTemplate.queryForObject(sql, new MapSqlParameterSource().addValue("id", id), detailsRowMapper);
        } catch (EmptyResultDataAccessException e) {
            throw new RuntimeException();
        }
    }

}
