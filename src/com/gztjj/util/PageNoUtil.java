package com.gztjj.util;

import java.util.List;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateTemplate;

public class PageNoUtil
{
 
/**
 * * @param             session :һ���Ự
 * * @param            hql:����Ҫִ�е�hql��䣬
   * @param            offset ���ÿ�ʼλ��
   * @param              length:��ȡ��¼����
   * return             ���ؽ����List<?>��ʾһ�����͵�List
*/

    public static List<?> getList( Session session,String hql,int offset,int length)
    {
    	Query q = session.createQuery(hql);
    	q.setFirstResult(offset);
    	q.setMaxResults(length);
    	List<?> list = q.list(); 
    	 
    	//System.out.println("ȡ����ÿҳ��size"+list.size());
    	return list;
    }
}