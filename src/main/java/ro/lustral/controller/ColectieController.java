package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.service.ColectieService;

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

}
