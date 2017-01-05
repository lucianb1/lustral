package ro.lustral.repository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.core.constants.ParchetConstants;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;
import ro.lustral.repository.rowmapper.ParchetDetailsRowMapper;
import ro.lustral.repository.rowmapper.ParchetRowMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class ParchetRepository {

    private static final ParchetRowMapper rowMapper = new ParchetRowMapper();
    private static final ParchetDetailsRowMapper detailsRowMapper = new ParchetDetailsRowMapper();
    private static final Map<Integer, String> orderClauses;
    static {
        orderClauses = new HashMap<>();
        orderClauses.put(1, "price ASC");
        orderClauses.put(2, "price DESC");
    }
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Parchet> getAll() {
        String sql = "SELECT * FROM parchet ORDER BY order_nr"; //TODO
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<Parchet> findParchet(List<String> producers, List<Integer> widths, List<Integer> classes, Integer sort, Integer page, String code) {
        StringBuilder builder = new StringBuilder("SELECT * FROM parchet WHERE 1=1 ");
        if (!producers.isEmpty()) {
            builder.append("AND UPPER(producer) IN (:producers) ");
        }
        if (!widths.isEmpty()) {
            builder.append(" AND width IN (:widths)");
        }
        if (!classes.isEmpty()) {
            builder.append(" AND class IN (:classes)");
        }
        if (!StringUtils.isEmpty(code)) {
            builder.append(" AND LOWER(name) LIKE :name");
        }

        if (sort != null && orderClauses.get(sort) != null) {
            builder.append(" ORDER BY " + orderClauses.get(sort));
        }
        builder.append(" LIMIT :from, :limit");

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("producers", producers)
                .addValue("widths", widths)
                .addValue("classes", classes)
                .addValue("from", (page-1) * ParchetConstants.PAGE_SIZE)
                .addValue("limit", ParchetConstants.PAGE_SIZE)
                .addValue("name", "%" + code + "%");
        return jdbcTemplate.query(builder.toString(), params, rowMapper);
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
