package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.model.colectie.ColectieItem;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 11-Jan-17.
 */
public class ColectieItemRowMapper implements RowMapper<ColectieItem> {

    @Override
    public ColectieItem mapRow(ResultSet rs, int i) throws SQLException {
        ColectieItem item = new ColectieItem();
        item.setPorcelain(rs.getBoolean("is_porcelain"));
        item.setMatt(rs.getBoolean("is_matt"));
        item.setGlossy(rs.getBoolean("is_glossy"));
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
