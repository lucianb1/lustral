package ro.lustral.core.request;

import org.springframework.util.CollectionUtils;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Luci on 04-Jan-17.
 */
public class FindParchetRequest {

    //TODO validation

    private Integer sort;
    private List<Integer> widths;
    private List<Integer> classes;
    private List<String> producers;

    @NotNull
    private Integer page;

    private String name;


    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public List<Integer> getWidths() {
        return widths;
    }

    public void setWidths(List<Integer> widths) {
        this.widths = widths;
    }

    public List<String> getProducers() {
        return producers;
    }

    public void setProducers(List<String> producers) {
        this.producers = producers;
    }

    public List<Integer> getClasses() {
        return classes;
    }

    public void setClasses(List<Integer> classes) {
        this.classes = classes;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPage() {
        return page;
    }

    public boolean isDefault() {
        return name == null && sort == null && CollectionUtils.isEmpty(widths) && CollectionUtils.isEmpty(classes) && CollectionUtils.isEmpty(producers);
    }

    public String toString() {
        return new StringBuilder("{")
                .append(" page: " + page)
                .append(", code: " + name)
                .append(", sort: " + sort)
                .append(", producers: " + producers)
                .append(", widths: " + widths)
                .append(", classes: " + classes)
                .toString();
    }
}
