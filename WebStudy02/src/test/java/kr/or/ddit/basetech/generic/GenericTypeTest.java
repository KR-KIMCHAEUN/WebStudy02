package kr.or.ddit.basetech.generic;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import kr.or.ddit.basetech.generic.material.Child;
import kr.or.ddit.basetech.generic.material.ExtendedHouse;
import kr.or.ddit.basetech.generic.material.GrandParent;
import kr.or.ddit.basetech.generic.material.Parent;
import kr.or.ddit.basetech.generic.material.SampleHouse;

class GenericTypeTest {

	@Test
	void test1() {
		SampleHouse<Child, Parent> house = new SampleHouse<>();
		Child person = new Child();
		house.setPerson(person);
		Parent p = house.casting1();
	}
	
	@Test
	void test2() {
		ExtendedHouse house = new ExtendedHouse();
		Parent p = house.casting2(Parent.class);
		GrandParent gp = house.casting2(GrandParent.class);
	}
	
	@Test
	void test() {
		GrandParent gp = ExtendedHouse.casting3(new Child(), GrandParent.class);
		Parent p = ExtendedHouse.casting3(gp, Parent.class);
	}

}
