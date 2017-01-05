package ro.lustral.core.request;

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
}
