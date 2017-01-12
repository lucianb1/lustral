package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieItem;
import ro.lustral.repository.rowmapper.ColectieItemRowMapper;
import ro.lustral.repository.rowmapper.ColectieRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class ColectieRepository {

    private static final ColectieRowMapper rowMapper = new ColectieRowMapper();
    private static final ColectieItemRowMapper itemRowMapper = new ColectieItemRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Colectie> getAll() {
        String sql = "SELECT * FROM colectii ORDER BY order_nr";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<ColectieItem> getItems(int id) {
        String sql = "SELECT i.*, c.images, c.name as collection_name FROM colectii_items i INNER JOIN colectii c ON collection_id = :id AND c.id = i.collection_id ORDER BY i.order_nr ASC";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("id", id);
        return jdbcTemplate.query(sql, params, itemRowMapper);
    }

}
