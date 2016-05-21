package com.gztjj.model;

import java.text.SimpleDateFormat;

import com.gztjj.model.User;

public class UserVO
{
	public UserVO(User u)
	{
		if(u != null)
		{
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			this.userName=u.getUserName();
			this.passWord=u.getPassWord();
			if(u.getCreateTime() != null) this.createTime=formatter.format(u.getCreateTime());
			if(u.getLastLoginTime() != null) this.lastLoginTime=formatter.format(u.getLastLoginTime());
			this.realName=u.getRealName();
			this.remark=u.getRemark();
			this.roleName=u.getRoleName();
		}
	}
	private int seqNo;
	
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	private String userName;
	
    public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getLastLoginTime() {
		return lastLoginTime;
	}
	public void setLastLoginTime(String lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	private String passWord;
    private String realName;
    private String roleName;
    private String createTime;
    private String lastLoginTime;
    private String remark;
}