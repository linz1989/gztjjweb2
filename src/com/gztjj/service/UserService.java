package com.gztjj.service;

import com.gztjj.model.User;
import com.gztjj.dao.UserDao;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserService 
{
	private static final Logger log = LoggerFactory.getLogger(UserService.class);
	private UserDao userDao = null;
	
	public void setUserDao(UserDao dao)
	{
		this.userDao=dao; 
	}
	
	public int userLogin(String userName,String passWord)
	{
		//System.out.println("用户："+userName+" 密码："+passWord+"请求登陆验证！");
		log.info("用户："+userName+" 密码："+passWord+"请求登陆验证！");
		User user=this.userDao.findById(userName);
		if(user == null)
		{
			return 1;//用户不存在
		}
		if(!user.getPassWord().equals(passWord))
		{
			return 2;//密码错误
		}
		user.setLastLoginTime(new Timestamp(new Date().getTime()));
		this.userDao.merge(user);//记录登陆时间
		return 0;//成功登陆 
	} 
	
	public boolean userExists(String userName)
	{
		User user=this.userDao.findById(userName);
		if(user == null)
		{
			return false;//用户不存在
		}
		else return true;
	}
	
	public void saveUser(User u)
	{
		this.userDao.save(u);
	}
	
	public void updateUser(User u)
	{
		this.userDao.merge(u);
	}
	
	public User getUserByName(String userName)
	{
		return this.userDao.findById(userName);
	}
	
	public int changePassword(String userName,String newPassword)
	{
		User user=this.userDao.findById(userName);
		if(user == null)
		{
			return 1;//用户不存在
		}
		user.setPassWord(newPassword);
		this.userDao.merge(user); 
		return 0;
	}
	
	public List queryAllUser()
	{
		return this.userDao.findAll();
	}
	
	public int delUsers(String[] userNameArr)
	{
		if(userNameArr != null)
		for(int i=0;i<userNameArr.length;i++)
		{
			User u=this.userDao.findById(userNameArr[i]);
			if(u != null) this.userDao.delete(u);
		}
		return 1;
	}
}