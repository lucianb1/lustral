package ro.lustral.model.mobilier;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
public class MobilierCollection {

    private int id;
    private String name;
    private int images;
    private List<String> colors;
    private int orderNr;
    private String imageUrl;

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImages(int images) {
        this.images = images;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public void setOrderNr(int orderNr) {
        this.orderNr = orderNr;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getImages() {
        return images;
    }

    public List<String> getColors() {
        return colors;
    }

    public int getOrderNr() {
        return orderNr;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
