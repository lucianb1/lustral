package ro.lustral.model.parchet;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import ro.lustral.core.ParchetProducer;
import ro.lustral.core.ParchetTrafficClass;

/**
 * Created by Luci on 27-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class Parchet {

    private int id;
    private String name;
    private String description;
    private ParchetProducer producer;
    private ParchetTrafficClass trafficClass;
    private int width;
    private String imageUrl;
    private float price;
    private Float oldPrice;
    private boolean hasDiscount;
    private int orderNr;
    private Integer warranty;

    public Parchet setId(int id) {
        this.id = id;
        return this;
    }

    public Parchet setName(String name) {
        this.name = name;
        return this;
    }

    public Parchet setProducer(ParchetProducer producer) {
        this.producer = producer;
        return this;
    }

    public Parchet setTrafficClass(ParchetTrafficClass trafficClass) {
        this.trafficClass = trafficClass;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Parchet setDescription(String description) {
        this.description = description;
        return this;
    }

    public boolean getHasDiscount() {
        return hasDiscount;
    }

    public void setHasDiscount(boolean hasDiscount) {
        this.hasDiscount = hasDiscount;
    }

    public Parchet setWidth(int width) {
        this.width = width;
        return this;
    }

    public Parchet setPrice(float price) {
        this.price = price;
        return this;
    }

    public Parchet setOldPrice(Float oldPrice) {
        if (oldPrice != null) {
            hasDiscount = true;
            this.oldPrice = oldPrice;
        }
        return this;
    }

    public Parchet setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public Parchet setOrderNr(int orderNr) {
        this.orderNr = orderNr;
        return this;
    }

    public int getOrderNr() {
        return orderNr;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public ParchetProducer getProducer() {
        return producer;
    }

    public String getTrafficClass() {
        return trafficClass.toString();
    }

    public int getWidth() {
        return width;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public float getPrice() {
        return price;
    }

    public Float getOldPrice() {
        return oldPrice;
    }

    public boolean hasDiscount() {
        return hasDiscount;
    }

}
