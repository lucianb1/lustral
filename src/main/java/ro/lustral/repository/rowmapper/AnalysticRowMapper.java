package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.model.analystic.AnalysticData;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 14-Jan-17.
 */
public class AnalysticRowMapper implements RowMapper<AnalysticData>{


    @Override
    public AnalysticData mapRow(ResultSet rs, int i) throws SQLException {
        AnalysticData result = new AnalysticData();
        result.setId(rs.getInt("id"));
        result.setPage(rs.getString("page"));
        result.setCount(rs.getInt("count"));
        result.setDate(rs.getDate("date"));
        return result;
    }
}
