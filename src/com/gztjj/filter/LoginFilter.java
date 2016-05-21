package com.gztjj.filter;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Properties;

public class LoginFilter implements Filter 
{
	private String forwardUrl; //�ض����ҳ���ַ
	private String adminStr;
	@Override
    public void init(FilterConfig filterConfig) throws ServletException 
    {
		forwardUrl = filterConfig.getInitParameter("redirectUrl");
		//System.out.println("forwardUrl��"+forwardUrl);
		Properties prop = new Properties();
		try{
			InputStream in = getClass().getResourceAsStream("/com/gztjj/admin.properties");
	        prop.load(in);
	        adminStr = prop.getProperty ("name");
	       // System.out.println("admin Name:"+adminStr);   
	    }
		catch (Exception e) {
	          e.printStackTrace(); 
	   }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException 
    {
        // ��������������Ҫ�õ�request,response,session����
        HttpServletRequest servletRequest = (HttpServletRequest) request;
        HttpServletResponse servletResponse = (HttpServletResponse) response;
        HttpSession session = servletRequest.getSession();
        // ����û������URI
        String path = servletRequest.getRequestURI();
        //System.out.println("�û������URI��"+path);
         
        // ��½ҳ���������
        if(path.indexOf("/login.html") >=0 || path.indexOf("/"+adminStr)<0) {
        	//System.out.println("��½ҳ���������");
            chain.doFilter(servletRequest, servletResponse);
            return;
        }
        // ��session��ȡ�û���ID
        String userId = (String) session.getAttribute("userID");
        //System.out.println("ȡsession:"+session.getId()+" userId:"+userId);

        // �ж����û��ȡ��Ա����Ϣ,����ת����½ҳ��
        if (userId == null || "".equals(userId)) {
            // ��ת����½ҳ��
        	String url="http://"+servletRequest.getHeader("Host")+forwardUrl;
        	//System.out.println("��ת����½ҳ��:"+url);
            servletResponse.sendRedirect(url);
        } else { 
            // �Ѿ���½,�����˴�����
            chain.doFilter(request, response); 
        }
    }

    @Override
    public void destroy() 
    {
        
    }
}