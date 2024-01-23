package kr.or.ddit.property.servlet09;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.property.service.PropertyService;
import kr.or.ddit.property.service.PropertyServiceImpl;
import kr.or.ddit.vo.PropertyVO;

@WebServlet("/12/jdbcDesc.do")
public class JdbcDescControllerServlet extends HttpServlet{
	private PropertyService service = new PropertyServiceImpl();
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		List<PropertyVO> propList=service.retrieveProperties();
		
		req.setAttribute("propList", propList);
		req.setAttribute("contentPage", "/WEB-INF/views/12/jdbcDesc.jsp"); //모델
		
		String veiw = "/WEB-INF/views/layout.jsp";
		req.getRequestDispatcher(veiw).forward(req, resp);
	}
}
