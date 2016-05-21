package com.gztjj.dao;

import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.EachEconomicIndicator;

/**
 	* A data access object (DAO) providing persistence and search support for EachEconomicIndicator entities.
 	* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .EachEconomicIndicator
  * @author MyEclipse Persistence Tools 
 */

public class EachEconomicIndicatorDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(EachEconomicIndicatorDao.class);
		//property constants
	public static final String EachEconomicIndicator_FUNCTION = "EachEconomicIndicatorFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(EachEconomicIndicator transientInstance) {
        log.debug("saving EachEconomicIndicator instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(EachEconomicIndicator persistentInstance) {
        log.debug("deleting EachEconomicIndicator instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public EachEconomicIndicator findById(int id) {
        log.debug("getting EachEconomicIndicator instance with id: " + id);
        try {
            EachEconomicIndicator instance = (EachEconomicIndicator) getHibernateTemplate().get("com.gztjj.model.EachEconomicIndicator", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    public EachEconomicIndicator findByYearAndPlace(String place,String yearMonth){
         try {
        	 String queryString = "from com.gztjj.model.EachEconomicIndicator where yearmonth='"+yearMonth+"' and place='"+place+"'";
 		 	 List list=getHibernateTemplate().find(queryString);
             if(list.size()>0) return (EachEconomicIndicator)list.get(0);
             else return null;
         } catch (RuntimeException re){
             log.error("get failed", re);
             throw re;
         }
    }
    
	
	public List findByYearMonth(String yearMonth){
		log.debug("finding all EachEconomicIndicator instances");
		try {
			String queryString = "from com.gztjj.model.EachEconomicIndicator where yearmonth='"+yearMonth+"'";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public EachEconomicIndicator merge(EachEconomicIndicator detachedInstance) {
        log.debug("merging EachEconomicIndicator instance");
        try {
            EachEconomicIndicator result = (EachEconomicIndicator) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(EachEconomicIndicator instance) {
        log.debug("attaching dirty EachEconomicIndicator instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(EachEconomicIndicator instance) {
        log.debug("attaching clean EachEconomicIndicator instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static EachEconomicIndicatorDao getFromApplicationContext(ApplicationContext ctx) {
    	return (EachEconomicIndicatorDao) ctx.getBean("EachEconomicIndicatorDao");
	}
}