package ro.lustral.core.response;

import ro.lustral.model.mobilier.MobilierItem;

import java.util.List;

/**
 * Created by Luci on 08-Jan-17.
 */
public class MobilierDetailsJsonResponse {

    private String name;
    private int imagesCount;
    private String baseUrl;
    private List<MobilierItem> items;

    public String getName() {
        return name;
    }

    public int getImagesCount() {
        return imagesCount;
    }

    public List<MobilierItem> getItems() {
        return items;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImagesCount(int imagesCount) {
        this.imagesCount = imagesCount;
    }

    public void setItems(List<MobilierItem> items) {
        this.items = items;
    }

}
