package com.gztjj.service;

import com.gztjj.model.Article;
import com.gztjj.dao.ArticleDao;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public class ArticleService 
{
	private ArticleDao ArticleDao = null;
	
	public void setArticleDao(ArticleDao dao)
	{
		this.ArticleDao=dao;
	}
	
	public boolean ArticleExists(int id)
	{
		Article Article=this.ArticleDao.findById(id);
		if(Article == null)
		{
			return false;//用户不存在
		}
		else return true;
	}
	
	public int saveArticle(Article u)
	{
		return this.ArticleDao.save(u);
	}
	
	public void updateArticle(Article u)
	{
		this.ArticleDao.merge(u);
	}
	
	public Article getArticleById(int articleId)
	{
		return this.ArticleDao.findById(articleId);
	}
	
	//依据文章的category按照文章添加的顺序找出该类的所有文章
	public List queryAllArticleByCategory(String articleCategory,String searchKeyWords,int startPos,int requestLength,String isPublic)
	{
		return this.ArticleDao.findPageResultByCategory(articleCategory,searchKeyWords,startPos,requestLength,isPublic);
	}
	
	public List queryArticleByTitleKeywords(String keyWords,int startPos,int requestLength) {
		return this.ArticleDao.findPageListResultByKeyWords(keyWords, startPos, requestLength);
	}
	
	public List queryPublicArticleListByCategory(String articleCategory,int queryNum)
	{
		return this.ArticleDao.queryPublicArticleListByCategory(articleCategory,queryNum);
	}
	
	public List queryHomeArticleData()
	{
		return this.ArticleDao.queryHomeArticleData();
	}
	
	public List querySameCategoryArticle(String articleCategory,int id)
	{
		return this.ArticleDao.querySameCategoryArticle(articleCategory,id);
	}
	
	public int findTotalSizeByKeyWords(String keyWords)
	{
		List list=this.ArticleDao.findTotalSizeByKeyWords(keyWords);
		//System.out.println("总记录数："+list.get(0));
		return Integer.parseInt(list.get(0).toString());
	}
	
	public int findTotalSizeByCategory(String articleCategory,String searchKeyWords,String isPublic)
	{
		List list=this.ArticleDao.findTotalSizeByCategory(articleCategory,searchKeyWords, isPublic);
		//System.out.println("总记录数："+list.get(0));
		return Integer.parseInt(list.get(0).toString());
	}
	
	public int delArticle(int[] ids)
	{
		Article u;
		for(int i=0;i<ids.length;i++)
		{
			u=this.ArticleDao.findById(ids[i]);
			if(u != null) 
			{
				this.ArticleDao.delete(u);
			}
		}
		
		return 1;
	}
	
	public int publishArticle(int id)
	{
		Article u=this.ArticleDao.findById(id);
		if(u != null) 
		{
			u.setIsPublished("1");
			u.setPublishTime(new Timestamp(new Date().getTime()));
			this.ArticleDao.merge(u);
			return 1;
		}
		return 0;
	}
}