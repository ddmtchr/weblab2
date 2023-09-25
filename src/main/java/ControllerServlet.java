import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/controllerServlet")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        response.sendRedirect(request.getContextPath() + "/index.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String argX = request.getParameter("x");
        String argY = request.getParameter("y");
        String argR = request.getParameter("r");

        if (argX != null && argY != null && argR != null) {
            getServletContext().getNamedDispatcher("areaCheckServlet").forward(request, response);
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }

    }
}
