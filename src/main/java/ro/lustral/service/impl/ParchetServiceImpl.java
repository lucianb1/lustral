package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.model.parchet.Parchet;
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
}
