package com.gztjj.model;



/**
 * DemeanourImage entity. @author MyEclipse Persistence Tools
 */

public class DemeanourImage  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String imageDescribe;
     private String imagePath;
     private Integer category;
     private int articleId;
     private String subjectID;
     private String subjectName;
     
     public String getSubjectID() {
		return subjectID;
	}


	public void setSubjectID(String subjectID) {
		this.subjectID = subjectID;
	}


	public String getSubjectName() {
		return subjectName;
	}


	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	


    // Constructors

    public int getArticleId() {
		return articleId;
	}


	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}


	/** default constructor */
    public DemeanourImage() {
    }

    
    /** full constructor */
    public DemeanourImage(String imageDescribe, String imagePath, Integer category) {
        this.imageDescribe = imageDescribe;
        this.imagePath = imagePath;
        this.category = category;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getImageDescribe() {
        return this.imageDescribe;
    }
    
    public void setImageDescribe(String imageDescribe) {
        this.imageDescribe = imageDescribe;
    }

    public String getImagePath() {
        return this.imagePath;
    }
    
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Integer getCategory() {
        return this.category;
    }
    
    public void setCategory(Integer category) {
        this.category = category;
    }
   








}