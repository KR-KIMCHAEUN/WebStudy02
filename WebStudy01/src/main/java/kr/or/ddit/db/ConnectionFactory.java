package kr.or.ddit.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;

/**
 * Factory Object[Method] Pattern
 * 	: 객체의 생성을 전담하는 객체를 별도로 운영하는 구조. 
 *
 */
public class ConnectionFactory {
	private static String url;
	private static String user;
	private static String password;
	private static DataSource dataSource;

	static {
		ResourceBundle dbInfo = ResourceBundle.getBundle("kr.or.ddit.db.dbInfo");
		url = dbInfo.getString("url");
		user = dbInfo.getString("user");
		password = dbInfo.getString("password");
		
		BasicDataSource bds = new BasicDataSource();
		dataSource = bds;
		
		bds.setDriverClassName(dbInfo.getString("driverClassName"));
		bds.setUrl(url);
		bds.setUsername(user);
		bds.setPassword(password);
		bds.setInitialSize(Integer.parseInt(dbInfo.getString("initialSize")));
		bds.setMaxWaitMillis(Long.parseLong(dbInfo.getString("maxWait")));
		bds.setMaxTotal(Integer.parseInt(dbInfo.getString("maxTotal")));
		bds.setMaxIdle(Integer.parseInt(dbInfo.getString("maxIdle")));
		
//		try {
//			Class.forName(dbInfo.getString("driverClassName"));
//		} catch (ClassNotFoundException e) {
//			throw new RuntimeException(e);
//		}
	}
	
	public static Connection getConnection() throws SQLException{
//		  Connection conn = DriverManager.getConnection(url, user, password);
		  Connection conn = dataSource.getConnection();
		  return conn;
	}
}
