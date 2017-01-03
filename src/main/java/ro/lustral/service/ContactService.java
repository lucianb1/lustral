package ro.lustral.service;

/**
 * Created by Luci on 27-Dec-16.
 */
public interface ContactService {

    void receiveNewMessage(String email, String message);
}
