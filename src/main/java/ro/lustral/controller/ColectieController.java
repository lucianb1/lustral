package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.lustral.core.request.FindGresieRequest;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieDetailsJsonResponse;
import ro.lustral.service.ColectieService;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class ColectieController {

    @Autowired
    private ColectieService colectieService;

    @RequestMapping(value = "/gresie-faianta", method = RequestMethod.GET)
    public List<Colectie> getAll() {
        return colectieService.getAll();
    }

    @RequestMapping(value = "/gresie-faianta/{id}", method = RequestMethod.GET)
    public ColectieDetailsJsonResponse getDetails(@PathVariable Integer id) {
        return colectieService.getDetails(id);
    }

    @RequestMapping(value = "/gresie-faianta", method = RequestMethod.POST)
    public List<Colectie> findColectii(@Valid @RequestBody FindGresieRequest request) {
        return colectieService.findColectii(request);
    }
}
