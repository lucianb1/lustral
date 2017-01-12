package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.core.constants.ImageConstants;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieDetailsJsonResponse;
import ro.lustral.model.colectie.ColectieItem;
import ro.lustral.repository.ColectieRepository;
import ro.lustral.service.ColectieService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Service
public class ColectieServiceImpl implements ColectieService {

    @Autowired
    private ColectieRepository repository;

    @Override
    public List<Colectie> getAll() {
        return repository.getAll();
    }

    @Override
    public ColectieDetailsJsonResponse getDetails(int id) {
        ColectieDetailsJsonResponse response = new ColectieDetailsJsonResponse();
        List<ColectieItem> items = repository.getItems(id);
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

}
