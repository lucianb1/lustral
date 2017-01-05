package ro.lustral.core;

import java.util.Arrays;

/**
 * Created by Luci on 27-Dec-16.
 */
public enum ParchetProducer {

    KAINDL("Austria"), EUROWOOD("Austria"), EGGER("Germania");

    private String country;


    ParchetProducer(String country) {
        this.country = country;
    }

    public static ParchetProducer valueFrom(String value) {
        return Arrays.stream(ParchetProducer.values()).filter(item -> item.name().equalsIgnoreCase(value)).findAny().orElse( null);
    }

    public String getCountry() {
        return country;
    }
}
