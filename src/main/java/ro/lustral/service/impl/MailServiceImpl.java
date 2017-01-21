package ro.lustral.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ro.lustral.service.MailService;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

/**
 * Created by Luci on 03-Jan-17.
 */
@Service
public class MailServiceImpl implements MailService {

    private static final Logger LOG = Logger.getLogger(MailServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    @Async("analyticsExecutor")
    @Override
    public void sendMailForNewMessage(String email, String contactMessage) {
        final MimeMessage mimeMessage = mailSender.createMimeMessage();
        final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            LOG.info("Sending contact message " + "");
            String mailMessage = contactMessage + "\nEmail: " + email;
            String mailTo = "office@lustral.ro";
            configureMessage(message, mailTo, "Mesaj nou", mailMessage);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            LOG.error("Exception occurred while trying to send password change confirmation email", e);
        }
    }

    private void configureMessage(MimeMessageHelper message, String to, String subject, String content) throws MessagingException, UnsupportedEncodingException {
        message.setFrom(new InternetAddress("fmarketapp@gmail.com", "Lustral website"));
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content, false /* is html */);
    }
}
