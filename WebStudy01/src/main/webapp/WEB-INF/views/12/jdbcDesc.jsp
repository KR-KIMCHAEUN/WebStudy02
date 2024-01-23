<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="kr.or.ddit.vo.PropertyVO"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<h4>JDBC (Java DataBase Connectivity)</h4>

<pre>
   1. 드라이버를 빌드패스(classpath)에 추가
   2. 드라이버 로딩(driver class loading, 버추얼머신에 드라이버의 존재 알림)
   3. 드라이버를 통해 Connection 수립
   4. 쿼리 객체(statement)
      - Statement
      - PreparedStatement : 미리 컴파일된 Statement
      - CallableStatement : 프로시져, 펑션(명령문의 집합)을 호출해서 사용할 수 있도록 하는 형태
   5. 쿼리 작성(DDL, DML, TCL), 실행
      DDL CAD Create Alter Drop
      DML IUD Insert Update Delete
      TCL CR Commit, Rollback
      - ResultSet executeQuery
      - int executeUpdate
   6. 실행 결과 집합의 사용 : cursor기반의 데이터(record, tuple)를 포인터를 통해 접근함
   
   사용한 모든 자원의 release.
</pre>
<%
	List<PropertyVO> propList = (List)request.getAttribute("propList");
%>
<table class="table table-bordered">
   <thead>
      <tr>
         <th>PROPERTY_NAME</th>      
         <th>PROPERTY_VALUE</th>      
         <th>PROPERTY_DESCRIPTION</th>      
      </tr>   
   </thead>
   <tbody>
      <tr>
      <%
         for(PropertyVO propVO : propList){
            out.println(String.format("<td>%s</td>", propVO.getPropertyName()));
            out.println(String.format("<td>%s</td>", propVO.getPropertyValue()));
            out.println(String.format("<td>%s</td>", propVO.getDescription()));
            out.println("</tr><tr>");
         }
      
      %>
      </tr>   
   </tbody>
</table>
<script>
	console.log($);
</script>