package com.gztjj.service;

import com.gztjj.model.GanzhouInfo;
import com.gztjj.dao.GanzhouInfoDao;
import java.util.List;

public class GanzhouInfoService 
{
	private GanzhouInfoDao ganzhouInfoDao = null;
	
	public void setGanzhouInfoDao(GanzhouInfoDao dao)
	{
		this.ganzhouInfoDao=dao;
	}
	
	public void saveGanzhouInfo(GanzhouInfo u)
	{
		this.ganzhouInfoDao.save(u);
	}
	
	public void updateGanzhouInfo(GanzhouInfo u)
	{
		this.ganzhouInfoDao.merge(u);
	}
	
	public GanzhouInfo getGanzhouInfoByPlace(String place)
	{
		return this.ganzhouInfoDao.findById(place);
	}
	
	public List queryAllGanzhouInfo()
	{
		return this.ganzhouInfoDao.findAll();
	}
	
	public int delGanzhouInfo(String GanzhouInfoName)
	{
		if(GanzhouInfoName != null){
			GanzhouInfo u=this.ganzhouInfoDao.findById(GanzhouInfoName);
			if(u != null) this.ganzhouInfoDao.delete(u);
			else return 0;
		}
		return 1;
	}
}