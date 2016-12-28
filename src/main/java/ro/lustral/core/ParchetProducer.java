package ro.lustral.core;

import java.util.Arrays;

/**
 * Created by Luci on 27-Dec-16.
 */
public enum ParchetProducer {

    KAINDL, EUROWOOD, EGGER;

    public static ParchetProducer valueFrom(String value) {
        return Arrays.stream(ParchetProducer.values()).filter(item -> item.name().equalsIgnoreCase(value)).findAny().orElse( null);
    }
}
