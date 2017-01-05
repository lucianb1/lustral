package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.core.request.FindParchetRequest;
import ro.lustral.model.parchet.Parchet;
import ro.lustral.model.parchet.ParchetDetails;
import ro.lustral.repository.ParchetRepository;
import ro.lustral.service.ParchetService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Service
public class ParchetServiceImpl implements ParchetService {

    @Autowired
    private ParchetRepository parchetRepository;

    @Override
    public List<Parchet> getAll() {
        return parchetRepository.getAll();
    }

    @Override
    public List<Parchet> findParchet(FindParchetRequest request) {
        return parchetRepository.findParchet(request.getProducers(), request.getWidths(), request.getClasses(), request.getSort(), request.getPage(), request.getName());
    }

    @Override
    public ParchetDetails getDetails(int id) {
        return parchetRepository.getParchetDetails(id);
    }
}
