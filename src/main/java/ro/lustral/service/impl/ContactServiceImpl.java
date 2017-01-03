package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.repository.ContactMessageRepository;
import ro.lustral.service.ContactService;
import ro.lustral.service.MailService;

/**
 * Created by Luci on 27-Dec-16.
 */
@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactMessageRepository repository;

    @Autowired
    private MailService mailService;

    @Override
    public void receiveNewMessage(String email, String message) {
        repository.saveMessage(email, message);
        mailService.sendMailForNewMessage(email, message);
    }
}
