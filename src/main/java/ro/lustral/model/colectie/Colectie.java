package ro.lustral.model.colectie;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import static ro.lustral.core.constants.ImageConstants.COLECTII_IMAGE_LOCATION;

/**
 * Created by Luci on 27-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class Colectie {

    private int id;
    private String name;
    private float price;
    private Float oldPrice;
    private boolean hasDiscount;

    private boolean forKitchen;
    private boolean forLiving;
    private boolean forBath;
    private boolean forExterior;
    private boolean isPorcelain;
    private boolean isRectificat;
    private String unit;
    private int images;


    public Colectie setId(int id) {
        this.id = id;
        return this;
    }

    public Colectie setName(String name) {
        this.name = name;
        return this;
    }

    public Colectie setPrice(float price) {
        this.price = price;
        return this;
    }

    public Colectie setOldPrice(Float oldPrice) {
        this.oldPrice = oldPrice;
        if (oldPrice != null) {
            hasDiscount = true;
        }
        return this;
    }

    public Colectie setIsForKitchen(boolean forKitchen) {
        this.forKitchen = forKitchen;
        return this;
    }

    public Colectie setIsForLiving(boolean forLiving) {
        this.forLiving = forLiving;
        return this;
    }

    public Colectie setIsForBath(boolean forBath) {
        this.forBath = forBath;
        return this;
    }

    public Colectie setIsForExterior(boolean forExterior) {
        this.forExterior = forExterior;
        return this;
    }

    public Colectie setIsPorcelain(boolean porcelain) {
        isPorcelain = porcelain;
        return this;
    }

    public Colectie setImages(int images) {
        this.images = images;
        return this;
    }

    public Colectie setIsRectificat(boolean rectificat) {
        isRectificat = rectificat;
        return this;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public float getPrice() {
        return price;
    }

    public Float getOldPrice() {
        return oldPrice;
    }

    public boolean getHasDiscount() {
        return hasDiscount;
    }

    public boolean getIsForKitchen() {
        return forKitchen;
    }

    public boolean getIsForLiving() {
        return forLiving;
    }

    public boolean getIsForBath() {
        return forBath;
    }

    public boolean getIsForExterior() {
        return forExterior;
    }

    public boolean getIsRectificat() {
        return isRectificat;
    }

    public boolean getIsPorcelain() {
        return isPorcelain;
    }

    public int getImages() {
        return images;
    }

    public String getUnit() {
        return unit;
    }

    public Colectie setUnit(String unit) {
        this.unit = unit;
        return this;
    }

    public String getImageUrl() {
        return COLECTII_IMAGE_LOCATION + getName().toLowerCase().replaceAll(" ", "_") + "/main.jpg";
    }
}
