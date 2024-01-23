package kr.or.ddit.common.exception;

public class PKNotFoundException extends RuntimeException{
	private int status;
	
	public PKNotFoundException(String message) { //기본 생성자 사용시 500에러
		this(500, message);
	}

	public PKNotFoundException(int status, String message) {
		super(message);
		this.status = status;
	}
	
	public int getStatus() {
		return status;
	}
	
}
