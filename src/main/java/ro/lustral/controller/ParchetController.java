package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.lustral.core.constants.Constants;
import ro.lustral.core.request.FindParchetRequest;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;
import ro.lustral.service.AnalysticService;
import ro.lustral.service.ParchetService;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class ParchetController {

    @Autowired
    private AnalysticService analysticService;

    @Autowired
    private ParchetService parchetService;

    @RequestMapping(value = "/parchet", method = RequestMethod.POST)
    public List<Parchet> findParchet(@Valid @RequestBody FindParchetRequest request) {
        if (request.getPage() > 1) {
            analysticService.updatePageRequest(Constants.PARCHET_SCROLL);
        } else {
            analysticService.updatePageRequest(Constants.PARCHET_PAGE);
        }
        return parchetService.findParchet(request);
    }

    @RequestMapping(value = "/parchet/detalii/{id}", method = RequestMethod.GET)
    public ParchetDetails getParchetDetails(@PathVariable Integer id) {
        analysticService.updatePageRequest(Constants.PARCHET_DETAILS_PAGE);
        return parchetService.getDetails(id);
    }


}
