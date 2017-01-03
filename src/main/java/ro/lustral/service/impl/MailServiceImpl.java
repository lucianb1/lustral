package ro.lustral.service.impl;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ro.lustral.service.MailService;

/**
 * Created by Luci on 03-Jan-17.
 */
@Async("asyncExecutor")
@Service
public class MailServiceImpl implements MailService {

    @Override
    public void sendMailForNewMessage(String email, String messasge) {

    }
}
