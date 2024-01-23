package kr.or.ddit.servlet07;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.ddit.enumpkg.MediaType;
import kr.or.ddit.enumpkg.OperatorType;
import kr.or.ddit.vo.CalculatorVO;

@WebServlet("/07/case5/calculator.do")
public class Calculator_Case5 extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int status = validate(req);
		
		if(status==HttpServletResponse.SC_OK) {
			resp.setContentType(MediaType.APPLICATION_JSON_VALUE);
			CalculatorVO calVO = (CalculatorVO) req.getAttribute("calculator");
			try(
				PrintWriter writer = resp.getWriter();
					){
				new ObjectMapper().writeValue(writer, calVO);
			}
		}else {
			resp.sendError(status);
		}
	}

	private int validate(HttpServletRequest req) { //servlet에서 model을 만들어줄 내용ㅇㅣ 많기에 vo로 넘겨줘 servlet은 controller의 역할만 수행 
		int status = HttpServletResponse.SC_OK;
		
		try(
			InputStream is=req.getInputStream();
				) { //잘만든 try/catch문은 exception 처리 등을 통해 if문등의 조건문 역할 수행
			//역직렬화,언마샬링
			ObjectMapper objectMapper = new ObjectMapper();
			CalculatorVO calVO = objectMapper.readValue(is, CalculatorVO.class);
			
			req.setAttribute("calculator", calVO);
		}catch(Exception e) {
			status = HttpServletResponse.SC_BAD_REQUEST;
		}
		
		return status;
	}
}
