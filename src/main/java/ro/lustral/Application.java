package ro.lustral;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 * Created by Luci on 27-Dec-16.
 */
@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = {"ro.lustral"})
@EnableConfigurationProperties
@EnableAsync
public class Application extends SpringBootServletInitializer{

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean(name = "asyncExecutor")
    public TaskExecutor getAsyncTaskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setMaxPoolSize(1);
        taskExecutor.setCorePoolSize(1);
        taskExecutor.setThreadNamePrefix("mailSenderExecutor-");
        return taskExecutor;
    }


}
