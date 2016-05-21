package com.gztjj.dao;

import java.util.List;
import org.hibernate.LockMode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.User;

public class UserDao extends HibernateDaoSupport  {
	
	private static final Logger log = LoggerFactory.getLogger(UserDao.class);
		//property constants
	public static final String PASS_WORD = "passWord";
	public static final String REAL_NAME = "realName";
	public static final String ROLE_NAME = "roleName";
	public static final String REMARK = "remark";
	
	protected void initDao() 
	{
		//do nothing
	}
    
    public void save(User transientInstance) 
    {
        log.debug("saving User instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(User persistentInstance) {
        log.debug("deleting User instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public User findById(String id) 
    {
        log.debug("getting User instance with id: " + id);
        try 
        {
            User instance = (User) getHibernateTemplate().get("com.gztjj.model.User", id);
            return instance;
        } 
        catch (RuntimeException re) 
        {
            log.error("get failed", re);
            throw re;
        }
    }
    
    public List findAll() 
	{
		log.debug("finding all User instances");
		try 
		{
			String queryString = "from com.gztjj.model.User";
		 	return getHibernateTemplate().find(queryString);
		} 
		catch (RuntimeException re) 
		{
			log.error("find all failed", re);
			throw re;
		}
	}
    
    public User merge(User detachedInstance) 
    {
        log.debug("merging User instance");
        try {
            User result = (User) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(User instance) {
        log.debug("attaching dirty User instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(User instance) {
        log.debug("attaching clean User instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static UserDao getFromApplicationContext(ApplicationContext ctx) {
    	return (UserDao) ctx.getBean("UserDao"); 
	}
}