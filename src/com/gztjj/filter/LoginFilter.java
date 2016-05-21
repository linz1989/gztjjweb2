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
	private String forwardUrl; //重定向的页面地址
	private String adminStr;
	@Override
    public void init(FilterConfig filterConfig) throws ServletException 
    {
		forwardUrl = filterConfig.getInitParameter("redirectUrl");
		//System.out.println("forwardUrl："+forwardUrl);
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
        // 获得在下面代码中要用的request,response,session对象
        HttpServletRequest servletRequest = (HttpServletRequest) request;
        HttpServletResponse servletResponse = (HttpServletResponse) response;
        HttpSession session = servletRequest.getSession();
        // 获得用户请求的URI
        String path = servletRequest.getRequestURI();
        //System.out.println("用户请求的URI："+path);
         
        // 登陆页面无需过滤
        if(path.indexOf("/login.html") >=0 || path.indexOf("/"+adminStr)<0) {
        	//System.out.println("登陆页面无需过滤");
            chain.doFilter(servletRequest, servletResponse);
            return;
        }
        // 从session里取用户的ID
        String userId = (String) session.getAttribute("userID");
        //System.out.println("取session:"+session.getId()+" userId:"+userId);

        // 判断如果没有取到员工信息,就跳转到登陆页面
        if (userId == null || "".equals(userId)) {
            // 跳转到登陆页面
        	String url="http://"+servletRequest.getHeader("Host")+forwardUrl;
        	//System.out.println("跳转到登陆页面:"+url);
            servletResponse.sendRedirect(url);
        } else { 
            // 已经登陆,继续此次请求
            chain.doFilter(request, response); 
        }
    }

    @Override
    public void destroy() 
    {
        
    }
}