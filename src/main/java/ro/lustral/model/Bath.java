package ro.lustral.model;

/**
 * Created by Luci on 27-Dec-16.
 */
public class Bath extends OrderedEntity {

    private int id;
    private float price;
    private String name;
    private String size;
    private Float oldPrice;
    private boolean hasDiscount;

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

    public Bath setOrderNr(int orderNr) {
        this.orderNr = orderNr;
        return this;
    }
}
