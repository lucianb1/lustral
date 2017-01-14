package ro.lustral.model.analystic;

import java.util.Date;

/**
 * Created by Luci on 14-Jan-17.
 */
public class AnalysticData {

    private int id;
    private String page;
    private Date date;
    private int count;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
