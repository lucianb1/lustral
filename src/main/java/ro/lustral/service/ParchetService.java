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
}
