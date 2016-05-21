package com.gztjj.dao;

import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.DemeanourImage;
import com.gztjj.model.Article;

public class DemeanourImageDao extends HibernateDaoSupport  {
	private static final Logger log = LoggerFactory.getLogger(DemeanourImageDao.class);
		//property constants
	public static final String DemeanourImage_FUNCTION = "DemeanourImageFunction";

	protected void initDao() {
		//do nothing
	}
    
    public void save(DemeanourImage transientInstance) {
        log.debug("saving DemeanourImage instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(DemeanourImage persistentInstance) {
        log.debug("deleting DemeanourImage instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public DemeanourImage findById(int id) {
        log.debug("getting DemeanourImage instance with id: " + id);
        try {
            DemeanourImage instance = (DemeanourImage) getHibernateTemplate().get("com.gztjj.model.DemeanourImage", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
	public List queryAllDemeanourImage(String category) {
		log.debug("finding all DemeanourImage instances"); 
		try {
			String queryString = "from com.gztjj.model.DemeanourImage o "+(category.equals("all") ? "" : " where o.category="+category);
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	public Article getArticleIdByDescribe(String d)
	{
		try
		{
			String queryString = "from com.gztjj.model.Article o where  o.title='"+d+"'";
			List list=getHibernateTemplate().find(queryString);
			if(list.size()>0) 
			{
				return (Article)list.get(0);
			}
			else return  null;
		}
		catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public DemeanourImage merge(DemeanourImage detachedInstance) {
        log.debug("merging DemeanourImage instance");
        try {
            DemeanourImage result = (DemeanourImage) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(DemeanourImage instance) {
        log.debug("attaching dirty DemeanourImage instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(DemeanourImage instance) {
        log.debug("attaching clean DemeanourImage instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static DemeanourImageDao getFromApplicationContext(ApplicationContext ctx) {
    	return (DemeanourImageDao) ctx.getBean("DemeanourImageDao");
	}
}