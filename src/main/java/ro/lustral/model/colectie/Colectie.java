package ro.lustral.model.colectie;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import ro.lustral.core.ColectieUnit;
import ro.lustral.model.OrderedEntity;

/**
 * Created by Luci on 27-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class Colectie extends OrderedEntity {

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
    private ColectieUnit unit;
    private int images;
    private String bigImageUrl;
    private String smallImageUrl;


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

    public Colectie setSmallImageUrl(String smallImageUrl) {
        this.smallImageUrl = smallImageUrl;
        return this;
    }

    public Colectie setUnit(ColectieUnit unit) {
        this.unit = unit;
        return this;
    }

    public Colectie setImages(int images) {
        this.images = images;
        return this;
    }

    public Colectie setOrderNr(int orderNr) {
        this.orderNr = orderNr;
        return this;
    }

    public Colectie setBigImageUrl(String bigImageUrl) {
        this.bigImageUrl = bigImageUrl;
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

    public boolean isHasDiscount() {
        return hasDiscount;
    }

    public boolean isForKitchen() {
        return forKitchen;
    }

    public boolean isForLiving() {
        return forLiving;
    }

    public boolean isForBath() {
        return forBath;
    }

    public boolean isForExterior() {
        return forExterior;
    }

    public boolean isPorcelain() {
        return isPorcelain;
    }

    public String getUnit() {
        return unit.name().toLowerCase();
    }

    public int getImages() {
        return images;
    }

    public String getBigImageUrl() {
        return bigImageUrl;
    }

    public String getSmallImageUrl() {
        return smallImageUrl;
    }
}
