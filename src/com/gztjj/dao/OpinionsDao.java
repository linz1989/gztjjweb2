package com.gztjj.dao;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.gztjj.model.Opinions;
import com.gztjj.util.PageNoUtil;

/**
 * A data access object (DAO) providing persistence and search support for
 * Opinions entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see .Opinions
 * @author MyEclipse Persistence Tools
 */

public class OpinionsDao extends HibernateDaoSupport {
	private static final Logger log = LoggerFactory.getLogger(OpinionsDao.class);
	
	public static final String Opinions_FUNCTION = "OpinionsFunction";

	protected void initDao() {
		// do nothing
	}

	public void save(Opinions transientInstance) {
		log.debug("saving Opinions instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Opinions persistentInstance) {
		log.debug("deleting Opinions instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Opinions findById(java.lang.Integer id) {
		log.debug("getting Opinions instance with id: " + id);
		try {
			Opinions instance = (Opinions) getHibernateTemplate().get(
					"com.gztjj.model.Opinions", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}	
	
	public List findTotalSizeByArticleId(String articleId, String isPublic) {
		log.debug("finding all Article instances");
		try {
			String queryString = "select  count(*) from com.gztjj.model.Opinions o  where o.isPublished='" + isPublic + "'  and  o.articleId='" + articleId + "'";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	public List findAll(String articleId, String isPublic){
		try {
			String queryString = "from com.gztjj.model.Opinions o  where o.isPublished='" + isPublic + "'  and  o.articleId='" + articleId + "'";
			//System.out.println(queryString);
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public List findPageResultByArticleId(String articleId,
			final int startPos, final int requestLength, String isPublic) {
		try { 
			String queryStr = "from com.gztjj.model.Opinions where articleId='"
					+ articleId + "' and isPublished='" + isPublic + "' order by createTime desc";
			  
			final String queryString = queryStr;
			List list1 = getHibernateTemplate().executeFind(
					new HibernateCallback() {
						public Object doInHibernate(Session session)
								throws HibernateException, SQLException {
							List list2 = PageNoUtil.getList(session,queryString, startPos, requestLength);
							return list2;
						}
					});
			return list1;
			
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Opinions merge(Opinions sub) {
		log.debug("merging Opinions instance");
		try {
			Opinions result = (Opinions) getHibernateTemplate().merge(sub);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Opinions instance) {
		log.debug("attaching dirty Opinions instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Opinions instance) {
		log.debug("attaching clean Opinions instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static OpinionsDao getFromApplicationContext(ApplicationContext ctx) {
		return (OpinionsDao) ctx.getBean("OpinionsDao");
	}
}