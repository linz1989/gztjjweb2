package com.gztjj.model;
// default package



/**
 * GanzhouInfo entity. @author MyEclipse Persistence Tools
 */

public class GanzhouInfo  implements java.io.Serializable {


    // Fields    
	private String place;
     private String placePy;
     private String placeLink;
    


    // Constructors

    /** default constructor */
    public GanzhouInfo() {
    }

	/** minimal constructor */
    public GanzhouInfo(String place) {
        this.place = place;
    }
    
    /** full constructor */
    public GanzhouInfo(String place, String placePy, String placeLink) {
        this.place = place;
        this.placePy = placePy;
        this.placeLink = placeLink;
    }

    // Property accessors

    public String getPlace() {
        return this.place;
    }
    
    public void setPlace(String place) {
        this.place = place;
    }

    public String getPlacePy() {
        return this.placePy;
    }
    
    public void setPlacePy(String placePy) {
        this.placePy = placePy;
    }

    public String getPlaceLink() {
        return this.placeLink;
    }
    
    public void setPlaceLink(String placeLink) {
        this.placeLink = placeLink;
    }

}