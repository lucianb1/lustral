package ro.lustral.controller;

import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Luci on 27-Dec-16.
 */
@RestController
public class AdminController {

//    @Autowired
//    private ParchetService parchetService;

//    @RequestMapping(method = RequestMethod.GET, value = "/admin/excel")
//    public void loadExcelData() throws IOException {
//        FileInputStream file = new FileInputStream(new File("F:\\lustral\\egger\\egger.xlsx"));
//
//        XSSFWorkbook workbook = new XSSFWorkbook(file);
//
//        XSSFSheet sheet = workbook.getSheetAt(0);
//
//        Iterator<Row> rowIterator = sheet.iterator();
//        rowIterator.next();
//        rowIterator.forEachRemaining(row -> {
//            String name = row.getCell(0).getStringCellValue();
//            String description = row.getCell(1).getStringCellValue();
//            String wood = row.getCell(2).getStringCellValue();
//            int width = (int) row.getCell(3).getNumericCellValue();
//            int clazz = (int) row.getCell(4).getNumericCellValue();
//            int images = (int) row.getCell(5).getNumericCellValue();
//            String[] split = row.getCell(6).getStringCellValue().replaceAll(" ", "").split("x");
//            String size = split[0].substring(0, split[0].length() - 1) + " x " + split[1].substring(0, split[1].length() - 1);
//            Integer garantie = row.getCell(7) == null ? null : (int) row.getCell(7).getNumericCellValue();
//            String profile = "UNI fit!";
////            System.out.println(name + " " + description + " " + wood + " " + width + " " + clazz + " " + images + " " + size + " " + garantie);
//            parchetService.saveParchet(name, description, 0, null, "1-2 zile", wood, garantie, width, clazz, images, profile, size, "EGGER", "HDF", 0);
//        });
//    }

}
