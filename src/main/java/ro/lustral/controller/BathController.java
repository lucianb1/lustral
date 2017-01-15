package ro.lustral.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.core.constants.Constants;
import ro.lustral.model.Bath;
import ro.lustral.service.AnalysticService;
import ro.lustral.service.BathService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class BathController {

    private static final Logger LOG = Logger.getLogger(BathController.class);

    @Autowired
    private AnalysticService analysticService;

    @Autowired
    private BathService bathService;

    @Cacheable("cazi-all")
    @RequestMapping(value = "/cazi", method = RequestMethod.GET)
    public List<Bath> getAll() {
        LOG.info("getAll() method called");
        analysticService.updatePageRequest(Constants.CAZI_PAGE);
        return bathService.getAll();
    }


}
