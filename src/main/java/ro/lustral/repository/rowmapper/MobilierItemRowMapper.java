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
    public MobilierItem mapRow(ResultSet resultSet, int i) throws SQLException {
        return null;
    }
}
