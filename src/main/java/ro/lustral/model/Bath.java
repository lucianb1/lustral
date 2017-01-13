package ro.lustral.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import ro.lustral.core.constants.ImageConstants;

/**
 * Created by Luci on 27-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class Bath {

    private int id;
    private float price;
    private String name;
    private String size;
    private Float oldPrice;
    private boolean hasDiscount;
    private boolean multipleSizes;
    private int images;

    public Bath setId(int id) {
        this.id = id;
        return this;
    }

    public Bath setOldPrice(Float oldPrice) {
        this.oldPrice = oldPrice;
        if (oldPrice != null) {
            this.hasDiscount = hasDiscount;
        }
        return this;
    }


    public Bath setPrice(float price) {
        this.price = price;
        return this;
    }

    public Bath setName(String name) {
        this.name = name;
        return this;
    }

    public Bath setSize(String size) {
        this.size = size;
        return this;
    }

    public Bath setHasDiscount(boolean hasDiscount) {
        this.hasDiscount = hasDiscount;
        return this;
    }

    public Bath setMultipleSizes(boolean multipleSizes) {
        this.multipleSizes = multipleSizes;
        return this;
    }

    public Bath setImages(int images) {
        this.images = images;
        return this;
    }

    public int getId() {
        return id;
    }

    public float getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public String getSize() {
        return size;
    }

    public Float getOldPrice() {
        return oldPrice;
    }

    public boolean getHasDiscount() {
        return hasDiscount;
    }

    public boolean getHasMultipleSizes() {
        return multipleSizes;
    }

    public int getImages() {
        return images;
    }

    public String getBaseUrl() {
        return ImageConstants.BATH_IMAGE_LOCATION + name.toLowerCase() + "/";
    }
}
