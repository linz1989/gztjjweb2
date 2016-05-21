package com.gztjj.model;


/**
 * Subject entity. @author MyEclipse Persistence Tools
 */

public class Subject  implements java.io.Serializable {

    // Fields    

     private Integer id;
     private String subjectName;
     private String imagePath;
     private String isMain;
     private int sqeNo;
     private String isOutLink;
	private String outLink;

    // Constructors

    public int getSqeNo() {
		return sqeNo;
	}


	public void setSqeNo(int sqeNo) {
		this.sqeNo = sqeNo;
	}


	public String getIsMain() {
		return isMain;
	}

	public void setIsMain(String isMain) {
		this.isMain = isMain;
	}

	/** default constructor */
    public Subject() {
    }

    /** full constructor */
    public Subject(String subjectName, String imagePath,String isMain,String isOutLink,String outLink ) {
        this.subjectName = subjectName;
        this.imagePath = imagePath;
        this.isMain=isMain;
        this.isOutLink=isOutLink;
        this.outLink=outLink;
        
    }

    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubjectName() {
        return this.subjectName;
    }
    
    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getImagePath() {
        return this.imagePath;
    }
    
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    
    public String getIsOutLink() {
		return isOutLink;
	}

	public void setIsOutLink(String isOutLink) {
		this.isOutLink = isOutLink;
	}

	public String getOutLink() {
		return outLink;
	}

	public void setOutLink(String outLink) {
		this.outLink = outLink;
	}

}