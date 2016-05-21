package com.gztjj.model;
// default package



/**
 * ExamScore entity. @author MyEclipse Persistence Tools
 */

public class ExamScore  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String name;
     private String examYearMonth;
     private String idCardNumber;
     private String examCardNumber;
     private String amScore;
     private String pmScore;
     private int seqNo;

    // Constructors

    public int getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}


	/** default constructor */
    public ExamScore() {
    }

    
    /** full constructor */
    public ExamScore(String name, String examYearMonth, String idCardNumber, String examCardNumber, String amScore, String pmScore) {
        this.name = name;
        this.examYearMonth = examYearMonth;
        this.idCardNumber = idCardNumber;
        this.examCardNumber = examCardNumber;
        this.amScore = amScore;
        this.pmScore = pmScore;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getExamYearMonth() {
        return this.examYearMonth;
    }
    
    public void setExamYearMonth(String examYearMonth) {
        this.examYearMonth = examYearMonth;
    }

    public String getIdCardNumber() {
        return this.idCardNumber;
    }
    
    public void setIdCardNumber(String idCardNumber) {
        this.idCardNumber = idCardNumber;
    }

    public String getExamCardNumber() {
        return this.examCardNumber;
    }
    
    public void setExamCardNumber(String examCardNumber) {
        this.examCardNumber = examCardNumber;
    }

    public String getAmScore() {
        return this.amScore;
    }
    
    public void setAmScore(String amScore) {
        this.amScore = amScore;
    }

    public String getPmScore() {
        return this.pmScore;
    }
    
    public void setPmScore(String pmScore) {
        this.pmScore = pmScore;
    }

}