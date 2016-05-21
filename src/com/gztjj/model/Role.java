package com.gztjj.model;
// default package

import java.sql.Timestamp;


/**
 * Role entity. @author MyEclipse Persistence Tools
 */

public class Role  implements java.io.Serializable {


    // Fields    

     private String roleName;
     private String roleFunction;
     private String createUser;
     private Timestamp createTime;


    // Constructors

    /** default constructor */
    public Role() {
    }

	/** minimal constructor */
    public Role(String roleName, Timestamp createTime) {
        this.roleName = roleName;
        this.createTime = createTime;
    }
    
    /** full constructor */
    public Role(String roleName, String roleFunction, String createUser, Timestamp createTime) {
        this.roleName = roleName;
        this.roleFunction = roleFunction;
        this.createUser = createUser;
        this.createTime = createTime;
    }

   
    // Property accessors

    public String getRoleName() {
        return this.roleName;
    }
    
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleFunction() {
        return this.roleFunction;
    }
    
    public void setRoleFunction(String roleFunction) {
        this.roleFunction = roleFunction;
    }

    public String getCreateUser() {
        return this.createUser;
    }
    
    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Timestamp getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }
}