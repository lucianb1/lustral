package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.lustral.core.constants.Constants;
import ro.lustral.core.request.FindGresieRequest;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieDetailsJsonResponse;
import ro.lustral.service.AnalysticService;
import ro.lustral.service.GresieService;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class GresieController {

    @Autowired
    private AnalysticService analysticService;

    @Autowired
    private GresieService colectieService;

//    @RequestMapping(value = "/gresie-faianta", method = RequestMethod.GET)
//    public List<Colectie> getAll() {
//        return colectieService.getAll();
//    }

    @RequestMapping(value = "/gresie-faianta/{id}", method = RequestMethod.GET)
    public ColectieDetailsJsonResponse getDetails(@PathVariable Integer id) {
        analysticService.updatePageRequest(Constants.GRESIE_DETAILS_PAGE);
        return colectieService.getDetails(id);
    }

    @RequestMapping(value = "/gresie-faianta", method = RequestMethod.POST)
    public List<Colectie> findColectii(@Valid @RequestBody FindGresieRequest request) {
        if (request.getPage() > 1) {
            analysticService.updatePageRequest(Constants.GRESIE_SCROLL);
        } else {
            analysticService.updatePageRequest(Constants.GRESIE_PAGE);
        }
        return colectieService.findColectii(request);
    }
}
