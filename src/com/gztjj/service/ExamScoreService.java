package com.gztjj.service;

import com.gztjj.model.ExamScore;
import com.gztjj.dao.ExamScoreDao;
import java.util.List;

public class ExamScoreService 
{
	private ExamScoreDao examScoreDao = null;
	
	public void setExamScoreDao(ExamScoreDao dao)
	{
		this.examScoreDao=dao;
	}
	
	public void saveExamScore(ExamScore u)
	{
		this.examScoreDao.save(u);
	}
	
	public void updateExamScore(ExamScore u)
	{
		this.examScoreDao.merge(u);
	}
	
	public ExamScore getExamScoreById(int id)
	{
		return this.examScoreDao.findById(id);
	}
	
	//依据年月查找出记录
	public List queryAllByYearMonth(String yearMonth,String name,int startPos,int requestLength)
	{
		return this.examScoreDao.findPageResultByYearMonth(yearMonth,name,startPos,requestLength);
	}
	
	public int findTotalSizeByYearMonth(String yearMonth,String name)
	{
		return this.examScoreDao.findTotalSizeByYearMonth(yearMonth,name);
	}
	
	public ExamScore getExamScoreByYearAndIdCard(String yearMonth,String idEaxmString)
	{
		return this.examScoreDao.getExamScoreByYearAndIdCard(yearMonth,idEaxmString);
	}
	
	public ExamScore getExamScoreByYearAndExamCard(String yearMonth,String eaxmString)
	{
		return this.examScoreDao.getExamScoreByYearAndExamCard(yearMonth,eaxmString);
	}
	
	public List queryYearMonth()
	{
		return this.examScoreDao.queryYearMonth();
	}
	
	public int delExamScore(int[] ids)
	{
		ExamScore u;
		for(int i=0;i<ids.length;i++)
		{
			u=this.examScoreDao.findById(ids[i]);
			if(u != null) 
			{
				this.examScoreDao.delete(u);
			}
		}
		return 1;
	}
}