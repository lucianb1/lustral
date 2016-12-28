package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.lustral.model.colectie.Colectie;
import ro.lustral.repository.ColectieRepository;
import ro.lustral.service.ColectieService;

import java.util.List;

/**
 * Created by Luci on 27-Dec-16.
 */
@Service
public class ColectieServiceImpl implements ColectieService {

    @Autowired
    private ColectieRepository repository;

    @Override
    public List<Colectie> getAll() {
        return repository.getAll();
    }

}
