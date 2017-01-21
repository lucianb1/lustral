package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.core.ParchetProducer;
import ro.lustral.core.ParchetTrafficClass;
import ro.lustral.core.constants.ImageConstants;
import ro.lustral.core.constants.PaginationConstants;
import ro.lustral.model.parchet.Parchet;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 27-Dec-16.
 */
public class ParchetRowMapper implements RowMapper<Parchet> {

    @Override
    public Parchet mapRow(ResultSet rs, int i) throws SQLException {
        String name = rs.getString("name");
        return new Parchet()
                .setId(rs.getInt("id"))
                .setName(name)
                .setDescription(rs.getString("description"))
                .setWidth(rs.getInt("width"))
                .setOldPrice((Float) rs.getObject("old_price"))
                .setPrice(rs.getFloat("price"))
                .setProducer(ParchetProducer.valueFrom(rs.getString("producer")))
                .setTrafficClass(ParchetTrafficClass.valueFrom(rs.getInt("class")))
                .setOrderNr(rs.getInt("order_nr"))
                .setImageUrl(ImageConstants.PARCHET_IMAGE_LOCATION + name + PaginationConstants.PARCHET_MAIN_PAGE_NAME);
    }
}
