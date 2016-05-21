package com.gztjj.service;

import com.gztjj.model.Role;
import com.gztjj.dao.RoleDao;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class RoleService 
{
	private RoleDao RoleDao = null;
	
	public void setRoleDao(RoleDao dao)
	{
		this.RoleDao=dao;
	}
	
	public boolean RoleExists(String RoleName)
	{
		Role Role=this.RoleDao.findById(RoleName);
		if(Role == null)
		{
			return false;//²»´æÔÚ
		}
		else return true;
	}
	
	public void saveRole(Role u)
	{
		this.RoleDao.save(u);
	}
	
	public void updateRole(Role u)
	{
		this.RoleDao.merge(u);
	}
	
	public Role getRoleByName(String RoleName)
	{
		return this.RoleDao.findById(RoleName);
	}
	
	public List queryAllRole()
	{
		return this.RoleDao.findAll();
	}
	
	public int delRoles(String[] RoleNameArr)
	{
		if(RoleNameArr != null)
		for(int i=0;i<RoleNameArr.length;i++)
		{
			Role u=this.RoleDao.findById(RoleNameArr[i]);
			if(u != null) this.RoleDao.delete(u);
		}
		return 1;
	}
}