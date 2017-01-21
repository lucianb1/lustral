package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.model.colectie.GresieItem;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 11-Jan-17.
 */
public class GresieItemRowMapper implements RowMapper<GresieItem> {

    @Override
    public GresieItem mapRow(ResultSet rs, int i) throws SQLException {
        GresieItem item = new GresieItem();
        item.setIsPorcelain(rs.getBoolean("is_porcelain"));
        item.setIsRectificat(rs.getBoolean("is_rectificat"));
        item.setIsMatt(rs.getBoolean("is_matt"));
        item.setIsGlossy(rs.getBoolean("is_glossy"));
        item.setPrice(rs.getFloat("price"));
        item.setOldPrice((Float) rs.getObject("old_price"));
        item.setUnit(rs.getString("unit"));
        item.setSize(rs.getString("size"));
        item.setDescription(rs.getString("description"));
        item.setColectieName(rs.getString("collection_name"));
        item.setImages(rs.getInt("images"));
        return item;
    }
}
