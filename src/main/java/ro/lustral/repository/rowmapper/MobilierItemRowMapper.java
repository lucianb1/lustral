package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.model.mobilier.MobilierItem;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 27-Dec-16.
 */
public class MobilierItemRowMapper implements RowMapper<MobilierItem> {

    @Override
    public MobilierItem mapRow(ResultSet rs, int i) throws SQLException {
        MobilierItem item = new MobilierItem();
        item.setName(rs.getString("name"));
        item.setCode(rs.getString("code"));
        item.setPrice(rs.getFloat("price") * 1.6f); //TODO be aware
        item.setSize(rs.getString("size"));
        item.setDescription(rs.getString("description"));
        return item;
    }
}
