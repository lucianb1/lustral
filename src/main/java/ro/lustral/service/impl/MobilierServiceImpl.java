package ro.lustral.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import ro.lustral.core.constants.ImageConstants;
import ro.lustral.core.response.MobilierDetailsJsonResponse;
import ro.lustral.model.mobilier.MobilierCollection;
import ro.lustral.model.mobilier.MobilierItem;
import ro.lustral.repository.MobilierRepository;
import ro.lustral.service.MobilierService;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

/**
 * Created by Luci on 08-Jan-17.
 */
@Service
public class MobilierServiceImpl implements MobilierService {

    private static final Logger LOG = Logger.getLogger(MobilierRepository.class);

    @Autowired
    private MobilierRepository mobilierRepository;

    @Qualifier("jdbcExecutor")
    @Autowired
    private ExecutorService executorService;

    @Cacheable("mobilier")
    @Override
    public List<MobilierCollection> getCollections() {
        LOG.info("getAll() method called");
        return mobilierRepository.getAll();
    }

    @Cacheable("mobilier-details")
    @Override
    public MobilierDetailsJsonResponse getDetails(int collectionID) {
        LOG.info("getDetails() method called");
        CompletableFuture<MobilierCollection> collectionFuture = CompletableFuture.supplyAsync(() -> mobilierRepository.getCollection(collectionID), executorService);
        CompletableFuture<List<MobilierItem>> itemsFuture = CompletableFuture.supplyAsync(() -> mobilierRepository.getCollectionItems(collectionID), executorService);

        return collectionFuture.thenCombine(itemsFuture, (collection, items) -> {
            MobilierDetailsJsonResponse response = new MobilierDetailsJsonResponse();
            String name = collection.getName();
            response.setName(name);
            response.setImagesCount(collection.getImages());
            response.setItems(items);
            response.setBaseUrl(ImageConstants.MOBILIER_IMAGE_LOCATION + name.toLowerCase().replaceAll(" ", "_"));
            return response;
        }).join();
    }

}
