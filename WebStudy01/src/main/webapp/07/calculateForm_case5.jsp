<%@page import="java.util.stream.Collectors"%>
<%@page import="kr.or.ddit.enumpkg.OperatorType"%>
<%@page import="java.util.stream.Stream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="<%=request.getContextPath() %>/resources/js/app/07/calculateForm_case5.js?<%=System.currentTimeMillis()%>"></script>
</head>
<body>
<h4>JSON content를 전송하고, JSON content를 수신.</h4>
<form id="calForm" method="post" enctype="application/x-www-form-urlencoded" action="<%=request.getContextPath() %>/07/case5/calculator.do">
	<input type="number" name="left" placeholder="좌측피연산자"/>
	<select name="operator">
		<%=
			Stream.of(OperatorType.values())
				  .map(o->String.format("<option value='%s' label='%c'/>",o.name(),o.getSign()))
				  .collect(Collectors.joining("\n")) //OperatorType.values()를 통해 가져온 데이터들을 map형식으로 만들어준 뒤 collect로 다시 모아서 표현해주기
				  
		%>	
	</select>
	<input type="number" name="right" placeholder="우측피연산자"/>
	<button type="submit">=</button>
</form>
<div id="resultArea"></div>
</body>
</html>