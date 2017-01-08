package ro.lustral.repository.rowmapper;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.RowMapper;
import ro.lustral.core.constants.ImageConstants;
import ro.lustral.model.mobilier.MobilierCollection;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by Luci on 08-Jan-17.
 */
public class MobilierCollectionRowMapper implements RowMapper<MobilierCollection> {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, String> colorsMap;

    @Override
    public MobilierCollection mapRow(ResultSet rs, int i) throws SQLException {
        MobilierCollection collection = new MobilierCollection();
        collection.setId(rs.getInt("id"));
        int order_nr = rs.getInt("order_nr");
        collection.setOrderNr(order_nr);
        String name = rs.getString("name");
        collection.setName(name);
        String jsonColors = rs.getString("colors");
        if (jsonColors != null) {
            collection.setColors(deserializeColorsArray(jsonColors));
        }
        String urlName = name.toLowerCase().replaceAll(" ", "_");
        collection.setImageUrl(ImageConstants.MOBILIER_IMAGE_LOCATION + order_nr + "_" + urlName + ".jpg");
        return collection;
    }

    private List<String> deserializeColorsArray(String json) {
        try {
            List<String> colors = objectMapper.readValue(json, new TypeReference<List<String>>() {
            });
            return colors.stream().map(item -> colorsMap.get(item)).collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    {
        colorsMap = new HashMap<>();

        colorsMap.put("ALB", "#ffffff");
        colorsMap.put("ROSU", "#ffffff");
        colorsMap.put("MARO_I", "#ffffff");
        colorsMap.put("MARO_D", "#ffffff");
        colorsMap.put("ALBASTRU_D", "#ffffff");
        colorsMap.put("ALBASTRU_I", "#ffffff");
        colorsMap.put("GRI", "#ffffff");
        colorsMap.put("NEGRU", "#ffffff");
        colorsMap.put("GALBEN", "#ffffff");
        colorsMap.put("VERDE", "#ffffff");
        colorsMap.put("MOV", "#ffffff");
        colorsMap.put("ROZ", "#ffffff");
    }
}
