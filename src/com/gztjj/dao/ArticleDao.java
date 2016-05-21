package com.gztjj.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.gztjj.model.Article;
import com.gztjj.util.PageNoUtil;

public class ArticleDao extends HibernateDaoSupport {

	private static final Logger log = LoggerFactory.getLogger(ArticleDao.class);

	protected void initDao() {
		// do nothing
	}

	public int save(Article transientInstance) {
		log.debug("saving Article instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
			return 1;
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Article persistentInstance) {
		log.debug("deleting Article instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Article findById(int id) {
		log.debug("getting Article instance with id: " + id);
		try {
			Article instance = (Article) getHibernateTemplate().get(
					"com.gztjj.model.Article", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	
	//查询同类的文章
	public List querySameCategoryArticle(String articleCategory,int id)
	{
		try {
			String queryString = "from com.gztjj.model.Article  where id=(select max(id) from com.gztjj.model.Article where id<"+id+" and category='"+articleCategory+"' and isPublished='1') or id=(select min(id) from com.gztjj.model.Article where id>"+id+" and category='"+articleCategory+"' and isPublished='1')";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	public List  findTotalSizeByKeyWords(String keyWords) {
		log.debug("finding all Article instances");
		try {	
			String queryString = "select  count(*) from com.gztjj.model.Article  where title like '%"+keyWords+"%'";
		
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public List findTotalSizeByCategory(String category, String searchKeyWords,
			String isPublic) {
		log.debug("finding all Article instances");
		try {
			String[] keyWords = null;
			String fuzzyQueryStr = "";
			if (searchKeyWords != null && searchKeyWords.trim().length() > 0) {
				keyWords = searchKeyWords.trim().split(" ");
				if (keyWords.length > 0) {
					fuzzyQueryStr = "and (";
					for (int i = 0; i < keyWords.length; i++) {
						if (i != 0)
							fuzzyQueryStr += " or ";
						fuzzyQueryStr += "title like '%" + keyWords[i] + "%' ";
					}
					fuzzyQueryStr += ")";
					//System.out.println(fuzzyQueryStr);
				}
			}

			String queryString = "select  count(*) from com.gztjj.model.Article  where";
			if (!isPublic.equals("2")) {
				queryString += " isPublished='" + isPublic + "'  and ";
			}
			queryString += " category='" + category + "'" + fuzzyQueryStr;

			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	public List queryHomeArticleData() {
		List<Article> list = new ArrayList<Article>();
		try{
			Session setitem =this.getHibernateTemplate().getSessionFactory().openSession();
			Query query =  setitem.getNamedQuery("getHomeArticleData");
			list=query.list();
			setitem.close();
			//System.out.println("list.size："+list.size());
			return list;
		}
		catch(Exception e){
			return null;
		}
	}

	public List queryPublicArticleListByCategory(String articleCategory,final int queryNum) 
	{
		try {
			final String queryString = "from com.gztjj.model.Article a where a.isPublished='1' and category='"
					+ articleCategory
					+ "' order by publishTime desc limit 0,"
					+ queryNum;

			List list1 = getHibernateTemplate().executeFind(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							List list2 = PageNoUtil.getList(session,
									queryString, 0, queryNum);
							return list2;
						}
					});
			return list1;
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public List findPageListResultByKeyWords(String keyWords,
			final int startPos, final int requestLength) {
		log.debug("search article instances");
		try {
			String queryStr = "select new map(id,title,browseCount,origin,author,addUser,addTime,publishTime,keyWords,category,isPublished) from com.gztjj.model.Article where title like '%"
					+ keyWords
					+ "%'";
			//System.out.println(queryStr);
			final String queryString = queryStr;
			List list1 = getHibernateTemplate().executeFind(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							List list2 = PageNoUtil.getList(session,
									queryString, startPos, requestLength);
							return list2;
						}
					});
			return list1;

		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public List findPageResultByCategory(String category,
			String searchKeyWords, final int startPos, final int requestLength,
			String isPublic) {
		log.debug("finding all Article instances");
		try {
			String[] keyWords = null;
			String fuzzyQueryStr = "";
			if (searchKeyWords != null && searchKeyWords.trim().length() > 0) {
				keyWords = searchKeyWords.trim().split(" ");
				if (keyWords.length > 0) {
					fuzzyQueryStr = "and (";
					for (int i = 0; i < keyWords.length; i++) {
						if (i != 0)
							fuzzyQueryStr += " or ";
						fuzzyQueryStr += "title like '%" + keyWords[i] + "%' ";
					}
					fuzzyQueryStr += ")";
					//System.out.println(fuzzyQueryStr);
				}
			}

			String queryStr = "select new map(id,title,browseCount,origin,author,addUser,addTime,publishTime,keyWords,category,isPublished) from com.gztjj.model.Article  where category='"
					+ category + "'";
			if (!isPublic.equals("2")) {
				queryStr += " and isPublished='" + isPublic + "' ";
			}
			queryStr += fuzzyQueryStr + " order by addTime desc";
			//System.out.println(queryStr);

			final String queryString = queryStr;
			List list1 = getHibernateTemplate().executeFind(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							List list2 = PageNoUtil.getList(session,
									queryString, startPos, requestLength);
							return list2;
						}
					});
			return list1;
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Article merge(Article detachedInstance) {
		log.debug("merging Article instance");
		try {
			Article result = (Article) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Article instance) {
		log.debug("attaching dirty Article instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Article instance) {
		log.debug("attaching clean Article instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static ArticleDao getFromApplicationContext(ApplicationContext ctx) {
		return (ArticleDao) ctx.getBean("ArticleDao");
	}
}