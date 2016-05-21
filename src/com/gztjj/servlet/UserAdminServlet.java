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
		
		if(opeType == null || opeType.equals("queryAll"))//��ѯ���е�User
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
				//System.out.println("ɾ���ɹ���");
				out.write("1");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("addUser"))
		{
			String userName = request.getParameter("userName");
			if(userService.userExists(userName) == false) //�û�������ʹ��
			{
				String realName = request.getParameter("realName");
				String userRole = request.getParameter("userRole");
				String password = request.getParameter("password");
				String userRemark = request.getParameter("userRemark");
				//System.out.println("userName:"+userName+" realName:"+realName+" userRole:"+userRole+" password:"+password+" userRemark:"+userRemark);
				
				User u = new User(userName,password,realName,userRole,new Timestamp(new Date().getTime()),null,userRemark);
				userService.saveUser(u);
				//System.out.println("�û�����ɹ���");
				out.write("1");
				out.flush();
				out.close();
			}
			else
			{
				//System.out.println("�û����Ѿ����ڣ�");
				out.write("0");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("editUser"))//�޸��û�
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
				 //System.out.println("�û��޸ĳɹ���");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else
			{
				//System.out.println("�û������ڣ�");
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
				 //System.out.println("�û��������óɹ���");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else{
				//System.out.println("�û���������ʧ�ܣ�");
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