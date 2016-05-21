package com.gztjj.servlet;

import java.util.ArrayList;
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
import com.gztjj.service.SubjectService;
import com.gztjj.model.Subject;
import com.gztjj.model.DataTableModel;

public class SubjectServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private SubjectService service = null;
	
	public SubjectServlet() 
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
		service = (SubjectService) ctx.getBean("SubjectService");
		PrintWriter out = response.getWriter(); 
		
		if(opeType == null || opeType.equals("queryAll"))//查询所有的Subject
		{
			List results=service.queryAllSubject();
			//System.out.println("results.size:"+results.size());
			ArrayList list=new ArrayList();
			Subject u = null;
			for(int i=0;i<results.size();i++)
			{
				u=(Subject) results.get(i);
				u.setSqeNo(i+1);
				list.add(u);
			}
			DataTableModel model=new DataTableModel();
			model.setData(list);
			JSONObject jsonObject = JSONObject.fromObject(model); 
			//System.out.println(jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		}
		else if(opeType.equals("delSubject"))
		{
			String id=request.getParameter("id");
			//System.out.println("id:"+id);
			if(service.delSubject(Integer.parseInt(id)) == 1)
			{
				//System.out.println("删除专题成功！");
				out.write("1");
			}
			else
			{
				out.write("0");
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("editSubject"))//修改
		{ 
			String id = request.getParameter("id");
			Subject u=service.getSubjectById(Integer.parseInt(id));
			if(u != null)
			{
				 u.setSubjectName(request.getParameter("subjectName"));
				 u.setImagePath(request.getParameter("imagePath"));
				 u.setIsMain(request.getParameter("isMain"));
				 u.setIsOutLink(request.getParameter("isOutLink"));
				 u.setOutLink(request.getParameter("outLink"));
				 service.updateSubject(u);
				 //System.out.println("修改成功！");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else
			{
				//System.out.println("专题不存在！");
				out.write("0");
				out.flush();
				out.close();
			}
		  }
		  else if(opeType.equals("saveSubject"))//保存
		  {
			  Subject u= new Subject();
			  u.setSubjectName(request.getParameter("subjectName"));
			  u.setImagePath(request.getParameter("imagePath"));
			  u.setIsMain(request.getParameter("isMain"));
			  u.setIsOutLink(request.getParameter("isOutLink"));
			  u.setOutLink(request.getParameter("outLink"));
			  service.saveSubject(u);
			  //System.out.println("保存成功！");
			  out.write("1"); 
			  out.flush();
			  out.close();
		 } 
	}
	
	public void destroy() 
	{
		super.destroy();  
	}
}