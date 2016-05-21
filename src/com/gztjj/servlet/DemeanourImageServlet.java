package com.gztjj.servlet;

import java.util.List;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.gztjj.service.DemeanourImageService;
import com.gztjj.service.SubjectService;
import com.gztjj.model.DemeanourImage;
import com.gztjj.model.Article;
import com.gztjj.model.Subject;

public class DemeanourImageServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private DemeanourImageService service=null;
	
	public DemeanourImageServlet() 
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
		request.setCharacterEncoding("utf-8");
		//response.setCharacterEncoding("utf-8");
		 
		response.setContentType("text/javascript;charset=utf-8");
		String opeType=request.getParameter("opeType");
		//System.out.println(opeType);
		
		ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = (DemeanourImageService) ctx.getBean("DemeanourImageService");
		PrintWriter out = response.getWriter(); 
		
		if(opeType.equals("query"))//依据category查询所有的图片
		{
			String category=request.getParameter("category");
			if(!(category.length()==1 || category.length()==3)){
				throw new ServletException();
			}
			List results=service.queryAllDemeanourImage(category);
			
			SubjectService subjectService = (SubjectService) ctx.getBean("SubjectService");
			List subjectList=subjectService.queryAllSubject();
			Subject subject;
			
			for(int i=0;i<results.size();i++)
			{ 
				DemeanourImage image=(DemeanourImage)results.get(i);
				Article a=service.getArticleIdByDescribe(image.getImageDescribe());
				if(a != null)
				{
					image.setArticleId(a.getId());
					if(a.getCategory().startsWith("zt")){//如果是专题
						for(int j=0;j<subjectList.size();j++){
							subject=(Subject) subjectList.get(j);
							if(subject.getId().toString().equals(a.getCategory().substring(2))){
								image.setSubjectID(subject.getId().toString());
								image.setSubjectName(subject.getSubjectName());
								break;
							}
						}
					}
				}
			}
			String jsonStr=JSONArray.fromObject(results).toString();
			//System.out.println(jsonStr);
			out.write(jsonStr);
			out.flush();
			out.close();
		}
		else if(opeType.equals("del"))
		{
			String imageID=request.getParameter("id");//依据ID删除图片
			//System.out.println("imageID:"+imageID);
			if(service.delDemeanourImages(imageID) == 1)
			{
				//System.out.println("删除成功！");
				out.write("success");
			}
			else
			{
				//System.out.println("删除失败！");
				out.write("fault");
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("save"))//添加图片
		{
			String dataStr = URLDecoder.decode(request.getParameter("data"),"utf-8");
			//System.out.println(dataStr);
			String category = request.getParameter("category");
			//System.out.println("category:"+category);
			
			JSONArray array = JSONArray.fromObject(dataStr);
			 for(int i = 0; i < array.size(); i++){     
		            JSONObject jsonObject = array.getJSONObject(i);
		            ////System.out.println("id:"+jsonObject.get("id")+" path:"+jsonObject.get("path")+" describ:"+jsonObject.get("describ"));
		            String id=(String)jsonObject.get("id");
		            if(id== null || id.equals(""))
		            {
		            	//新增保存
		            	DemeanourImage image=new DemeanourImage();
		            	image.setImagePath((String)jsonObject.get("path"));
		            	image.setCategory(Integer.parseInt(category));
		            	image.setImageDescribe((String)jsonObject.get("describ"));
		            	service.saveDemeanourImage(image);
		            }
		            else
		            {
		            	DemeanourImage image=service.getDemeanourImageByID(id);
		            	if(image != null) 
		            	{
		            		image.setImagePath((String)jsonObject.get("path"));
			            	image.setCategory(Integer.parseInt(category));
			            	image.setImageDescribe((String)jsonObject.get("describ"));
			            	service.updateDemeanourImage(image);
		            	}
		            }
		     }
			//System.out.println("图片保存成功！");
			out.write("success"); 
			out.flush();
			out.close();
		}
	}
	
	public void destroy() 
	{
		super.destroy();  
	}
}