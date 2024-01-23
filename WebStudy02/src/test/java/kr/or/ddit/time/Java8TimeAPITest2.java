package kr.or.ddit.time;

import static org.junit.jupiter.api.Assertions.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.format.TextStyle;
import java.time.temporal.WeekFields;
import java.util.Arrays;
import java.util.Locale;
import java.util.stream.Stream;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class Java8TimeAPITest2 {

	@Test
	@Order(2)
	void test1() {
		System.out.println(LocalDateTime.now(ZoneId.of("America/Los_Angeles")));
		System.out.println(LocalDate.from(LocalDateTime.now(ZoneId.of("America/Los_Angeles"))));
		System.out.println(YearMonth.from(LocalDate.from(LocalDateTime.now(ZoneId.of("America/Los_Angeles")))));
		System.out.println(Year.from(YearMonth.from(LocalDate.from(LocalDateTime.now(ZoneId.of("America/Los_Angeles"))))));
	}
	
	@Test
	@Order(1)
	void test2() {
		LocalDateTime current=LocalDateTime.now();
		System.out.println(LocalDate.from(current).format(DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).withLocale(Locale.CANADA_FRENCH)));
		System.out.println(YearMonth.from(current));
		System.out.println(Year.from(current));
	}
	
	@Test
	void test3() {
		System.out.println(YearMonth.of(2023, 1).format(DateTimeFormatter.ofPattern("yyyy, MMMM").withLocale(Locale.ENGLISH)));
	}
	
	@Test
	void test4() {
		System.out.println(YearMonth.now().minusMonths(1));
		System.out.println(YearMonth.now().plusMonths(1));
	}
	
	@Test
	void test5() {
		LocalDate today = LocalDate.now();
		DayOfWeek dayOfWeek = today.getDayOfWeek();
		Locale locale = Locale.forLanguageTag(Locale.CANADA.toLanguageTag()); //랭귀지 태그 OR 로케일 태그 
		System.out.println(dayOfWeek.getDisplayName(TextStyle.FULL,locale));
		
		Stream.of(Locale.getAvailableLocales())
			.forEach(l->{
				System.out.println(dayOfWeek.getDisplayName(TextStyle.FULL,l));
			});
	}
	
	@Test
	void test6() {
		Stream.of(DayOfWeek.values())
			.forEach(d->{
				System.out.println(d.getDisplayName(TextStyle.FULL, Locale.ENGLISH));
			});
		
		System.out.println("-----------------------위에 내가 한 거 --  밑에 썜이 하신 거--------------------------");
		
		Arrays.stream(DayOfWeek.values()).forEach(dow->{
			System.out.println(dow.getDisplayName(TextStyle.FULL, Locale.GERMAN));
		});
	}
	
	
	@Test
	void test7() {
		Locale locale = Locale.KOREA;
		WeekFields weekfields=WeekFields.of(locale);
		DayOfWeek first = weekfields.getFirstDayOfWeek();
		for(int i=0; i<7; i++) {
			DayOfWeek tmp =first.plus(i);
			System.out.println(tmp.getDisplayName(TextStyle.FULL, locale));
		}
	}
}
