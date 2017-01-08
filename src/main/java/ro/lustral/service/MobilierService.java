package ro.lustral.service;

import ro.lustral.core.response.MobilierDetailsJsonResponse;
import ro.lustral.model.mobilier.MobilierCollection;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
public interface MobilierService {
    List<MobilierCollection> getCollections();

    MobilierDetailsJsonResponse getDetails(int collectionID);
}
