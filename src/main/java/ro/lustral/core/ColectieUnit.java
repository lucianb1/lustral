package ro.lustral.core;

import java.util.Arrays;

/**
 * Created by Luci on 27-Dec-16.
 */
public enum ColectieUnit {
    MP, BUC;

    public static ColectieUnit valueFrom(String value) {
        return Arrays.stream(ColectieUnit.values()).filter(item -> item.name().equalsIgnoreCase(value)).findAny().orElse( null);
    }
}
