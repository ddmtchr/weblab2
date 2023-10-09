package servlets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*")
public class LoggingFilter implements Filter {
    private static final Logger logger = LogManager.getLogger(LoggingFilter.class);

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        logger.info("Received request from " + servletRequest.getRemoteAddr() + ": " + servletRequest);
        filterChain.doFilter(servletRequest, servletResponse);
        logger.info("Response status: " + ((HttpServletResponse)servletResponse).getStatus());
    }

    @Override
    public void destroy() {
    }

}
