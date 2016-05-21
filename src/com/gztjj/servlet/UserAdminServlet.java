package com.gztjj.servlet;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;
import net.sf.json.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.gztjj.service.UserService;
import com.gztjj.model.UserVO;
import com.gztjj.model.User;
import com.gztjj.model.DataTableModel;

public class UserAdminServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private UserService userService=null;
	
	public UserAdminServlet() 
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
		
		if(opeType == null || opeType.equals("queryAll"))//查询所有的User
		{
			List results=userService.queryAllUser();
			ArrayList list=new ArrayList();
			int count=0;
			for(int i=0;i<results.size();i++)
			{
				User u=(User) results.get(i);
				UserVO vo=new UserVO(u);
				count++; 
				vo.setSeqNo(count);
				list.add(vo);
			}
			 
			DataTableModel model=new DataTableModel();
			model.setData(list);
			JSONObject jsonObject = JSONObject.fromObject(model); 
			//System.out.println(jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		}
		else if(opeType.equals("del"))
		{
			String userNameStr=request.getParameter("userNameArr");
			//System.out.println("userNameStr:"+userNameStr);
			String[] userNameArr=userNameStr.split(",");
			if(userService.delUsers(userNameArr) == 1)
			{
				//System.out.println("删除成功！");
				out.write("1");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("addUser"))
		{
			String userName = request.getParameter("userName");
			if(userService.userExists(userName) == false) //用户名可以使用
			{
				String realName = request.getParameter("realName");
				String userRole = request.getParameter("userRole");
				String password = request.getParameter("password");
				String userRemark = request.getParameter("userRemark");
				//System.out.println("userName:"+userName+" realName:"+realName+" userRole:"+userRole+" password:"+password+" userRemark:"+userRemark);
				
				User u = new User(userName,password,realName,userRole,new Timestamp(new Date().getTime()),null,userRemark);
				userService.saveUser(u);
				//System.out.println("用户保存成功！");
				out.write("1");
				out.flush();
				out.close();
			}
			else
			{
				//System.out.println("用户名已经存在！");
				out.write("0");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("editUser"))//修改用户
		{
			String userName = request.getParameter("userName");
			User u=userService.getUserByName(userName);
			if(u != null)
			{
				 u.setRealName(request.getParameter("realName"));
				 u.setRoleName(request.getParameter("userRole"));
				 //u.setPassWord(request.getParameter("password"));
				 u.setRemark(request.getParameter("userRemark"));
				 userService.updateUser(u);
				 //System.out.println("用户修改成功！");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else
			{
				//System.out.println("用户不存在！");
				out.write("2");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("resetUserPassword"))
		{
			String userName = request.getParameter("userName");
			User u=userService.getUserByName(userName);
			if(u != null)
			{
				u.setPassWord(request.getParameter("password"));
				userService.updateUser(u);
				 //System.out.println("用户密码重置成功！");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else{
				//System.out.println("用户密码重置失败！");
				 out.write("2");
				 out.flush();
				 out.close();
			}
		}
	}
	
	public void destroy() 
	{
		super.destroy();  
	}
}