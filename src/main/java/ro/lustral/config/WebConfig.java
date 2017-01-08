package ro.lustral.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by Luci on 28-Dec-16.
 */
@Configuration
//@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

//    @Override
//    public void configureViewResolvers(ViewResolverRegistry registry) {
//        registry.order(1000);
//    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**").addResourceLocations("file:F:/lustral_images/lustral/");
//        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

    @Bean(name = "jdbcExecutor")
    public ExecutorService getJdbcExecutor() {
        return Executors.newFixedThreadPool(5);
    }

}
