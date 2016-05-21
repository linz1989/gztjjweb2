package com.gztjj.service;

import com.gztjj.model.EconomicIndicator;
import com.gztjj.dao.EconomicIndicatorDao;
import java.util.List;

public class EconomicIndicatorService 
{
	private EconomicIndicatorDao economicIndicatorDao = null;
	
	public void setEconomicIndicatorDao(EconomicIndicatorDao dao)
	{
		this.economicIndicatorDao=dao;
	}
	
	public boolean economicIndicatorExists(String place,String yearMonth,String indicator)
	{
		EconomicIndicator in=this.economicIndicatorDao.findByYearAndIndicator(place,yearMonth,indicator);
		if(in == null)
		{
			return false;//²»´æÔÚ
		}
		else return true;
	}
	
	public void saveEconomicIndicator(EconomicIndicator u)
	{
		this.economicIndicatorDao.save(u);
	}
	
	public void updateEconomicIndicator(EconomicIndicator u)
	{
		this.economicIndicatorDao.merge(u);
	}
	
	public EconomicIndicator getEconomicIndicatorByYearAndIndicator(String place,String yearMonth,String indicator)
	{
		return this.economicIndicatorDao.findByYearAndIndicator(place,yearMonth,indicator);
	}
	
	public EconomicIndicator getEconomicIndicatorByID(String recordID)
	{
		return this.economicIndicatorDao.findById(Integer.parseInt(recordID));
	}
	
	public List queryAllByYearMonth(String place,String yearMonth)
	{
		return this.economicIndicatorDao.findByYearMonth(place,yearMonth);
	}
	
	public List queryEconomicIndicatorChartData(String indicatorName)
	{
		return this.economicIndicatorDao.queryEconomicIndicatorChartData(indicatorName);
	}
	
	public List queryChartData()
	{
		return this.economicIndicatorDao.queryChartData();
	}
	
	public int delEconomicIndicators(String recordID)
	{
		if(recordID != null) 
		{
			EconomicIndicator u=this.economicIndicatorDao.findById(Integer.parseInt(recordID));
			if(u != null) this.economicIndicatorDao.delete(u);
		}
		return 1;
	}
}