package com.gztjj.service;

import com.gztjj.model.DishonestyNotice;
import com.gztjj.dao.DishonestyNoticeDao;
import java.util.List;

public class DishonestyNoticeService 
{
	private DishonestyNoticeDao dishonestyNoticeDao = null;
	
	public void setDishonestyNoticeDao(DishonestyNoticeDao dao)
	{
		this.dishonestyNoticeDao=dao;
	}
	
	public void saveDishonestyNotice(DishonestyNotice u)
	{
		this.dishonestyNoticeDao.save(u);
	}
	
	public void updateDishonestyNotice(DishonestyNotice u)
	{
		this.dishonestyNoticeDao.merge(u);
	}
	
	public List queryDishonestyNoticeByType(String type)
	{
		return this.dishonestyNoticeDao.queryDishonestyNoticeByType(Integer.parseInt(type));
	}
	
	public DishonestyNotice getDishonestyNoticeByID(String recordID)
	{
		return this.dishonestyNoticeDao.findById(Integer.parseInt(recordID));
	}
	
	public List queryAll()
	{
		return this.dishonestyNoticeDao.queryAll();
	}
	
	public int delDishonestyNotices(String[] recordIDArr)
	{
		if(recordIDArr != null) 
		{
			for(int i=0;i<recordIDArr.length;i++){
				DishonestyNotice u=this.dishonestyNoticeDao.findById(Integer.parseInt(recordIDArr[i]));
				if(u != null) this.dishonestyNoticeDao.delete(u);
			}
		}
		return 1;
	}
}