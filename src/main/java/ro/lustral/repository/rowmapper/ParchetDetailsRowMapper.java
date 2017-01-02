package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.core.ParchetProducer;
import ro.lustral.core.ParchetTrafficClass;
import ro.lustral.model.parchet.ParchetDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 02-Jan-17.
 */
public class ParchetDetailsRowMapper implements RowMapper<ParchetDetails> {

    @Override
    public ParchetDetails mapRow(ResultSet rs, int i) throws SQLException {
        ParchetDetails details = new ParchetDetails();
        details.setDescription(rs.getString("description"));
        details.setPrice(rs.getFloat("price"));
        details.setName(rs.getString("name"));
        details.setTrafficClass(ParchetTrafficClass.valueFrom(rs.getInt("class")));
        details.setOldPrice((Float) rs.getObject("old_price"));
        details.setId(rs.getInt("id"));
        details.setGrip(rs.getString("grip"));
        details.setWidth(rs.getInt("width"));
        details.setSize(rs.getString("size"));
        details.setBaseMaterial(rs.getString("material"));
        details.setProducer(ParchetProducer.valueFrom(rs.getString("producer")));
        details.setWood(rs.getString("wood"));
//        details.setCertificate(rs.getString("certificate")); // TODO
//        details.setCaracteristics(rs.getString("caracteristics")); // TODO
        details.setDelivery(rs.getString("delivery"));
        details.setImages(rs.getInt("images"));
        details.setOrderNr(rs.getInt("order_nr"));
        return details;
    }
}
