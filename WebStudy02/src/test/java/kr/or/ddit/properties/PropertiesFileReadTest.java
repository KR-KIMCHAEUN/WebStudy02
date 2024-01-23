package kr.or.ddit.properties;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Locale;
import java.util.Properties;
import java.util.ResourceBundle;

import org.junit.jupiter.api.Test;

import kr.or.ddit.servlet08.ServerTimeServlet;

class PropertiesFileReadTest { 

	@Test
	void test() throws URISyntaxException, IOException {//locale 처리가 안됨!
		Properties properties = new Properties();
		String logicalPath = "/kr/or/ddit/message/message-common.properties";
		URL realPath=ServerTimeServlet.class.getResource(logicalPath);
		File file = new File(realPath.toURI());
		try(
			FileInputStream fis = new FileInputStream(file);	
			){
			properties.load(fis);
			System.out.println(properties.size());
			properties.forEach((n,v)->{
				System.out.printf("%s : %s\n", n, v);
			});
			properties.setProperty("newProp", "newValue");
		}
	}
	
	@Test
	void testResourceBundle(){ //baseName에는 확장자명 포함 x, 맨앞에"/" 사용 x / locale 사용 x   //키를 메세지 코드라고 부름
		String baseName="kr/or/ddit/message/message-common";
		ResourceBundle bundle = ResourceBundle.getBundle(baseName, Locale.KOREAN); //변경 허용 X read only
		bundle.keySet().forEach(mc->{
			System.out.printf("%s : %s\n", mc, bundle.getString(mc));
		});
	}

}
