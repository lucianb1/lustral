package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.service.AnalysticService;

/**
 * Created by Luci on 14-Jan-17.
 */
@RestController
public class AnalyticsController {

    @Autowired
    private AnalysticService analysticService;

}
