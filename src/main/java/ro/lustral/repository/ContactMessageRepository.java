package ro.lustral.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class ContactMessageRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void saveMessage(String email, String message) {
        String sql = "INSERT INTO messages (email, message) VALUES (:email, :message)";
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("email", email)
                .addValue("message", message);
        jdbcTemplate.update(sql, params);
    }

}
