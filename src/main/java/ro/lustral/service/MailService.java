package ro.lustral.service;

/**
 * Created by Luci on 03-Jan-17.
 */
public interface MailService {

    void sendMailForNewMessage(String email, String messasge);
}
