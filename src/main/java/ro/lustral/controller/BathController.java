package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.model.Bath;
import ro.lustral.service.BathService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class BathController {

    @Autowired
    private BathService bathService;

    @RequestMapping(value = "/cazi", method = RequestMethod.GET)
    public List<Bath> getAll() {
        return bathService.getAll();
    }


}
