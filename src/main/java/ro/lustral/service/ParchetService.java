package ro.lustral.service;

import ro.lustral.core.request.FindParchetRequest;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
public interface ParchetService {

    List<Parchet> getAll();

    List<Parchet> findParchet(FindParchetRequest request);

    ParchetDetails getDetails(int id);

    void saveParchet(String name, String description, float price, Float oldPrice, String delivery, String wood, Integer warranty, int width, int trafficClass, int images, String grip, String size, String producer, String material, int orderNr);

}
