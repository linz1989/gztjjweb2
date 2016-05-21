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
import com.gztjj.service.DishonestyNoticeService;
import com.gztjj.model.DishonestyNotice;
import com.gztjj.model.DataTableModel;

public class DishonestyNoticeServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private DishonestyNoticeService service=null;
	
	public DishonestyNoticeServlet() 
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
		service = (DishonestyNoticeService) ctx.getBean("DishonestyNoticeService");
		PrintWriter out = response.getWriter(); 
		
		if(opeType == null || opeType.equals("queryAll"))//查询所有的
		{
			List results=service.queryAll();
			ArrayList list=new ArrayList();
			DishonestyNotice u = null;
			for(int i=0;i<results.size();i++)
			{
				u=(DishonestyNotice) results.get(i);
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
		else if(opeType.equals("queryByType"))//依据类型查询
		{
			String type = request.getParameter("type");
			List results=service.queryDishonestyNoticeByType(type);
			ArrayList list=new ArrayList();
			int count=0;
			DishonestyNotice u = null;
			for(int i=0;i<results.size();i++)
			{
				u=(DishonestyNotice) results.get(i);
				count++;
				u.setSeqNo(count);
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
		else if(opeType.equals("delDisNotice"))//删除
		{
			String disNoticeStr=request.getParameter("disNoticeArr");
			String[] disNoticeArr=disNoticeStr.split(",");
			if(service.delDishonestyNotices(disNoticeArr) == 1)
			{
				out.write("1");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("addDisNotice"))//增加
		{
			DishonestyNotice u=new DishonestyNotice(Integer.parseInt(request.getParameter("type")),request.getParameter("placeName"),request.getParameter("link"));
			service.saveDishonestyNotice(u);
			out.write("1");
			out.flush();
			out.close();
		}
		else if(opeType.equals("editDisNotice"))//修改
		{  
			DishonestyNotice u = service.getDishonestyNoticeByID(request.getParameter("id"));
			u.setLink(request.getParameter("link"));
			u.setPlaceName(request.getParameter("placeName"));
			service.updateDishonestyNotice(u);
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