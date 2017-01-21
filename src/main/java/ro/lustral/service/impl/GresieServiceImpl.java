package ro.lustral.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.core.constants.ImageConstants;
import ro.lustral.core.request.FindGresieRequest;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieDetailsJsonResponse;
import ro.lustral.model.colectie.GresieItem;
import ro.lustral.repository.GresieRepository;
import ro.lustral.service.GresieService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Service
public class GresieServiceImpl implements GresieService {

    private static final Logger LOG = Logger.getLogger(GresieService.class);

    @Autowired
    private GresieRepository repository;

//    @Override
//    public List<Colectie> getAll() {
//        return repository.getAll();
//    }

    @Override
    public ColectieDetailsJsonResponse getDetails(int id) {
        ColectieDetailsJsonResponse response = new ColectieDetailsJsonResponse();
        List<GresieItem> items = repository.getItems(id);
        response.setItems(items);
        if (!items.isEmpty()) {
            response.setImages(items.get(0).getImages());
            response.setName(items.get(0).getColectieName());
        }
        String name = response.getName().toLowerCase().replaceAll(" ", "_");
        String baseUrl = ImageConstants.COLECTII_IMAGE_LOCATION + name + "/";
        response.setBaseUrl(baseUrl);
        response.setBaseItemsUrl(baseUrl + "items/");
        return response;
    }

    @Override
    public List<Colectie> findColectii(FindGresieRequest request) {
        return repository.findColectii(request);
    }

}
