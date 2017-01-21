package ro.lustral.core.request;

import javax.validation.constraints.NotNull;

/**
 * Created by Luci on 13-Jan-17.
 */
public class FindGresieRequest {

    private String name;

    @NotNull
    private MaterialFilter materialFilter;

    @NotNull
    private RoomFilter roomFilter;

    @NotNull
    private DesignFilter designFilter;

    private Integer sort;

    @NotNull
    private Integer page;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSort() {
        return sort;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public MaterialFilter getMaterialFilter() {
        return materialFilter;
    }

    public RoomFilter getRoomFilter() {
        return roomFilter;
    }

    public DesignFilter getDesignFilter() {
        return designFilter;
    }

    public boolean isDefault() {
        return name == null && sort == null && !materialFilter.isSet() && !designFilter.isSet() && !roomFilter.isSet();
    }

    public String toString() {
        return new StringBuilder("{")
                .append("page: " + page)
                .append(", sort: " + sort)
                .append(", name: " + name)
                .append(", roomFilter: " + roomFilter.toString())
                .append(", materialFilter: " + materialFilter.toString())
                .append(", designFilter: " + designFilter.toString())
                .append("}")
                .toString();
    }

    public class MaterialFilter {

        private boolean isPorcelain;
        private boolean isRectificat;
        private boolean isSet;

        public boolean isPorcelain() {
            return isPorcelain;
        }

        public void setIsPorcelain(boolean porcelain) {
            isPorcelain = porcelain;
            isSet = true;
        }

        public boolean isRectificat() {
            return isRectificat;
        }

        public void setIsRectificat(boolean rectificat) {
            isRectificat = rectificat;
            isSet = true;
        }

        public boolean isSet() {
            return isSet;
        }
        public String toString() {
            StringBuilder builder = new StringBuilder("{");
            builder.append("isSet: " + isSet());
            builder.append("}");
            return builder.toString();
        }
    }

    public class DesignFilter {
        private boolean isSet;
        private boolean wood;
        private boolean stone;
        private boolean isFlowers;
        private boolean isPatchwork;

        public boolean isWood() {
            return wood;
        }

        public void setWood(boolean wood) {
            this.wood = wood;
            isSet = true;
        }

        public boolean isFlowers() {
            return isFlowers;
        }

        public void setFlowers(boolean flowers) {
            isFlowers = flowers;
            isSet = true;
        }

        public boolean isPatchwork() {
            return isPatchwork;
        }

        public void setPatchwork(boolean patchwork) {
            isPatchwork = patchwork;
            isSet = true;
        }

        public boolean isStone() {
            return stone;
        }

        public void setStone(boolean stone) {
            this.stone = stone;
            isSet = true;
        }

        public boolean isSet() {
            return isSet;
        }

        public String toString() {
            StringBuilder builder = new StringBuilder("{");
            builder.append("isSet: " + isSet());
            builder.append("}");
            return builder.toString();
        }
    }

    public class RoomFilter {
        private boolean forBath;
        private boolean forLiving;
        private boolean forKitchen;
        private boolean forExterior;
        private boolean isSet;


        public boolean isForBath() {
            return forBath;
        }

        public void setForBath(boolean forBath) {
            this.forBath = forBath;
            isSet = true;
        }

        public boolean isForLiving() {
            return forLiving;
        }

        public void setForLiving(boolean forLiving) {
            this.forLiving = forLiving;
            isSet = true;
        }

        public boolean isForKitchen() {
            return forKitchen;
        }

        public void setForKitchen(boolean forKitchen) {
            this.forKitchen = forKitchen;
            isSet = true;
        }

        public boolean isForExterior() {
            return forExterior;
        }

        public void setForExterior(boolean forExterior) {
            this.forExterior = forExterior;
            isSet = true;
        }

        public boolean isSet() {
            return isSet;
        }

        public String toString() {
            StringBuilder builder = new StringBuilder("{");
            builder.append("isSet: " + isSet());
            builder.append("}");
            return builder.toString();
        }
    }

}
