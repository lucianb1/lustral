package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.model.analystic.AnalysticData;
import ro.lustral.repository.rowmapper.AnalysticRowMapper;

/**
 * Created by Luci on 14-Jan-17.
 */
@Repository
public class AnalyticsRepository {

   private static final AnalysticRowMapper rowMapper = new AnalysticRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void increment(int id) {
        String sql = "UPDATE analytics_pages SET count = count+1, date = now() WHERE id = :id";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("id", id);
        jdbcTemplate.update(sql, params);
    }

    public void insertNew(String page) {
        String sql = "INSERT INTO analytics_pages (page, date, count) VALUES (:page, now(), 1)";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("page", page);
        jdbcTemplate.update(sql, params);
    }

    public AnalysticData getLastRequestForPage(String page) {
        String sql = "SELECT * FROM analytics_pages WHERE page = :page ORDER BY date DESC LIMIT 1";
        MapSqlParameterSource params= new MapSqlParameterSource().addValue("page", page);
        try {
            return jdbcTemplate.queryForObject(sql, params, rowMapper);
        } catch(EmptyResultDataAccessException e) {
            return null;
        }
    }


}
