package ro.lustral.repository;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.core.constants.PaginationConstants;
import ro.lustral.core.request.FindGresieRequest;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieItem;
import ro.lustral.repository.rowmapper.ColectieItemRowMapper;
import ro.lustral.repository.rowmapper.ColectieRowMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class GresieRepository {

    private static final Logger LOG = Logger.getLogger(GresieRepository.class);

    private static final ColectieRowMapper rowMapper = new ColectieRowMapper();
    private static final ColectieItemRowMapper itemRowMapper = new ColectieItemRowMapper();
    private static final Map<Integer, String> orderClauses;

    static {
        orderClauses = new HashMap<>();
        orderClauses.put(1, "price ASC");
        orderClauses.put(2, "price DESC");
    }

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

//    public List<Colectie> getAll() {
//        String sql = "SELECT * FROM colectii ORDER BY order_nr";
//        return jdbcTemplate.query(sql, rowMapper);
//    }

    @Cacheable("gresie-items")
    public List<ColectieItem> getItems(int id) {
        LOG.info("getItems() method was called");
        String sql = "SELECT i.*, c.images, c.name as collection_name FROM colectii_items i INNER JOIN colectii c ON collection_id = :id AND c.id = i.collection_id ORDER BY i.order_nr ASC";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("id", id);
        return jdbcTemplate.query(sql, params, itemRowMapper);
    }

    @Cacheable(value = "gresie", condition = "#request.isDefault()", key = "#request.page")
    public List<Colectie> findColectii(FindGresieRequest request) {
        LOG.info("findColectii() method was called with filter: " + request.toString());
        StringBuilder builder = new StringBuilder("SELECT * FROM colectii WHERE 1 = 1 ");
        if (!StringUtils.isBlank(request.getName())) {
            builder.append(" AND name like :name ");
        }
        FindGresieRequest.MaterialFilter materialFilter = request.getMaterialFilter();
        if (materialFilter.isSet()) {
            String materialQuery = " AND (1=0";
            if (materialFilter.isPorcelain()) {
                materialQuery += " OR is_porcelain = 1";
            }
            if (materialFilter.isRectificat()) {
                materialQuery += " OR is_rectificat = 1";
            }
            materialQuery += ")";
            builder.append(materialQuery);
        }

        FindGresieRequest.RoomFilter roomFilter = request.getRoomFilter();
        if (roomFilter.isSet()) {
            String roomQuery = "AND (1=0";

            if (roomFilter.isForBath()) {
                roomQuery += " OR for_bath = 1";
            }
            if (roomFilter.isForLiving()) {
                roomQuery += " OR for_living = 1";
            }
            if (roomFilter.isForKitchen()) {
                roomQuery += " OR for_kitchen = 1";
            }
            if (roomFilter.isForExterior()) {
                roomQuery += " OR for_exterior = 1";
            }
            roomQuery += ") ";
            builder.append(roomQuery);
        }

        // design query

        FindGresieRequest.DesignFilter designFilter = request.getDesignFilter();
        if (designFilter.isSet()) {
            String designQuery = " AND (1=0";
            if (designFilter.isStone()) {
                designQuery += " OR is_stone = 1";
            }
            if (designFilter.isWood()) {
                designQuery += " OR is_wood = 1";
            }
            designQuery += ") ";
            builder.append(designQuery);
        }

        Integer sort = request.getSort();

        String orderClause = orderClauses.get(sort) != null ? orderClauses.get(sort) : "order_nr";
        builder.append(" ORDER BY " + orderClause);
        builder.append(" LIMIT :start, :limit");

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("name", "%" + request.getName() + "%")
                .addValue("start", (request.getPage() - 1) * PaginationConstants.PARCHET_PAGE_SIZE)
                .addValue("limit", PaginationConstants.PARCHET_PAGE_SIZE);
        return jdbcTemplate.query(builder.toString(), params, rowMapper);
    }

}
