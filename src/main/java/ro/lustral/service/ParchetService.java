package ro.lustral.service;

import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
public interface ParchetService {

    List<Parchet> getAll();

    ParchetDetails getDetails(int id);
}
