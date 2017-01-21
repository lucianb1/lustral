package ro.lustral.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import ro.lustral.core.constants.ImageConstants;

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
        registry.addResourceHandler("/images/**").addResourceLocations(ImageConstants.BASE_LOCATION).setCachePeriod(1000);
//        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

    @Bean(name = "jdbcExecutor")
    public ExecutorService getJdbcExecutor() {
        return Executors.newFixedThreadPool(5);
    }
}
//
//    public static void main(String[] args) throws IOException {
//        File file = new File("F:\\lustral_images\\lustral\\colectii");
//        for (File folder : file.listFiles()) {
//            if (folder.isDirectory()) {
//                for (File image : folder.listFiles()) {
//                    if (image.isDirectory()) {
//                        for (File item : image.listFiles()) {
//                            minimizeImage(item);
//                        }
//                    } else {
//                        minimizeImage(image);
//                    }
//
//                }
//            } else {
//                minimizeImage(folder);
//            }
//
//        }
//    }
////
//    private static void minimizeImage(File file) throws IOException {
//        int max = 0;
//        BufferedImage imageBuff = null;
//
//        try {
//            imageBuff = ImageIO.read(file);
//            int width = imageBuff.getWidth();
//            int height = imageBuff.getHeight();
//            max = Math.max(width, height);
//            Thumbnails.of(file)
//                    .size(max, max)
//                    .outputFormat("jpg")
//                    .toFiles(Rename.NO_CHANGE);
//        } catch (Exception e) {
//            System.out.println(e);
//            System.out.println(file.getAbsolutePath());
////            throw new RuntimeException();
//        }


//    }

//    public static void main(String[] args) throws IOException {
//        for (int i = 0; i < 200; i++) {
//            File file = new File("F:\\lustral_images\\gresii_noi/a.jpg");
//            Thumbnails.of(file).size(1000, 1000).outputFormat("jpg").toFiles(Rename.NO_CHANGE);
//        }
//    }


//}
