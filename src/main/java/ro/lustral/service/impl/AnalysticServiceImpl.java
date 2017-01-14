package ro.lustral.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ro.lustral.model.analystic.AnalysticData;
import ro.lustral.repository.AnalyticsRepository;
import ro.lustral.service.AnalysticService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

/**
 * Created by Luci on 28-Dec-16.
 */
@Service
public class AnalysticServiceImpl implements AnalysticService{

    @Autowired
    private AnalyticsRepository repository;

    @Async("analyticsExecutor")
    @Override
    public void updatePageRequest(String page) {
        AnalysticData lastRequest = repository.getLastRequestForPage(page);
        if (lastRequest != null) {
            Date newDate = new Date(lastRequest.getDate().getTime());
            LocalDate date = newDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate now = LocalDate.now();
            if (date.equals(now)) {
                repository.increment(lastRequest.getId());
            } else {
                insertNew(page);
            }
        } else {
            insertNew(page);
        }
    }

    private void insertNew(String pageName) {
        repository.insertNew(pageName);
    }

}
