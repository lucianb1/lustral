package ro.lustral.core;

import java.util.Arrays;

/**
 * Created by Luci on 27-Dec-16.
 */
public enum ParchetTrafficClass {

    CL31("AC3", 31), CL32("AC4", 32), CL33("AC5", 33);

    private int intValue;
    private String textValue;

    ParchetTrafficClass(String textValue, int intValue) {
        this.intValue = intValue;
        this.textValue = textValue;
    }

    public String toString() {
        return intValue + " / " + textValue;
    }

    public int getIntValue() {
        return intValue;
    }

    public String getTextValue() {
        return textValue;
    }

    public static ParchetTrafficClass valueFrom(int intValue) {
        return Arrays.stream(ParchetTrafficClass.values()).filter(item -> item.getIntValue() == intValue).findAny().orElse( null);
    }


}
