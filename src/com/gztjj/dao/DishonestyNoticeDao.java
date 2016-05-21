package com.gztjj.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.DishonestyNotice;

/**
 	* A data access object (DAO) providing persistence and search support for DishonestyNotice entities.
 	* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .DishonestyNotice
  * @author MyEclipse Persistence Tools 
 */

public class DishonestyNoticeDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(DishonestyNoticeDao.class);
		//property constants
	public static final String DishonestyNotice_FUNCTION = "DishonestyNoticeFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(DishonestyNotice transientInstance) {
        log.debug("saving DishonestyNotice instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(DishonestyNotice persistentInstance) {
        log.debug("deleting DishonestyNotice instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public DishonestyNotice findById(int id) {
        log.debug("getting DishonestyNotice instance with id: " + id);
        try {
            DishonestyNotice instance = (DishonestyNotice) getHibernateTemplate().get("com.gztjj.model.DishonestyNotice", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    public List queryAll()
    {
    	try{
    		return getHibernateTemplate().find("from com.gztjj.model.DishonestyNotice o order by o.type ");
    	}
    	catch (RuntimeException re)
		{
			throw re;
		}
    }
    
	public List queryDishonestyNoticeByType(int type)
	{
		try
		{
			String queryString = "from com.gztjj.model.DishonestyNotice where type="+type;
			return getHibernateTemplate().find(queryString);
		}
		catch (RuntimeException re)
		{
			throw re;
		}
	}
	
    public DishonestyNotice merge(DishonestyNotice detachedInstance) {
        log.debug("merging DishonestyNotice instance");
        try {
            DishonestyNotice result = (DishonestyNotice) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(DishonestyNotice instance) {
        log.debug("attaching dirty DishonestyNotice instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(DishonestyNotice instance) {
        log.debug("attaching clean DishonestyNotice instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static DishonestyNotice getFromApplicationContext(ApplicationContext ctx) {
    	return (DishonestyNotice) ctx.getBean("DishonestyNotice");
	}
}