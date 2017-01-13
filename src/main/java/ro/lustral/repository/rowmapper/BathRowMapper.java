package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.model.Bath;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 27-Dec-16.
 */
public class BathRowMapper implements RowMapper<Bath> {
    
    @Override
    public Bath mapRow(ResultSet rs, int i) throws SQLException {
        return new Bath()
                .setId(rs.getInt("id"))
                .setName(rs.getString("name"))
                .setImages(rs.getInt("images"))
                .setMultipleSizes(rs.getBoolean("multiple_sizes"))
                .setPrice(rs.getFloat("price"))
                .setSize(rs.getString("size"))
                .setOldPrice((Float) rs.getObject("old_price"));
    }
}
