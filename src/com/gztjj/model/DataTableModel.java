package com.gztjj.model;

import java.util.ArrayList;

public class DataTableModel 
{
	private ArrayList data;
	private int draw;
	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	private int recordsTotal;
	private int recordsFiltered;

	public ArrayList getData() 
	{
		return data;
	}

	public void setData(ArrayList data) 
	{
		this.data = data;
	}

}