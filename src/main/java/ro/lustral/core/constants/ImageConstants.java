package ro.lustral.core.constants;

/**
 * Created by Luci on 28-Dec-16.
 */
public class ImageConstants {

    public static final String IMAGES_LOCATION = "//";
    public static final String PARCHET_IMAGE_LOCATION = "/images/parchet/";
    public static final String COLECTII_IMAGE_LOCATION = "/images/colectii/";
    public static final String COLECTII_SMALL_IMAGE_LOCATION = "/images/small/colectii/";
    public static final String BATH_IMAGE_LOCATION = "/images/cazi/";

        public static final String BASE_LOCATION = "file:F:/lustral_images/lustral/";
//    public static final String BASE_LOCATION = "file:/home/new/lustral/";

    public static final String MOBILIER_IMAGE_LOCATION = "/images/mobilier/";

//    public static void main(String[] args) throws IOException {
//        String location = "F:\\lustral_images\\lustral\\parchet";
//        File baseDirectory = new File(location);
//        for (File directory : baseDirectory.listFiles()) {
//            if (directory.isDirectory()) {
//                File jpg1 = get1Jgp(directory);
//                File newFile = new File(directory, "main.jpg");
//                Files.copy(new FileInputStream(jpg1), Paths.get(newFile.getAbsolutePath()));
//            }
//        }
//    }
//
//
//    private static File get1Jgp(File directory) {
//        for (File file : directory.listFiles()) {
//            if (file.getName().equals("1.jpg")) {
//                return file;
//            }
//        }
//        throw new RuntimeException();
//    }

}