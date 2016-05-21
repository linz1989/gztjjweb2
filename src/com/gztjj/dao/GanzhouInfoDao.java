package com.gztjj.dao;

import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.GanzhouInfo;

/**
 	* A data access object (DAO) providing persistence and search support for GanzhouInfo entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .GanzhouInfo
  * @author MyEclipse Persistence Tools 
 */

public class GanzhouInfoDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(GanzhouInfoDao.class);
		//property constants
	public static final String GanzhouInfo_FUNCTION = "GanzhouInfoFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(GanzhouInfo transientInstance) {
        log.debug("saving GanzhouInfo instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(GanzhouInfo persistentInstance) {
        log.debug("deleting GanzhouInfo instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public GanzhouInfo findById( java.lang.String id) {
        log.debug("getting GanzhouInfo instance with id: " + id);
        try {
            GanzhouInfo instance = (GanzhouInfo) getHibernateTemplate().get("com.gztjj.model.GanzhouInfo", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
	public List findAll() {
		log.debug("finding all GanzhouInfo instances");
		try {
			String queryString = "from com.gztjj.model.GanzhouInfo";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public GanzhouInfo merge(GanzhouInfo detachedInstance) {
        log.debug("merging GanzhouInfo instance");
        try {
            GanzhouInfo result = (GanzhouInfo) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(GanzhouInfo instance) {
        log.debug("attaching dirty GanzhouInfo instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(GanzhouInfo instance) {
        log.debug("attaching clean GanzhouInfo instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static GanzhouInfoDao getFromApplicationContext(ApplicationContext ctx) {
    	return (GanzhouInfoDao) ctx.getBean("GanzhouInfoDao");
	}
}