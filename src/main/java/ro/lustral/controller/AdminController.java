package ro.lustral.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class AdminController {

    @RequestMapping(method = RequestMethod.POST, value = "/admin/excel")
    public void loadExcelData() {

    }

}
