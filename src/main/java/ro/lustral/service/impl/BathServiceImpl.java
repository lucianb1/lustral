package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.model.Bath;
import ro.lustral.repository.BathRepository;
import ro.lustral.service.BathService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Service
public class BathServiceImpl implements BathService {

    @Autowired
    private BathRepository bathRepository;

    @Override
    public List<Bath> getAll() {
        return  bathRepository.getAllOrdered();
    }

}
