package kr.or.ddit.vo;
import java.io.Serializable;

import kr.or.ddit.enumpkg.OperatorType;

/**
 * 사칙 연산 서비스의 Model 
 *
 */
public class CalculatorVO implements Serializable{ //마커 인터페이스 => 표시하겠다는 의미 
	
	
	public CalculatorVO() {
		super();
	}

	public CalculatorVO(double leftOp, double rightOp, OperatorType operatorType) {
		super();
		this.leftOp = leftOp;
		this.rightOp = rightOp;
		this.operatorType = operatorType;
	}

	private double leftOp;
	private double rightOp;
	private OperatorType operatorType;
	public double getLeftOp() {
		return leftOp;
	}
	public void setLeftOp(double leftOp) {
		this.leftOp = leftOp;
	}
	public double getRightOp() {
		return rightOp;
	}
	public void setRightOp(double rightOp) {
		this.rightOp = rightOp;
	}
	public OperatorType getOperatorType() {
		return operatorType;
	}
	public void setOperatorType(OperatorType operatorType) {
		this.operatorType = operatorType;
	}
	public double getResult() {
		return operatorType.operate(leftOp, rightOp);
	}
	public String getExpression() { //Type에서 가져온 것들로 해야하기 때문에 Type으로 넘겨주기
		return operatorType.getExpression(leftOp, rightOp);
	}
	
	@Override
	public String toString() {
		return "CalculatorVO [leftOp=" + leftOp + ", rightOp=" + rightOp + ", operatorType=" + operatorType + "]";
	}
	
}
