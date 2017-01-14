package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.core.constants.Constants;
import ro.lustral.core.response.MobilierDetailsJsonResponse;
import ro.lustral.model.mobilier.MobilierCollection;
import ro.lustral.service.AnalysticService;
import ro.lustral.service.MobilierService;

import java.util.List;

/**
 * Created by Luci on 08-Jan-17.
 */
@RestController
@RequestMapping("/mobilier")
public class MobilierController {

    @Autowired
    private AnalysticService analysticService;

    @Autowired
    private MobilierService mobilierService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MobilierCollection> getCollections() {
        analysticService.updatePageRequest(Constants.MOBILIER_PAGE);
        return mobilierService.getCollections();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/detalii/{id}")
    public MobilierDetailsJsonResponse getDetails(@PathVariable Integer id) {
        analysticService.updatePageRequest(Constants.MOBILIER_DETAILS_PAGE);
        return mobilierService.getDetails(id);
    }

}
