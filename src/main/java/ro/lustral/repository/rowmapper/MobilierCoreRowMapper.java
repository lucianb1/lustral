package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.model.mobilier.MobilierCollection;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 08-Jan-17.
 */
public class MobilierCoreRowMapper implements RowMapper<MobilierCollection>{

    @Override
    public MobilierCollection mapRow(ResultSet rs, int i) throws SQLException {
        MobilierCollection result = new MobilierCollection();
        result.setId(rs.getInt("id"));
        result.setName(rs.getString("name"));
        result.setImages(rs.getInt("images"));
        return result;
    }
}
