package com.gztjj.service;

import com.gztjj.model.EachEconomicIndicator;
import com.gztjj.dao.EachEconomicIndicatorDao;
import java.util.List;

public class EachEconomicIndicatorService 
{
	private EachEconomicIndicatorDao eachEconomicIndicatorDao = null;
	
	public void setEachEconomicIndicatorDao(EachEconomicIndicatorDao dao)
	{
		this.eachEconomicIndicatorDao=dao;
	}
	
	public boolean EachEconomicIndicatorExists(String place,String yearMonth)
	{
		EachEconomicIndicator in=this.eachEconomicIndicatorDao.findByYearAndPlace(place,yearMonth);
		if(in == null)
		{
			return false;//²»´æÔÚ
		}
		else return true;
	}
	
	public void saveEachEconomicIndicator(EachEconomicIndicator u)
	{
		this.eachEconomicIndicatorDao.save(u);
	}
	
	public void updateEachEconomicIndicator(EachEconomicIndicator u)
	{
		this.eachEconomicIndicatorDao.merge(u);
	}
	
	public EachEconomicIndicator getEachEconomicIndicatorByYearAndPlace(String place,String yearMonth)
	{
		return this.eachEconomicIndicatorDao.findByYearAndPlace(place,yearMonth);
	}
	
	public EachEconomicIndicator getEachEconomicIndicatorByID(String recordID)
	{
		return this.eachEconomicIndicatorDao.findById(Integer.parseInt(recordID));
	}
	
	public List queryAllByYearMonth(String yearMonth)
	{ 
		return this.eachEconomicIndicatorDao.findByYearMonth(yearMonth);
	}
	
	public int delEachEconomicIndicators(String recordID)
	{
		if(recordID != null) 
		{
			EachEconomicIndicator u=this.eachEconomicIndicatorDao.findById(Integer.parseInt(recordID));
			if(u != null) this.eachEconomicIndicatorDao.delete(u);
		}
		return 1;
	}
}