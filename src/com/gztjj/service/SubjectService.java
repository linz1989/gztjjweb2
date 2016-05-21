package com.gztjj.service;

import com.gztjj.model.Subject;
import com.gztjj.dao.SubjectDao;
import java.util.List;

public class SubjectService 
{
	private SubjectDao subjectDao = null;
	
	public void setSubjectDao(SubjectDao dao)
	{
		this.subjectDao=dao;
	}
	
	public void saveSubject(Subject u)
	{
		this.subjectDao.save(u);
	}
	
	public void updateSubject(Subject u)
	{
		this.subjectDao.merge(u);
	}
	
	public Subject getSubjectById(int id)
	{
		return this.subjectDao.findById(id);
	}
	
	public List queryAllSubject()
	{
		return this.subjectDao.findAll();
	}
	
	public int delSubject(int id)
	{
		Subject u=this.subjectDao.findById(id);
		if(u != null) 
		{
			this.subjectDao.delete(u);
			return 1;
		}
		else
		{
			return 0;
		}
	}
}