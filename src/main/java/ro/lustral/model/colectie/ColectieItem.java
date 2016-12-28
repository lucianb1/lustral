package ro.lustral.model.colectie;

import ro.lustral.core.ColectieItemType;
import ro.lustral.core.ColectieUnit;
import ro.lustral.model.OrderedEntity;

/**
 * Created by Luci on 27-Dec-16.
 */
public class ColectieItem extends OrderedEntity {

    private int id;
    private int colectieID;
    private String colectieName; // for speed
    private ColectieUnit unit;
    private ColectieItemType type;
    private Float price;
    private boolean isPorcelain;


}
