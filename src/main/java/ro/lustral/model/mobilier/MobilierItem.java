package ro.lustral.model.mobilier;

/**
 * Created by Luci on 27-Dec-16.
 */
public class MobilierItem {

    private String name;
    private String code;
    private Float price;
    private String description;
    private String size;

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public Float getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSize() {
        return size;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setPrice(Float price) {
        this.price = price;
    }


    public void setSize(String size) {
        this.size = size;
    }

}
