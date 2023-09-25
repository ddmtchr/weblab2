import java.util.Arrays;
import java.util.List;

public class Validator {
    private final List<Double> Rlist = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);

    public boolean tryParseCoordinates(String strX, String strY, String strR) {
        try {
            parseX(strX);
            parseY(strY);
            parseR(strR);
            return true;
        } catch (NumberFormatException | OutOfRangeException | NullPointerException e) {
            return false;
        }
    }

    private void parseX(String strX) throws NumberFormatException {
        double x = Double.parseDouble(strX);
        if (!(-5 < x && x < 3)) throw new OutOfRangeException("X is out of range");
    }

    private void parseY(String strY) throws NumberFormatException {
        double y = Double.parseDouble(strY);
        if (!(-4 <= y && y <= 4)) throw new OutOfRangeException("Y is out of range");
    }

    private void parseR(String strR) throws NumberFormatException, OutOfRangeException {
        double r = Double.parseDouble(strR);
        if (!(Rlist.contains(r))) throw new OutOfRangeException("R is out of range");
    }

}
