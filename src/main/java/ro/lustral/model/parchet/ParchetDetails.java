package ro.lustral.model.parchet;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import ro.lustral.core.ParchetProducer;
import ro.lustral.core.ParchetTrafficClass;

/**
 * Created by Luci on 29-Dec-16.
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.ANY)
public class ParchetDetails {

    private int id;
    private int warranty;
    private String name;
    private ParchetProducer producer;
    private ParchetTrafficClass trafficClass;
    private int width;
    private String size;
    private String certificate;
    private String baseMaterial;
    private String caracteristics;
    private String grip;
    private Float price;
    private Float oldPrice;
    private int orderNr;
    private String wood;
    private String country;
    private int images;
    private String delivery;
    private String description;
    private boolean hasDiscount;

    public String getDescription() {
        return String.format("Parchet laminat %s, %s", description, getProducer());
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getWarranty() {
        return 10; //TODO
    }

    public void setWarranty(int warranty) {
        this.warranty = warranty;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getCertificate() {
        return "Green certificate"; //TODO
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public String getBaseMaterial() {
        return baseMaterial;
    }

    public void setBaseMaterial(String baseMaterial) {
        this.baseMaterial = baseMaterial;
    }

    public String getCaracteristics() {
        return caracteristics;
    }

    public void setCaracteristics(String caracteristics) {
        this.caracteristics = caracteristics;
    }

    public String getGrip() {
        return grip;
    }

    public void setGrip(String grip) {
        this.grip = grip;
    }

    public int getOrderNr() {
        return orderNr;
    }

    public void setOrderNr(int orderNr) {
        this.orderNr = orderNr;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProducer() {
        return producer.name();
    }

    public void setProducer(ParchetProducer producer) {
        this.producer = producer;
    }

    public String getTrafficClass() {
        return trafficClass.toString();
    }

    public void setTrafficClass(ParchetTrafficClass trafficClass) {
        this.trafficClass = trafficClass;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(Float oldPrice) {
        if (oldPrice != null) {
            this.oldPrice = oldPrice;
            hasDiscount = true;
        }
    }

    public boolean getForHeat() {
        return true; //TODO
    }

    public String getCountry() {
        return producer.getCountry();
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getImages() {
        return images;
    }

    public void setImages(int images) {
        this.images = images;
    }

    public String getDelivery() {
        return delivery;
    }

    public void setDelivery(String delivery) {
        this.delivery = delivery;
    }

    public String getWood() {
        return wood;
    }

    public void setWood(String wood) {
        this.wood = wood;
    }

    public boolean hasDiscount() {
        return hasDiscount;
    }
}
