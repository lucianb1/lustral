package ro.lustral.repository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.core.constants.PaginationConstants;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;
import ro.lustral.repository.rowmapper.ParchetDetailsRowMapper;
import ro.lustral.repository.rowmapper.ParchetRowMapper;

import java.util.*;

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
        String sql = "SELECT * FROM parchet ORDER BY order_nr";
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
        String orderClause = orderClauses.get(sort) != null ? orderClauses.get(sort) : "order_nr ASC";
        builder.append(" ORDER BY " + orderClause);
        builder.append(" LIMIT :from, :limit");

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("producers", producers)
                .addValue("widths", widths)
                .addValue("classes", classes)
                .addValue("from", (page - 1) * PaginationConstants.GRESIE_PAGE_SIZE)
                .addValue("limit", PaginationConstants.GRESIE_PAGE_SIZE)
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

    public void saveParchet(String name, String description, float price, Float oldPrice, String delivery, String wood, Integer warranty, int width, int trafficClass, int images, String grip, String size, String producer, String material, int orderNr) {
        String sql = "INSERT INTO parchet(name, description, price, old_price, delivery, wood, warranty, width, class, images, grip, size, producer, material, order_nr) " +
                "VALUES (:name, :description, :price, :oldPrice, :delivery, :wood, :warranty, :width, :trafficClass, :images, :grip, :size, :producer, :material, :orderNr)";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("name", name)
                .addValue("description", description)
                .addValue("price", price)
                .addValue("oldPrice", oldPrice)
                .addValue("delivery", delivery)
                .addValue("wood", wood)
                .addValue("width", width)
                .addValue("trafficClass", trafficClass)
                .addValue("images", images)
                .addValue("grip", grip)
                .addValue("size", size)
                .addValue("producer", producer)
                .addValue("material", material)
                .addValue("orderNr", orderNr)
                .addValue("warranty", warranty);
        jdbcTemplate.update(sql, params);
    }

}
