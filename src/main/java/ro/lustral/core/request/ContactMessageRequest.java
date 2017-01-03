package ro.lustral.core.request;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

/**
 * Created by Luci on 03-Jan-17.
 */
public class ContactMessageRequest {

    @Email
    @NotNull
    private String email;

    @NotBlank
    @Length(min = 5, max = 256)
    private String message;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
