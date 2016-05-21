package com.gztjj.model;
// default package

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
 

/**
 * User entity. @author MyEclipse Persistence Tools
 */

public class User  implements java.io.Serializable {


    // Fields    

     private String userName;
     private String passWord;
     private String realName;
     private String roleName;
     private Timestamp createTime;
     private Timestamp lastLoginTime;
     private String remark;
     
    // Constructors

    /** default constructor */
    public User() {
    }

	/** minimal constructor */
    public User(String userName, String passWord, String realName, Timestamp createTime) {
        this.userName = userName;
        this.passWord = passWord;
        this.realName = realName;
        this.createTime = createTime;
    }
    
    /** full constructor */
    public User(String userName, String passWord, String realName, String roleName, Timestamp createTime, Timestamp lastLoginTime, String remark) {
        this.userName = userName;
        this.passWord = passWord;
        this.realName = realName;
        this.roleName = roleName;
        this.createTime = createTime;
        this.lastLoginTime = lastLoginTime;
        this.remark = remark;
    }

   
    // Property accessors

    public String getUserName() {
        return this.userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return this.passWord;
    }
    
    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getRealName() {
        return this.realName;
    }
    
    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getRoleName() {
        return this.roleName;
    }
    
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Timestamp getCreateTime() {
    	return  this.createTime;
    }
    
    
    
    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Timestamp getLastLoginTime() {
    	return  this.lastLoginTime;
    }
    
    public void setLastLoginTime(Timestamp lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
}