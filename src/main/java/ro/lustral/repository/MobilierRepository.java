package ro.lustral.repository;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ro.lustral.core.exception.NotFoundException;
import ro.lustral.model.mobilier.MobilierCollection;
import ro.lustral.model.mobilier.MobilierItem;
import ro.lustral.repository.rowmapper.MobilierCollectionRowMapper;
import ro.lustral.repository.rowmapper.MobilierCoreRowMapper;
import ro.lustral.repository.rowmapper.MobilierItemRowMapper;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Repository
public class MobilierRepository {

    private static final Logger LOG = Logger.getLogger(MobilierRepository.class);

    private static final MobilierCollectionRowMapper collectionRowMapper = new MobilierCollectionRowMapper();
    private static final MobilierCoreRowMapper coreRowMapper = new MobilierCoreRowMapper();
    private static final MobilierItemRowMapper itemsRowMapper = new MobilierItemRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Cacheable("mobilier-all")
    public List<MobilierCollection> getAll() {
        LOG.info("getAll() method called");
        String sql = "SELECT i.order_nr, c.* FROM mobilier_colectii c INNER JOIN mobilier_collectii_items i ON i.collection_id = c.id ORDER by i.order_nr";
        return jdbcTemplate.query(sql, collectionRowMapper);
    }

    @Cacheable("mobilier-collection")
    public MobilierCollection getCollection(int id) {
        LOG.info("get collection by id called");
        String sql = "SELECT id, name, images FROM mobilier_colectii WHERE id = :id";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("id", id);
        try {
            return jdbcTemplate.queryForObject(sql, params, coreRowMapper);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException();
        }
    }

    @Cacheable("mobilier-items")
    public List<MobilierItem> getCollectionItems(int collectionID) {
        LOG.info("get collection items called");
        String sql = "SELECT * FROM mobilier_items WHERE collection_id = :collectionID";
        MapSqlParameterSource params = new MapSqlParameterSource().addValue("collectionID", collectionID);
        return jdbcTemplate.query(sql, params, itemsRowMapper);
    }


}
