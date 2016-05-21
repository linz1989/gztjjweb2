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
		//System.out.println("�û���"+userName+" ���룺"+passWord+"�����½��֤��");
		log.info("�û���"+userName+" ���룺"+passWord+"�����½��֤��");
		User user=this.userDao.findById(userName);
		if(user == null)
		{
			return 1;//�û�������
		}
		if(!user.getPassWord().equals(passWord))
		{
			return 2;//�������
		}
		user.setLastLoginTime(new Timestamp(new Date().getTime()));
		this.userDao.merge(user);//��¼��½ʱ��
		return 0;//�ɹ���½ 
	} 
	
	public boolean userExists(String userName)
	{
		User user=this.userDao.findById(userName);
		if(user == null)
		{
			return false;//�û�������
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
			return 1;//�û�������
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