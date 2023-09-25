import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@WebServlet(name = "areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter pw = response.getWriter();
        pw.println("<html>");
        pw.println("<body>");
        pw.println("<h2>This is GET in AreaCheck</h2>");
        pw.println("</body>");
        pw.println("</html>");
        pw.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        long startTime = System.nanoTime();

        Validator validator = new Validator();

        String strX = request.getParameter("x");
        String strY = request.getParameter("y");
        String strR = request.getParameter("r");
        String result;

        if (validator.tryParseCoordinates(strX, strY, strR)) {
            double x = Double.parseDouble(strX);
            double y = Double.parseDouble(strY);
            double r = Double.parseDouble(strR);
            if (calculate(x, y, r)) result = "Hit";
            else result = "Miss";
        } else {
            strX = "";
            strY = "";
            strR = "";
            result = "Invalid args";
        }

        double execTime = (System.nanoTime() - startTime) / 1_000_000.0;

        ResponseObject responseObject = new ResponseObject(result, strX, strY, strR,
                getDecimalFormatter().format(execTime) + "ms", getCurrentTime());

        Gson gson = new Gson();
        String responseJSON = gson.toJson(responseObject);

        response.setContentType("application/json");
        PrintWriter pw = response.getWriter();
        pw.println(responseJSON);
        pw.close();
    }

    private boolean calculate(double x, double y, double r) {
        if (x >= 0) {
            return y <= 0 && y >= x - r / 2;
        } else {
            if (y >= 0) {
                return (x * x + y * y) <= (r * r / 4);
            } else {
                return x >= -r && y >= -r;
            }
        }
    }

    private String getCurrentTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    private DecimalFormat getDecimalFormatter() {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setDecimalSeparator('.');
        return new DecimalFormat("#0.000", symbols);
    }
}
