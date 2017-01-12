package ro.lustral.model.colectie;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by Luci on 27-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class ColectieItem {

    private int id;
    private String colectieName; // for speed
    private int images;
    private String unit;
    private String size;
    private String description;
    private float price;
    private Float oldPrice;
    private boolean isPorcelain;
    private boolean isMatt;
    private boolean isGlossy;

    public int getId() {
        return id;
    }

    @JsonIgnore
    public String getColectieName() {
        return colectieName;
    }

    @JsonIgnore
    public int getImages() {
        return images;
    }

    public String getUnit() {
        return unit;
    }

    public String getSize() {
        return size;
    }

    public String getDescription() {
        return description;
    }

    public float getPrice() {
        return price;
    }

    public Float getOldPrice() {
        return oldPrice;
    }

    public boolean isPorcelain() {
        return isPorcelain;
    }

    public boolean isMatt() {
        return isMatt;
    }

    public boolean isGlossy() {
        return isGlossy;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setColectieName(String colectieName) {
        this.colectieName = colectieName;
    }

    public void setImages(int images) {
        this.images = images;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setOldPrice(Float oldPrice) {
        this.oldPrice = oldPrice;
    }

    public void setPorcelain(boolean porcelain) {
        isPorcelain = porcelain;
    }

    public void setMatt(boolean matt) {
        isMatt = matt;
    }

    public void setGlossy(boolean glossy) {
        isGlossy = glossy;
    }
}
