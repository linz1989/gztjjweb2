package com.gztjj.model;

import java.sql.Timestamp;


/**
 * Opinions entity. @author MyEclipse Persistence Tools
 */

public class Opinions  implements java.io.Serializable {


    // Fields    
     private Integer id;
     private Integer articleId;
     private String nickName;
     private String subject;
     private String email;
     private String tel;
     private String address;
     private String content;
     private Timestamp createTime;
     private String isPublished;

    // Constructors

    /** default constructor */
    public Opinions() {
    }

    
    /** full constructor */
    public Opinions(Integer articleId, String nickName, String subject, String email, String tel, String address, String content, Timestamp createTime, String isPublished) {
        this.articleId = articleId;
        this.nickName = nickName;
        this.subject = subject;
        this.email = email;
        this.tel = tel;
        this.address = address;
        this.content = content;
        this.createTime = createTime;
        this.isPublished = isPublished;
    }

   
    // Property accessors

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

    public Timestamp getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public String getIsPublished() {
        return this.isPublished;
    }
    
    public void setIsPublished(String isPublished) {
        this.isPublished = isPublished;
    }
}