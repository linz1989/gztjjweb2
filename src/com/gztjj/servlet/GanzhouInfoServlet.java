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
import com.gztjj.service.GanzhouInfoService;
import com.gztjj.model.GanzhouInfo;
import com.gztjj.model.DataTableModel;

public class GanzhouInfoServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private GanzhouInfoService service=null;
	
	public GanzhouInfoServlet() 
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
		service = (GanzhouInfoService) ctx.getBean("GanzhouInfoService");
		PrintWriter out = response.getWriter(); 
		
		if(opeType == null || opeType.equals("queryAll"))//查询所有的GanzhouInfo
		{
			List results=service.queryAllGanzhouInfo();
			ArrayList list=new ArrayList();
			for(int i=0;i<results.size();i++)
			{
				GanzhouInfo u=(GanzhouInfo) results.get(i);
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
		else if(opeType.equals("delGanzhouInfo"))
		{
			String place=request.getParameter("place");
			//System.out.println("place:"+place);
			if(service.delGanzhouInfo(place) == 1)
			{
				//System.out.println("删除成功！");
				out.write("1");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("editGanzhouInfo"))//修改
		{ 
			String place = request.getParameter("place");
			GanzhouInfo u=service.getGanzhouInfoByPlace(place);
			if(u != null)
			{
				 u.setPlacePy(request.getParameter("placePy"));
				 u.setPlaceLink(request.getParameter("placeLink"));
				 service.updateGanzhouInfo(u);
				 //System.out.println("修改成功！");
				 out.write("1");
				 out.flush();
				 out.close();
			}
			else
			{
				//System.out.println("地区不存在！");
				out.write("0");
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