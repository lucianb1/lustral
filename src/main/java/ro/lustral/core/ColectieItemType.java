package ro.lustral.core;

import java.util.Arrays;

/**
 * Created by Luci on 27-Dec-16.
 */
public enum ColectieItemType {

    Gresie(1), Faianta(2), Mozaic(3), Decor(4), Brau(5);

    private int value;

    ColectieItemType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public ColectieItemType valueFrom(int value) {
        return Arrays.stream(ColectieItemType.values()).filter(item -> item.getValue() == value).findAny().orElse( null);
    }
}
