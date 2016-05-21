package com.gztjj.service;

import com.gztjj.model.Opinions;
import com.gztjj.dao.OpinionsDao;

import java.util.List;

public class OpinionsService 
{
	private OpinionsDao opinionsDao = null;
	
	public void setOpinionsDao(OpinionsDao dao)
	{
		this.opinionsDao=dao;
	}
	
	public void saveOpinions(Opinions o)
	{
		this.opinionsDao.save(o);
	}
	
	public void updateOpinions(Opinions o)
	{
		this.opinionsDao.merge(o);
	}
	
	public Opinions getOpinionsById(int id)
	{
		return this.opinionsDao.findById(id);
	}
	
	public int delOpinions(int[] ids) 
	{
		Opinions u;
		for(int i=0;i<ids.length;i++)
		{
			u=this.opinionsDao.findById(ids[i]);
			if(u != null) 
			{
				this.opinionsDao.delete(u);
			}
		}
		return 1;
	}
	
	public int findTotalSizeByArticleId(String articleId, String isPublic){
		List list = this.opinionsDao.findTotalSizeByArticleId(articleId,isPublic);
		if(list != null) return list.size();
		return 0;
	}
	
	public List findAll(String articleId, String isPublic){
		return this.opinionsDao.findAll(articleId,isPublic); 
	}
	
	public List findPageResultByArticleId(String articleId,
			final int startPos, final int requestLength, String isPublic){
		return this.opinionsDao.findPageResultByArticleId(articleId,startPos,requestLength,isPublic);
	}
}