package com.gztjj.dao;

import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.Subject;

/**
 	* A data access object (DAO) providing persistence and search support for Subject entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .Subject
  * @author MyEclipse Persistence Tools 
 */

public class SubjectDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(SubjectDao.class);
		//property constants
	public static final String Subject_FUNCTION = "SubjectFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(Subject transientInstance) {
        log.debug("saving Subject instance");
        try {
        	if(transientInstance.getIsMain().equals("1"))
        	{
        		//需要将已经设置为主专题的专题置为0
        		String queryString = "from com.gztjj.model.Subject where isMain='1'";
    		 	List list=getHibernateTemplate().find(queryString);
    		 	if(list.size()>0){
    		 		Subject mainSub=(Subject)list.get(0);
    		 		mainSub.setIsMain("0");
    		 		getHibernateTemplate().merge(mainSub);
    		 	}
        	}
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(Subject persistentInstance) {
        log.debug("deleting Subject instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public Subject findById( java.lang.Integer id) {
        log.debug("getting Subject instance with id: " + id);
        try {
            Subject instance = (Subject) getHibernateTemplate().get("com.gztjj.model.Subject", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
	public List findAll() {
		log.debug("finding all Subject instances");
		try {
			String queryString = "from com.gztjj.model.Subject";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public Subject merge(Subject sub) {
        log.debug("merging Subject instance");
        try {
        	if(sub.getIsMain().equals("1"))
        	{
        		//需要将已经设置为主专题的专题置为0
        		String queryString = "from com.gztjj.model.Subject where isMain='1'";
    		 	List list=getHibernateTemplate().find(queryString);
    		 	if(list.size()>0){
    		 		Subject mainSub=(Subject)list.get(0);
    		 		if(mainSub.getId() != sub.getId()){
    		 			mainSub.setIsMain("0");
    		 			getHibernateTemplate().merge(mainSub);
    		 		}
    		 	}
        	}
            Subject result = (Subject) getHibernateTemplate().merge(sub);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(Subject instance) {
        log.debug("attaching dirty Subject instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(Subject instance) {
        log.debug("attaching clean Subject instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static SubjectDao getFromApplicationContext(ApplicationContext ctx) {
    	return (SubjectDao) ctx.getBean("SubjectDao");
	}
}