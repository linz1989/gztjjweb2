package com.gztjj.service;

import com.gztjj.model.DemeanourImage;
import com.gztjj.dao.DemeanourImageDao;
import java.util.List;
import com.gztjj.model.Article;

public class DemeanourImageService 
{
	private DemeanourImageDao demeanourImageDao = null;
	
	public void setDemeanourImageDao(DemeanourImageDao dao)
	{
		this.demeanourImageDao=dao;
	}
	
	public void saveDemeanourImage(DemeanourImage u)
	{
		this.demeanourImageDao.save(u);
	}
	
	public void updateDemeanourImage(DemeanourImage u)
	{
		this.demeanourImageDao.merge(u);
	}
	
	public DemeanourImage getDemeanourImageByID(String recordID)
	{
		return this.demeanourImageDao.findById(Integer.parseInt(recordID));
	}
	
	public int delDemeanourImages(String recordID)
	{
		if(recordID != null) 
		{
			DemeanourImage u=this.demeanourImageDao.findById(Integer.parseInt(recordID));
			if(u != null) this.demeanourImageDao.delete(u);
		}
		return 1;
	}
	
	public Article getArticleIdByDescribe(String d)
	{
		return this.demeanourImageDao.getArticleIdByDescribe(d);
	}
	
	public List queryAllDemeanourImage(String category)
	{
		return this.demeanourImageDao.queryAllDemeanourImage(category);
	}
}