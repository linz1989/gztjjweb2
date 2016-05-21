package com.gztjj.servlet;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.gztjj.service.OpinionsService;
import com.gztjj.model.Opinions;
import com.gztjj.model.OpinionsVO;
import com.gztjj.model.DataTableModel;

public class OpinionsServlet extends HttpServlet {
	private static final long serialVersionUID = 7512001492425261841L;
	private OpinionsService service = null;

	public OpinionsServlet() {
		super();
	}

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException 
	{
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
	{
		response.setContentType("text/javascript;charset=utf-8");
		
		ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		service = (OpinionsService) ctx.getBean("OpinionsService");
		PrintWriter out = response.getWriter();
		String opeType = request.getParameter("opeType");
		if (opeType == null || opeType.equals("queryAll"))//查询所有的opinions
		{
			String _startPos=request.getParameter("start");//分页的起始位置
			//System.out.println("startPos:"+_startPos);
			
			String _requestLength=request.getParameter("length");//页的大小
			//System.out.println("requestLength:"+_requestLength);
			
			String lineNums=request.getParameter("lineNums");
			int lineWordsNum=1000;
			if(lineNums != null && !lineNums.equals("")){
				lineWordsNum=Integer.parseInt(lineNums);
			}
			
			String isPublic=request.getParameter("isPublic");
			String articleId=request.getParameter("articleId");//征集文章id
			
			int startPos = Integer.parseInt(_startPos);
			int requestLength = Integer.parseInt(_requestLength);
			
			String drawPage=request.getParameter("draw");//DataTable传来的参数 返回数据的时候将会把该参数传回去
			if(drawPage == null || drawPage.equals("")) drawPage="0";
			//System.out.println("drawPage:"+drawPage);
			
			List<Opinions> results = null;
			int totalSize = 0;
			
			results = service.findPageResultByArticleId(articleId, startPos, requestLength, isPublic);
			totalSize = service.findTotalSizeByArticleId(articleId, isPublic);
			
			//System.out.println("results.size:" + results.size());
			ArrayList<OpinionsVO> list = new ArrayList<OpinionsVO>();
			int count=startPos;
			for (Opinions item : results) {
				count++; 
				OpinionsVO opinions  = new  OpinionsVO(item);
				opinions.setSeqNo(count);
				list.add(opinions);
			}
			
			DataTableModel model = new DataTableModel();
			model.setData(list);
			model.setDraw(Integer.parseInt(drawPage));
			model.setRecordsTotal(totalSize);
			model.setRecordsFiltered(totalSize);
			
			JSONObject jsonObject = JSONObject.fromObject(model);
			//System.out.println(jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		} 
		else if(opeType.equals("queryAllRecords")){
			String isPublic=request.getParameter("isPublic");
			String articleId=request.getParameter("articleId");//征集文章id
			List<Opinions> results = null;
			results = service.findAll(articleId, isPublic);
			//System.out.println(results.size());
			ArrayList<OpinionsVO> list = new ArrayList<OpinionsVO>();
			for (Opinions item : results) {
				OpinionsVO opinions  = new  OpinionsVO(item);
				list.add(opinions);
			}
			DataTableModel model = new DataTableModel();
			model.setData(list);
			JSONObject jsonObject = JSONObject.fromObject(model);
			//System.out.println(jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		}
		else if(opeType.equals("query")){
			String _id=request.getParameter("id");//ID值
			//System.out.println("id:"+_id);
			int id = 0;
			try {
				id = Integer.parseInt(_id);
				Opinions opinions = service.getOpinionsById(id);
				OpinionsVO opinionsVO = new  OpinionsVO(opinions);
				JSONObject jsonObject = JSONObject.fromObject(opinionsVO);
				//System.out.println(jsonObject.toString());
				out.write(jsonObject.toString());
				out.flush();
				out.close();
			} catch (Exception e) {
				out.write("请求参数错处.");
				out.flush();
				out.close();
			}			
		}
		else if (opeType.equals("delOpinions")) //单个删除
		{
			String id = request.getParameter("id");
			//System.out.println("id:" + id);
			int[] ids=new int[1];
			ids[0]=Integer.parseInt(id);
			Map<String,String> map=new HashMap<String,String>(); 
			if (service.delOpinions(ids) == 1)
			{
				map.put("result","1");
			}
			else
			{
				map.put("result","0");
			}
			JSONObject jsonObject = JSONObject.fromObject(map);
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		} 
		else if (opeType.equals("batchDelOpinions")) //批量删除
		{
			String idsStr = request.getParameter("ids");
			//System.out.println("idsStr:" + idsStr);
			String[] idsArr = idsStr.split("-"); 
			int ids[]=new int[idsArr.length];
			for(int i=0;i<idsArr.length;i++)
			{
				ids[i]=Integer.parseInt(idsArr[i]);
			}
			Map<String,String> map=new HashMap<String,String>(); 
			if (service.delOpinions(ids) == 1)
			{
				map.put("result","1");
			}
			else
			{
				map.put("result","0");
			}
			JSONObject jsonObject = JSONObject.fromObject(map);
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		}
		else if (opeType.equals("changePublished"))
		{
			String id = request.getParameter("id");
			Opinions o = service.getOpinionsById(Integer.parseInt(id));
			if (o != null){
				String isPublic = request.getParameter("isPublic");
				if (isPublic != null){
					o.setIsPublished(isPublic);
				}
				service.updateOpinions(o);
				out.write("1");
				out.flush();
				out.close();
			 }
		} 
		else if (opeType.equals("saveOpinions"))//保存
		{
			Opinions o = new Opinions();
			o.setArticleId(Integer.parseInt(request.getParameter("articleId")));
			o.setNickName(request.getParameter("nickName"));
			o.setSubject(request.getParameter("subject"));
			o.setEmail(request.getParameter("email"));
			o.setTel(request.getParameter("tel"));
			o.setAddress(request.getParameter("address"));
			o.setContent(request.getParameter("content"));
			o.setIsPublished(request.getParameter("isPublished"));
			o.setCreateTime(new Timestamp(new Date().getTime()));

			service.saveOpinions(o);
			//System.out.println("保存成功！");
			out.write("1");
			out.flush();
			out.close();
		}
	}
	
	public void destroy() {
		super.destroy();
	}
}