package servlets;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebFilter("/*")
public class NotFoundFilter implements Filter {
    private final List<String> addresses = new ArrayList<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        addresses.add("/weblab2/");
        addresses.add("/weblab2/resources/ipaddress.jpg");
        addresses.add("/weblab2/resources/duck.png");
        addresses.add("/weblab2/resources/bg-dark.jpg");
        addresses.add("/weblab2/resources/bg-light.jpg");
        addresses.add("/weblab2/resources/bg-photo.jpg");
        addresses.add("/weblab2/resources/bg-photo-crop.jpg");
        addresses.add("/weblab2/assets/css/style.css");
        addresses.add("/weblab2/assets/css/styleNotFound.css");
        addresses.add("/weblab2/assets/js/script.js");
        addresses.add("/weblab2/assets/js/Drawer.js");
        addresses.add("/weblab2/notfound.html");
        addresses.add("/weblab2/controllerServlet");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String uri = ((HttpServletRequest)servletRequest).getRequestURI();
        System.out.println(uri);
        if (!addresses.contains(uri))
            ((HttpServletResponse)servletResponse).sendRedirect("/weblab2/notfound.html");
        else
            filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
    }

}
