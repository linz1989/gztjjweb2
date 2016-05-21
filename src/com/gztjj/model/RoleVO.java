package com.gztjj.model;

import java.text.SimpleDateFormat;
import com.gztjj.model.Role;

public class RoleVO
{
	public RoleVO(Role r)
	{
		if(r != null)
		{
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			this.roleName=r.getRoleName();
			this.roleFunction=r.getRoleFunction();
			this.createUser=r.getCreateUser();
			if(r.getCreateTime() != null) this.createTime=formatter.format(r.getCreateTime());
		}
	}
	private int seqNo;
	
	public int getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	private String roleName;
    public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleFunction() {
		return roleFunction;
	}
	public void setRoleFunction(String roleFunction) {
		this.roleFunction = roleFunction;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	private String roleFunction;
    private String createUser;
    private String createTime;
}