package com.gztjj.model;

/**
 * DishonestyNotice entity. @author MyEclipse Persistence Tools
 */

public class DishonestyNotice  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private Integer type;
     private String placeName;
     private String link;
     private int seqNo;


    // Constructors

    /** default constructor */
    public DishonestyNotice() {
    }

    public int getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
    
    /** full constructor */
    public DishonestyNotice(Integer type, String placeName, String link) {
        this.type = type;
        this.placeName = placeName;
        this.link = link;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return this.type;
    }
    
    public void setType(Integer type) {
        this.type = type;
    }

    public String getPlaceName() {
        return this.placeName;
    }
    
    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getLink() {
        return this.link;
    }
    
    public void setLink(String link) {
        this.link = link;
    }
   
}