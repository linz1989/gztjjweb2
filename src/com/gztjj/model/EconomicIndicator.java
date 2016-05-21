package com.gztjj.model;



/**
 * EconomicIndicator entity. @author MyEclipse Persistence Tools
 */

public class EconomicIndicator  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String place;
	 private String yearmonth;
     private String indicator;
     private String unit;
     private String indicatorValue;
     private String indicatorGrowth;
     private int seqNo;


    // Constructors
     
     public String getPlace() {
 		return place;
 	}


 	public void setPlace(String place) {
 		this.place = place;
 	}

    public int getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}


	/** default constructor */
    public EconomicIndicator() {
    }

    
    /** full constructor */
    public EconomicIndicator(String place, String yearmonth, String indicator, String unit, String indicatorValue, String indicatorGrowth) {
        this.place=place;
    	this.yearmonth = yearmonth;
        this.indicator = indicator;
        this.unit = unit;
        this.indicatorValue = indicatorValue;
        this.indicatorGrowth = indicatorGrowth;
    }
    
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getYearmonth() {
        return this.yearmonth;
    }
    
    public void setYearmonth(String yearmonth) {
        this.yearmonth = yearmonth;
    }

    public String getIndicator() {
        return this.indicator;
    }
    
    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public String getUnit() {
        return this.unit;
    }
    
    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getIndicatorValue() {
        return this.indicatorValue;
    }
    
    public void setIndicatorValue(String indicatorValue) {
        this.indicatorValue = indicatorValue;
    }

    public String getIndicatorGrowth() {
        return this.indicatorGrowth;
    }
    
    public void setIndicatorGrowth(String indicatorGrowth) {
        this.indicatorGrowth = indicatorGrowth;
    }
} 