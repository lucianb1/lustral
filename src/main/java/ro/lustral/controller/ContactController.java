package ro.lustral.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ro.lustral.core.constants.Constants;
import ro.lustral.core.request.ContactMessageRequest;
import ro.lustral.service.AnalysticService;
import ro.lustral.service.ContactService;

import javax.validation.Valid;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class ContactController {

    @Autowired
    private AnalysticService analysticService;

    @Autowired
    private ContactService contactService;

    @RequestMapping(value = "/contact", method = RequestMethod.POST)
    public void sendMessage(@Valid @RequestBody ContactMessageRequest request) {
        contactService.receiveNewMessage(request.getEmail(), request.getMessage());
        analysticService.updatePageRequest(Constants.MESSAGES);
    }

}
