package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.service.ParchetService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class ParchetController {

    @Autowired
    private ParchetService parchetService;

    @RequestMapping(value = "/parchet", method = RequestMethod.GET)
    public List<Parchet> getParchet() {
        return parchetService.getAll();
    }


}
