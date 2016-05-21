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
import javax.servlet.http.HttpSession;
import javax.servlet.ServletConfig;
import net.sf.json.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.gztjj.service.RoleService;
import com.gztjj.model.Role;
import com.gztjj.model.RoleVO;
import com.gztjj.model.DataTableModel;

public class RoleAdminServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private RoleService service=null;
	
	public RoleAdminServlet() 
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
		service = (RoleService) ctx.getBean("RoleService");
		PrintWriter out = response.getWriter(); 
		
		if(opeType == null || opeType.equals("queryAll"))//��ѯ���е�Role
		{
			List results=service.queryAllRole();
			ArrayList list=new ArrayList();
			int count=0;
			for(int i=0;i<results.size();i++)
			{
				Role u=(Role) results.get(i);
				RoleVO vo=new RoleVO(u);
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
		else if(opeType.equals("delRole"))
		{
			String RoleNameStr=request.getParameter("roleNameArr");
			//System.out.println("roleNameArr:"+RoleNameStr);
			String[] RoleNameArr=RoleNameStr.split(",");
			if(service.delRoles(RoleNameArr) == 1)
			{
				//System.out.println("ɾ���ɹ���");
				out.write("1");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("addRole"))
		{
			String roleName = request.getParameter("roleName");
			HttpServletRequest servletRequest = (HttpServletRequest) request;
			HttpSession session = servletRequest.getSession();
			
			if(service.RoleExists(roleName) == false) //��ɫ������ʹ��
			{
				String roleFunction = request.getParameter("roleFunction");
				Role r = new Role(roleName,roleFunction,(String) session.getAttribute("userID"),new Timestamp(new Date().getTime()));
				service.saveRole(r);
				//System.out.println("��ɫ����ɹ���");
				out.write("1"); 
				out.flush();
				out.close();
			}
			else
			{
				//System.out.println("��ɫ���Ѿ����ڣ�");
				out.write("0");//��ͻ
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("editRole"))//�޸Ľ�ɫ
		{ 
			String RoleName = request.getParameter("roleName");
			Role u=service.getRoleByName(RoleName);
			if(u != null)
			{
				 u.setRoleFunction(request.getParameter("roleFunction"));
				 service.updateRole(u);
				 //System.out.println("��ɫ�޸ĳɹ���");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else
			{
				//System.out.println("��ɫ�����ڣ�");
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