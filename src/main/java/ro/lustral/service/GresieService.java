package ro.lustral.service;

import ro.lustral.core.request.FindGresieRequest;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.model.colectie.ColectieDetailsJsonResponse;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
public interface GresieService {

    List<Colectie> getAll();

    ColectieDetailsJsonResponse getDetails(int id);

    List<Colectie> findColectii(FindGresieRequest request);
}
