package com.gztjj.model;



/**
 * EachEconomicIndicator entity. @author MyEclipse Persistence Tools
 */

public class EachEconomicIndicator  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String place;
     private String yearmonth;
     private Float scV;
     private Float scP;
     private Float czV;
     private Float czP;
     private Float ggV;
     private Float ggP;
     private Float gmV;
     private Float gmP;
     private Float gdV;
     private Float gdP;
     private Float xeV;
     private Float xeP;
     private Float sjV;
     private Float sjP;
     private Float ckV;
     private Float ckP;
     private int seqNo;


    // Constructors

    public int getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}


	/** default constructor */
    public EachEconomicIndicator() {
    }

    
    /** full constructor */
    public EachEconomicIndicator(String place, String yearmonth, Float scV, Float scP, Float czV, Float czP, Float ggV, Float ggP, Float gmV, Float gmP, Float gdV, Float gdP, Float xeV, Float xeP, Float sjV, Float sjP, Float ckV, Float ckP) {
        this.place = place;
        this.yearmonth = yearmonth;
        this.scV = scV;
        this.scP = scP;
        this.czV = czV;
        this.czP = czP;
        this.ggV = ggV;
        this.ggP = ggP;
        this.gmV = gmV;
        this.gmP = gmP;
        this.gdV = gdV;
        this.gdP = gdP;
        this.xeV = xeV;
        this.xeP = xeP;
        this.sjV = sjV;
        this.sjP = sjP;
        this.ckV = ckV;
        this.ckP = ckP;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlace() {
        return this.place;
    }
    
    public void setPlace(String place) {
        this.place = place;
    }

    public String getYearmonth() {
        return this.yearmonth;
    }
    
    public void setYearmonth(String yearmonth) {
        this.yearmonth = yearmonth;
    }

    public Float getScV() {
        return this.scV;
    }
    
    public void setScV(Float scV) {
        this.scV = scV;
    }

    public Float getScP() {
        return this.scP;
    }
    
    public void setScP(Float scP) {
        this.scP = scP;
    }

    public Float getCzV() {
        return this.czV;
    }
    
    public void setCzV(Float czV) {
        this.czV = czV;
    }

    public Float getCzP() {
        return this.czP;
    }
    
    public void setCzP(Float czP) {
        this.czP = czP;
    }

    public Float getGgV() {
        return this.ggV;
    }
    
    public void setGgV(Float ggV) {
        this.ggV = ggV;
    }

    public Float getGgP() {
        return this.ggP;
    }
    
    public void setGgP(Float ggP) {
        this.ggP = ggP;
    }

    public Float getGmV() {
        return this.gmV;
    }
    
    public void setGmV(Float gmV) {
        this.gmV = gmV;
    }

    public Float getGmP() {
        return this.gmP;
    }
    
    public void setGmP(Float gmP) {
        this.gmP = gmP;
    }

    public Float getGdV() {
        return this.gdV;
    }
    
    public void setGdV(Float gdV) {
        this.gdV = gdV;
    }

    public Float getGdP() {
        return this.gdP;
    }
    
    public void setGdP(Float gdP) {
        this.gdP = gdP;
    }

    public Float getXeV() {
        return this.xeV;
    }
    
    public void setXeV(Float xeV) {
        this.xeV = xeV;
    }

    public Float getXeP() {
        return this.xeP;
    }
    
    public void setXeP(Float xeP) {
        this.xeP = xeP;
    }

    public Float getSjV() {
        return this.sjV;
    }
    
    public void setSjV(Float sjV) {
        this.sjV = sjV;
    }

    public Float getSjP() {
        return this.sjP;
    }
    
    public void setSjP(Float sjP) {
        this.sjP = sjP;
    }

    public Float getCkV() {
        return this.ckV;
    }
    
    public void setCkV(Float ckV) {
        this.ckV = ckV;
    }

    public Float getCkP() {
        return this.ckP;
    }
    
    public void setCkP(Float ckP) {
        this.ckP = ckP;
    }

}