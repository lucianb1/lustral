package ro.lustral.model.parchet;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import ro.lustral.core.ParchetProducer;
import ro.lustral.core.ParchetTrafficClass;
import ro.lustral.model.OrderedEntity;

/**
 * Created by Luci on 27-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class Parchet extends OrderedEntity {

    private int id;
    private String name;
    private ParchetProducer producer;
    private ParchetTrafficClass trafficClass;
    private int width;
    private String imageUrl;
    private float price;
    private Float oldPrice;
    private boolean hasDiscount;

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
