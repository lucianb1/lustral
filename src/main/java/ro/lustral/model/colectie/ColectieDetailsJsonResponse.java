package ro.lustral.model.colectie;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Luci on 11-Jan-17.
 */
public class ColectieDetailsJsonResponse {

    private String name;
    private int images;
    private String baseUrl;
    private String baseItemsUrl;
    private List<ColectieItem> items = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getImages() {
        return images;
    }

    public void setImages(int images) {
        this.images = images;
    }

    public List<ColectieItem> getItems() {
        return items;
    }

    public void setItems(List<ColectieItem> items) {
        this.items = items;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getBaseItemsUrl() {
        return baseItemsUrl;
    }

    public void setBaseItemsUrl(String baseItemsUrl) {
        this.baseItemsUrl = baseItemsUrl;
    }
}
