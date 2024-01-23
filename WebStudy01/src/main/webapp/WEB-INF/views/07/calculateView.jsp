<%@page import="kr.or.ddit.vo.CalculatorVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	CalculatorVO calVO =(CalculatorVO)request.getAttribute("calculator"); //출력할 데이터를 가져오기 위한 작업
%>
<h4><%=calVO.getExpression()%></h4>
</body>
</html>