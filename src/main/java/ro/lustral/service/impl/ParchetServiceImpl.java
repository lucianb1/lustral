package ro.lustral.service.impl;

import org.apache.log4j.Logger;
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

    private static final Logger LOG = Logger.getLogger(ParchetService.class);

    @Autowired
    private ParchetRepository parchetRepository;

    @Override
    public List<Parchet> getAll() {
        return parchetRepository.getAll();
    }

    @Override
    public List<Parchet> findParchet(FindParchetRequest request) {
        LOG.info("Parchet filter: " + request.toString());
        return parchetRepository.findParchet(request.getProducers(), request.getWidths(), request.getClasses(), request.getSort(), request.getPage(), request.getName());
    }

    @Override
    public ParchetDetails getDetails(int id) {
        return parchetRepository.getParchetDetails(id);
    }

    @Override
    public void saveParchet(String name, String description, float price, Float oldPrice, String delivery, String wood, Integer warranty, int width, int trafficClass, int images, String grip, String size, String producer, String material, int orderNr) {
        parchetRepository.saveParchet(name, description, price, oldPrice, delivery, wood, warranty, width, trafficClass, images, grip, size, producer, material, orderNr);
    }
}
