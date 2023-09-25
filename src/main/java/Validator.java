import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Validator {
    private final List<Double> Rlist = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);

    public boolean tryParseCoordinates(String strX, String strY, String strR) {
        try {
            Double x = parseX(strX);
            Double y = parseY(strY);
            Double r = parseR(strR);
            return true;
        } catch (NumberFormatException | OutOfRangeException | NullPointerException e) {
            return false;
        }
    }

    private Double parseX(String strX) throws NumberFormatException {
//        try {
            double x = Double.parseDouble(strX);
            if (-5 < x && x < 3) return x;
            throw new OutOfRangeException("X is out of range");
//        } catch (NumberFormatException e) {
//            return null;
//        }
    }

    private Double parseY(String strY) throws NumberFormatException {
//        try {
            double y = Double.parseDouble(strY);
            if (-4 <= y && y <= 4) return y;
            throw new OutOfRangeException("Y is out of range");
//        } catch (NumberFormatException e) {
//            return null;
//        }
    }

    private Double parseR(String strR) throws NumberFormatException, OutOfRangeException {
//        try {
            double r = Double.parseDouble(strR);
            if (Rlist.contains(r)) return r;
            throw new OutOfRangeException("R is out of range");
//        } catch (NumberFormatException e) {
//            return null;
//        }
    }

}
