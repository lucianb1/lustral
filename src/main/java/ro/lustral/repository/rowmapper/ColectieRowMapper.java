package ro.lustral.repository.rowmapper;

import org.springframework.jdbc.core.RowMapper;
import ro.lustral.core.ColectieUnit;
import ro.lustral.core.constants.ImageConstants;
import ro.lustral.model.colectie.Colectie;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Luci on 27-Dec-16.
 */
public class ColectieRowMapper implements RowMapper<Colectie> {

    @Override
    public Colectie mapRow(ResultSet rs, int i) throws SQLException {
        String name = rs.getString("name");
        return new Colectie()
                .setId(rs.getInt("id"))
                .setName(name)
                .setPrice(rs.getFloat("price"))
                .setOldPrice((Float) rs.getObject("old_price"))
                .setUnit(ColectieUnit.valueFrom(rs.getString("unit")))
                .setImages(rs.getInt("images"))
                .setIsPorcelain(rs.getBoolean("is_porcelain"))
                .setIsForBath(rs.getBoolean("for_bath"))
                .setIsForExterior(rs.getBoolean("for_exterior"))
                .setIsForLiving(rs.getBoolean("for_living"))
                .setIsForKitchen(rs.getBoolean("for_kitchen"))
                .setOrderNr(rs.getInt("order_nr"))
                .setBigImageUrl(ImageConstants.COLECTII_IMAGE_LOCATION + name.toLowerCase().replaceAll(" ", "_") + "/a.jpg")
                .setSmallImageUrl(ImageConstants.COLECTII_SMALL_IMAGE_LOCATION + name.toLowerCase().replaceAll(" ", "_") + "/a.jpg");
    }
}
