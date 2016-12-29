package ro.lustral.core.request;

import ro.lustral.core.ParchetProducer;
import ro.lustral.core.ParchetTrafficClass;

/**
 * Created by Luci on 29-Dec-16.
 */
public class ParchetDetailsJsonResponse {

    private int id;
    private String name;
    private Float price;
    private Float oldPrice;
    private boolean hasDiscount;
    private String woodType;
    private ParchetProducer producer;
    private ParchetTrafficClass trafficClass;
    private int width;
    private String size;
    private String joinType;
    private String material;
    private String otherCaracteristics;
    private int warranty;
    private String certificate;
    private String country;

}
