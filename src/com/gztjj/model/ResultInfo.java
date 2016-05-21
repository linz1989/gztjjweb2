package com.gztjj.model;

public class ResultInfo<T> {
	private String reusltMessage;
	private int statusCode;
	private T Data ;
	public String getReusltMessage() {
		return reusltMessage;
	}
	public void setReusltMessage(String reusltMessage) {
		this.reusltMessage = reusltMessage;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public T getData() {
		return Data;
	}
	public void setData(T data) {
		Data = data;
	}	
}