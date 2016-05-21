package com.gztjj.dao;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.gztjj.model.ExamScore;
import com.gztjj.util.PageNoUtil;

/**
 	* A data access object (DAO) providing persistence and search support for ExamScore entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .ExamScore
  * @author MyEclipse Persistence Tools 
 */

public class ExamScoreDao extends HibernateDaoSupport  {
	     private static final Logger log = LoggerFactory.getLogger(ExamScoreDao.class);
		//property constants
	public static final String ExamScore_FUNCTION = "ExamScoreFunction";


	protected void initDao() {
		//do nothing
	}
    
    public void save(ExamScore transientInstance) {
        log.debug("saving ExamScore instance");
        try {
            getHibernateTemplate().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(ExamScore persistentInstance) {
        log.debug("deleting ExamScore instance");
        try {
            getHibernateTemplate().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
	
	public int findTotalSizeByYearMonth(String yearMonth,String name)
	{
		log.debug("finding all Article instances");
		try {
			String[] keyWords = null;
			String fuzzyQueryStr = "";
			if (name != null && name.trim().length() > 0) {
				keyWords = name.trim().split(" ");
				if (keyWords.length > 0) {
					fuzzyQueryStr = "and (";
					for (int i = 0; i < keyWords.length; i++) {
						if (i != 0)
							fuzzyQueryStr += " or ";
						fuzzyQueryStr += "name like '%" + keyWords[i] + "%' ";
					}
					fuzzyQueryStr += ")";
					//System.out.println(fuzzyQueryStr);
				}
			}
 
			String queryString = "select  count(*) from com.gztjj.model.ExamScore  where";
			queryString += " examYearMonth='" + yearMonth + "'" + fuzzyQueryStr;
 
			List list=getHibernateTemplate().find(queryString);
			return Integer.parseInt(list.get(0).toString());
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	public List findPageResultByYearMonth(String yearMonth,String name,final int startPos,final int requestLength)
	{
		log.debug("finding all Article instances");
		try {
			String[] keyWords = null;
			String fuzzyQueryStr = "";
			if (name != null && name.trim().length() > 0) {
				keyWords = name.trim().split(" ");
				if (keyWords.length > 0) {
					fuzzyQueryStr = "and (";
					for (int i = 0; i < keyWords.length; i++) {
						if (i != 0)
							fuzzyQueryStr += " or ";
						fuzzyQueryStr += "name like '%" + keyWords[i] + "%' ";
					}
					fuzzyQueryStr += ")";
					//System.out.println(fuzzyQueryStr);
				}
			}

			String queryStr = "select new map(id,name,examYearMonth,idCardNumber,examCardNumber,amScore,pmScore) from com.gztjj.model.ExamScore  where examYearMonth='"
					+ yearMonth + "'";
			 
			queryStr += fuzzyQueryStr ;
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
    
    public ExamScore findById( java.lang.Integer id) {
        log.debug("getting ExamScore instance with id: " + id);
        try {
            ExamScore instance = (ExamScore) getHibernateTemplate().get("com.gztjj.model.ExamScore", id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    public ExamScore getExamScoreByYearAndIdCard(String yearMonth, String idCardNumber)
	{
    	log.debug("getting ExamScore instance with yearMonth: " + yearMonth+" "+idCardNumber);
        try {
        	String queryString = "from com.gztjj.model.ExamScore where examYearMonth='"+yearMonth+"' and idCardNumber='"+idCardNumber+"'";
		 	List list=getHibernateTemplate().find(queryString);
		 	if(list.size()>0) return (ExamScore)list.get(0);
		 	else return null;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
	}
    
    public ExamScore getExamScoreByYearAndExamCard(String yearMonth, String examCardNumber)
   	{
       	log.debug("getting ExamScore instance with yearMonth: " + yearMonth+" "+examCardNumber);
           try {
           	String queryString = "from com.gztjj.model.ExamScore where examYearMonth='"+yearMonth+"' and examCardNumber='"+examCardNumber+"'";
   		 	List list=getHibernateTemplate().find(queryString);
   		 	if(list.size()>0) return (ExamScore)list.get(0);
   		 	else return null;
           } catch (RuntimeException re) {
               log.error("get failed", re);
               throw re;
           }
   	}
    
	public List findAll() {
		log.debug("finding all ExamScore instances");
		try {
			String queryString = "from com.gztjj.model.ExamScore";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
	//查询所有年月
	public List queryYearMonth(){
		log.debug("finding all ExamScore YearMonth");
		try {
			String queryString = "select distinct o.examYearMonth from com.gztjj.model.ExamScore o order by o.examYearMonth desc";
		 	return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public ExamScore merge(ExamScore sub) {
        log.debug("merging ExamScore instance");
        try {
            ExamScore result = (ExamScore) getHibernateTemplate().merge(sub);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(ExamScore instance) {
        log.debug("attaching dirty ExamScore instance");
        try {
            getHibernateTemplate().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(ExamScore instance) {
        log.debug("attaching clean ExamScore instance");
        try {
            getHibernateTemplate().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

	public static ExamScoreDao getFromApplicationContext(ApplicationContext ctx) {
    	return (ExamScoreDao) ctx.getBean("ExamScoreDao");
	}
}