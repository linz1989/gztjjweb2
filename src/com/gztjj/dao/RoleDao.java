package com.gztjj.dao;

import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.Role;

/**
 	* A data access object (DAO) providing persistence and search support for Role entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .Role
  * @author MyEclipse Persistence Tools 
 */

public class RoleDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(RoleDao.class);
		//property constants
	public static final String ROLE_FUNCTION = "roleFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(Role transientInstance) {
        log.debug("saving Role instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(Role persistentInstance) {
        log.debug("deleting Role instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public Role findById( java.lang.String id) {
        log.debug("getting Role instance with id: " + id);
        try {
            Role instance = (Role) getHibernateTemplate().get("com.gztjj.model.Role", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
	public List findAll() {
		log.debug("finding all Role instances");
		try {
			String queryString = "from com.gztjj.model.Role";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public Role merge(Role detachedInstance) {
        log.debug("merging Role instance");
        try {
            Role result = (Role) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(Role instance) {
        log.debug("attaching dirty Role instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(Role instance) {
        log.debug("attaching clean Role instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static RoleDao getFromApplicationContext(ApplicationContext ctx) {
    	return (RoleDao) ctx.getBean("RoleDao");
	}
}