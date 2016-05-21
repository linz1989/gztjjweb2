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

import com.gztjj.model.NoteBook;
import com.gztjj.util.PageNoUtil;

/**
 * A data access object (DAO) providing persistence and search support for
 * NoteBook entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see .NoteBook
 * @author MyEclipse Persistence Tools
 */

public class NoteBookDao extends HibernateDaoSupport {
	private static final Logger log = LoggerFactory
			.getLogger(NoteBookDao.class);
	// property constants
	public static final String NoteBook_FUNCTION = "NoteBookFunction";

	protected void initDao() {
		// do nothing
	}

	public void save(NoteBook transientInstance) {
		log.debug("saving NoteBook instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(NoteBook persistentInstance) {
		log.debug("deleting NoteBook instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public NoteBook findById(java.lang.Integer id) {
		log.debug("getting NoteBook instance with id: " + id);
		try {
			NoteBook instance = (NoteBook) getHibernateTemplate().get(
					"com.gztjj.model.NoteBook", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}	

	public List findAll() {
		log.debug("finding all NoteBook instances");
		try {
			String queryString = "from com.gztjj.model.NoteBook";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public int queryAllNoteBookTotalSize(int isPublic,String keyWord) {
		try {
			String[] keyWords = null;
			String fuzzyQueryStr = "";
			if (keyWord != null && keyWord.trim().length() > 0) {
				keyWords = keyWord.trim().split(" ");
				if (keyWords.length > 0) {
					fuzzyQueryStr = " ( ";
					for (int i = 0; i < keyWords.length; i++) {
						if (i != 0)
							fuzzyQueryStr += " or ";
						fuzzyQueryStr += "noteTitle like '%" + keyWords[i] + "%' ";
					}
					fuzzyQueryStr += " ) ";
					//System.out.println(fuzzyQueryStr);
				}
			}
			
			String queryStr = "select count(*) from com.gztjj.model.NoteBook ";
			if(isPublic != 2)
			{
				queryStr +=" where isPublish='" + isPublic + "'";
			}
			
			if(!fuzzyQueryStr.equals("")){
				if(isPublic != 2){
					queryStr+=" and "+fuzzyQueryStr;
				}
				else queryStr+="where "+fuzzyQueryStr;
			}
			//System.out.println(queryStr);
			List list=getHibernateTemplate().find(queryStr);
			return Integer.parseInt(list.get(0).toString());
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re; 
		}
	}

	public List findPageResult(final int startPos, final int requestLength,int isPublic,String keyWord) {
		try {
			String[] keyWords = null;
			String fuzzyQueryStr = "";
			if (keyWord != null && keyWord.trim().length() > 0) {
				keyWords = keyWord.trim().split(" ");
				if (keyWords.length > 0) {
					fuzzyQueryStr = " ( ";
					for (int i = 0; i < keyWords.length; i++) {
						if (i != 0)
							fuzzyQueryStr += " or ";
						fuzzyQueryStr += "noteTitle like '%" + keyWords[i] + "%' ";
					}
					fuzzyQueryStr += " ) ";
					//System.out.println(fuzzyQueryStr);
				}
			}
			
			String queryStr = "select new map(id,name,email,sex,noteType,"
					+ "noteTitle,noteContent,createTime,noteSecret,noteReplayUser,noteReplay,"
					+ "replayTime,isPublish) from com.gztjj.model.NoteBook ";
			if(isPublic != 2)
			{
				queryStr +=" where isPublish='" + isPublic + "'";
			}
			
			if(!fuzzyQueryStr.equals("")){
				if(isPublic != 2){
					queryStr+=" and "+fuzzyQueryStr;
				}
				else queryStr+="where "+fuzzyQueryStr;
			}
			queryStr+=" order by createTime desc ";
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

	public NoteBook merge(NoteBook sub) {
		log.debug("merging NoteBook instance");
		try {

			NoteBook result = (NoteBook) getHibernateTemplate().merge(sub);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(NoteBook instance) {
		log.debug("attaching dirty NoteBook instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(NoteBook instance) {
		log.debug("attaching clean NoteBook instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static NoteBookDao getFromApplicationContext(ApplicationContext ctx) {
		return (NoteBookDao) ctx.getBean("NoteBookDao");
	}
}