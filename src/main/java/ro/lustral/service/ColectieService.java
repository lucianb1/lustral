package ro.lustral.service;

import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieDetailsJsonResponse;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
public interface ColectieService {

    List<Colectie> getAll();

    ColectieDetailsJsonResponse getDetails(int id);
}
