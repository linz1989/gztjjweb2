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
import com.gztjj.model.EconomicIndicator;

/**
 	* A data access object (DAO) providing persistence and search support for EconomicIndicator entities.
 	* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .EconomicIndicator
  * @author MyEclipse Persistence Tools 
 */

public class EconomicIndicatorDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(EconomicIndicatorDao.class);
		//property constants
	public static final String EconomicIndicator_FUNCTION = "EconomicIndicatorFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(EconomicIndicator transientInstance) {
        log.debug("saving EconomicIndicator instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(EconomicIndicator persistentInstance) {
        log.debug("deleting EconomicIndicator instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public EconomicIndicator findById(int id) {
        log.debug("getting EconomicIndicator instance with id: " + id);
        try {
            EconomicIndicator instance = (EconomicIndicator) getHibernateTemplate().get("com.gztjj.model.EconomicIndicator", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    public EconomicIndicator findByYearAndIndicator(String place,String yearMonth,String indicator){
         try {
        	 String queryString = "from com.gztjj.model.EconomicIndicator where yearmonth='"+yearMonth+"' and indicator='"+indicator+"' and place='"+place+"'";
 		 	 List list=getHibernateTemplate().find(queryString);
             if(list.size()>0) return (EconomicIndicator)list.get(0);
             else return null;
         } catch (RuntimeException re){
             log.error("get failed", re);
             throw re;
         }
    }
    
	public List findByYearMonth(String place,String yearMonth){
		try {
			String queryString = "from com.gztjj.model.EconomicIndicator where yearmonth='"+yearMonth+"' and place='"+place+"'";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	public List queryEconomicIndicatorChartData(String indicatorName)
	{
		try
		{
			SimpleDateFormat df=new SimpleDateFormat("yyyyMM"); 
			GregorianCalendar gc=new GregorianCalendar();
			Date currDate=new Date();
			gc.setTime(currDate);
			String currYearMonth= df.format(gc.getTime());
			gc.add(2, -13);
			String prevYearMonth=df.format(gc.getTime());
			//System.out.println("currYearMonth:"+currYearMonth+" prevYearMonth:"+prevYearMonth);
			
			String queryString = "from com.gztjj.model.EconomicIndicator where yearmonth<'"+currYearMonth+"' and yearmonth > '"+prevYearMonth+"' and indicator like '%"+indicatorName+"%' order by yearmonth";
			//System.out.println("queryString"+queryString);
			
			return getHibernateTemplate().find(queryString);
		}
		catch (RuntimeException re)
		{
			throw re;
		}
	}
	
	public List queryChartData()
	{
		try
		{
			SimpleDateFormat df=new SimpleDateFormat("yyyyMM"); 
			GregorianCalendar gc=new GregorianCalendar();
			Date currDate=new Date();
			gc.setTime(currDate);
			String currYearMonth= df.format(gc.getTime());
			gc.add(2, -13);
			String prevYearMonth=df.format(gc.getTime());
			//System.out.println("currYearMonth:"+currYearMonth+" prevYearMonth:"+prevYearMonth);
			
			String queryString = "from com.gztjj.model.EconomicIndicator where yearmonth<'"+currYearMonth+"' and yearmonth > '"+prevYearMonth+"' and (indicator like '%规模以上工业增加值%' or indicator like '%居民消费价格指数%' or indicator like '%财政总收入%' ) order by yearmonth";
			//String queryString = "from com.gztjj.model.EconomicIndicator where yearmonth<'"+currYearMonth+"' and yearmonth > '"+prevYearMonth+"'";
			//System.out.println("queryString"+queryString);
			
			return getHibernateTemplate().find(queryString);
		}
		catch (RuntimeException re)
		{
			throw re;
		}
	}
	
    public EconomicIndicator merge(EconomicIndicator detachedInstance) {
        log.debug("merging EconomicIndicator instance");
        try {
            EconomicIndicator result = (EconomicIndicator) getHibernateTemplate().merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(EconomicIndicator instance) {
        log.debug("attaching dirty EconomicIndicator instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(EconomicIndicator instance) {
        log.debug("attaching clean EconomicIndicator instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static EconomicIndicatorDao getFromApplicationContext(ApplicationContext ctx) {
    	return (EconomicIndicatorDao) ctx.getBean("EconomicIndicatorDao");
	}
}