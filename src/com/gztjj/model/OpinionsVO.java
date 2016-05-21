package com.gztjj.model;

import java.text.SimpleDateFormat;
import com.gztjj.model.Opinions;

public class OpinionsVO {


    // Fields    
	private int seqNo;
	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

     private Integer id;
     private Integer articleId;
     private String nickName;
     private String subject;
     private String email;
     private String tel;
     private String address;
     private String content;
     private String createTime;
     private String isPublished;


    // Constructors

    /** default constructor */
    public OpinionsVO(Opinions o) {
    	if(o != null){
    		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    		this.id = o.getId();
    	    this.articleId = o.getArticleId();
    	    this.nickName = o.getNickName();
    	    this.subject = o.getSubject();
    	    this.email = o.getEmail();
    	    this.tel = o.getTel();
    	    this.address = o.getAddress();
    	    this.content = o.getContent();
    	    this.createTime = formatter.format(o.getCreateTime());
    	    this.isPublished = o.getIsPublished();
    	}
    }

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getArticleId() {
        return this.articleId;
    }
    
    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    public String getNickName() {
        return this.nickName;
    }
    
    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getSubject() {
        return this.subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return this.tel;
    }
    
    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddress() {
        return this.address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }

    public String getContent() {
        return this.content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getIsPublished() {
        return this.isPublished;
    }
    
    public void setIsPublished(String isPublished) {
        this.isPublished = isPublished;
    }
}