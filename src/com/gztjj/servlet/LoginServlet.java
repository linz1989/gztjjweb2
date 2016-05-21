package com.gztjj.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletConfig;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.gztjj.service.UserService;
import net.sf.json.JSONObject;
import java.util.HashMap;
import java.util.Map;

public class LoginServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private UserService userService=null;
	
	public LoginServlet() 
	{ 
		super();
	}
	 
	public void init(ServletConfig config) throws ServletException 
	{
		super.init(config); 
	} 

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{ 
		response.setContentType("text/javascript;charset=utf-8");
		String opeType=request.getParameter("opeType");
		ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		userService = (UserService) ctx.getBean("UserService");
		PrintWriter out = response.getWriter(); 
		
		if(opeType.equals("login"))//登陆的用户名和密码验证
		{
			String userName= request.getParameter("userName").trim();
			String passWord= request.getParameter("passWord");
			//System.out.println("UserName:"+userName+"  pass:"+passWord);

			int validateState=userService.userLogin(userName,passWord);
			//System.out.println("登陆验证："+validateState);
			if(validateState == 0)//用户登录成功，设置session
			{ 
				HttpSession  session=request.getSession();
				session.setAttribute("userID", userName);
				////System.out.println("HttpSession:"+session.getMaxInactiveInterval()+" "+session.getId()+" userID:"+session.getAttribute("userID"));
			}  
			
			out.print(validateState);
			out.flush();
			out.close();
		}
		else if(opeType.equals("getUserName"))//获取用户名
		{
			//System.out.println("获取用户名。。。");
			Map map=new HashMap();
			HttpSession  session=request.getSession();
			map.put("userName", session.getAttribute("userID"));
			out.print(JSONObject.fromObject(map).toString());
			//System.out.println(JSONObject.fromObject(map).toString());
			out.flush(); 
			out.close();
		}
		else if(opeType.equals("changePassword"))//修改密码的操作
		{
			String oldPassword=request.getParameter("oldPassword");
			String newPassword=request.getParameter("newPassword");
			//System.out.println("oldPassword:"+oldPassword+" newPassword:"+newPassword);
			HttpSession  session=request.getSession();
			String userName=(String) session.getAttribute("userID");
			int state=-1;
			if(userService.userLogin(userName,oldPassword) != 0)
			{
				state=1;//旧密码输入错误
			}
			else
			{
				state=userService.changePassword(userName,newPassword);//0代表保存成功
			}
			out.print(state);
			out.flush();
			out.close();
		}
	}
	
	public void destroy() 
	{
		super.destroy();  
	}
}