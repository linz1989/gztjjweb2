package com.gztjj.servlet;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
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
import javax.servlet.http.HttpSession;
import javax.servlet.ServletConfig;

import net.sf.json.JSONObject;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.gztjj.service.NoteBookService;
import com.gztjj.service.SubjectService;
import com.gztjj.model.NoteBookVO;
import com.gztjj.model.NoteBook;
import com.gztjj.model.DataTableModel;

public class NoteBookServlet extends HttpServlet {
	private static final long serialVersionUID = 7512001492425261841L;
	private NoteBookService service = null;

	public NoteBookServlet() {
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
		service = (NoteBookService) ctx.getBean("NoteBookService");
		PrintWriter out = response.getWriter();
		String opeType = request.getParameter("opeType");
		if (opeType == null || opeType.equals("queryAll"))//查询所有的NoteBook(包括私密的)
		{
			String _startPos=request.getParameter("start");//分页的起始位置
			String _requestLength=request.getParameter("length");//页的大小
			
			String isPublish=request.getParameter("isPublish");//咨询类别
			String keyWords=request.getParameter("keyWords");//搜索关键词
			
			int startPos = Integer.parseInt(_startPos);
			int requestLength = Integer.parseInt(_requestLength);
			
			String drawPage=request.getParameter("draw");//DataTable传来的参数 返回数据的时候将会把该参数传回去
			if(drawPage == null || drawPage.equals("")) drawPage="0";
			//System.out.println("drawPage:"+drawPage);
			
			List<Map> results = null;
			int totalSize = 0;
			
			results = service.findPageResult(startPos, requestLength, Integer.parseInt(isPublish), keyWords);
			totalSize = service.queryAllNoteBookTotalSize( Integer.parseInt(isPublish), keyWords);
			
			//System.out.println("results.size:" + results.size());
			ArrayList<NoteBookVO> list = new ArrayList<NoteBookVO>();
			int count=startPos;
			NoteBookVO noteBook = null;
			for (Map item : results) {
				count++; 
				noteBook  = new  NoteBookVO();
				noteBook.setSeqNo(count);
				noteBook.setId((Integer)item.get("0"));				
				noteBook.setName((String)item.get("1"));				
				noteBook.setEmail((String)item.get("2"));
				noteBook.setSex((String)item.get("3"));
				noteBook.setNoteType((String)item.get("4"));
				noteBook.setNoteTitle((String)item.get("5"));
				//noteBook.setNoteContent((String)item.get("6"));	
				noteBook.setCreateTime((Timestamp)item.get("7"));
				noteBook.setNoteSecret(false);
				//noteBook.setNoteReplayUser((String)item.get("9"));
				//noteBook.setNoteReplay((String)item.get("10"));		
				noteBook.setReplayTime((Timestamp)item.get("11"));				
				noteBook.setIsPublish((Integer)item.get("12"));				
				list.add(noteBook);
			}
			
			DataTableModel model = new DataTableModel();
			model.setData(list);
			model.setDraw(Integer.parseInt(drawPage));
			model.setRecordsTotal(totalSize);
			model.setRecordsFiltered(totalSize);
			JSONObject jsonObject = null;
			if(request.getParameter("andQuerySubject") != null){
				SubjectService subjectService = (SubjectService) ctx.getBean("SubjectService");
				List subjectResults=subjectService.queryAllSubject();
				Map map = new HashMap();
				map.put("subject", subjectResults);
				map.put("noteBook", list);
				jsonObject = JSONObject.fromObject(map);
			}
			else{
				jsonObject = JSONObject.fromObject(model);
			}
			//System.out.println(jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		} 
		else if(opeType.equals("query")){
			String _id=request.getParameter("id");//noteBook的ID值
			//System.out.println("id:"+_id);	
			int id = 0;
			try {
				id = Integer.parseInt(_id);
				NoteBook noteBook = service.getNoteBookById(id);
				NoteBookVO noteBookVO = new  NoteBookVO(noteBook);
				JSONObject jsonObject = JSONObject.fromObject(noteBookVO);
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
		else if (opeType.equals("delNoteBook")) 
		{
			String id = request.getParameter("id");
			//System.out.println("id:" + id);
			int[] ids=new int[1];
			ids[0]=Integer.parseInt(id);
			if (service.delNoteBook(ids) == 1)
			{
				//System.out.println("删除咨询成功！");
				out.write("1");
			}
			else
			{
				out.write("0");
			}
			out.flush();
			out.close();
		} 
		else if (opeType.equals("batchDelNoteBook")) 
		{
			String idsStr = request.getParameter("ids");
			//System.out.println("idsStr:" + idsStr);
			String[] idsArr = idsStr.split("-"); 
			int ids[]=new int[idsArr.length];
			for(int i=0;i<idsArr.length;i++)
			{
				ids[i]=Integer.parseInt(idsArr[i]);
			}
			
			if (service.delNoteBook(ids) == 1)
			{
				//System.out.println("删除咨询成功！");
				out.write("1");
			}
			else
			{
				out.write("0");
			}
			out.flush();
			out.close();
		} 
		else if(opeType.equals("replyNoteBook"))//留言回复操作
		{
			String id = request.getParameter("id");
			NoteBook noteBook = service.getNoteBookById(Integer.parseInt(id));
			if (noteBook != null){
				//System.out.println("回复留言"); 
				noteBook.setNoteReplayUser(request.getParameter("noteReplayUser"));
				noteBook.setNoteReplay(request.getParameter("noteReplay"));
				noteBook.setReplayTime(new Timestamp(new Date().getTime()));
				noteBook.setIsPublish(1);
				service.updateNoteBook(noteBook);
				out.write("1");
			}
			else
			{
				out.write("0");
			}
			out.flush();
			out.close();
		}
		else if (opeType.equals("editNoteBook"))
		{
			String id = request.getParameter("id");
			NoteBook noteBook = service.getNoteBookById(Integer.parseInt(id));

			if (noteBook != null){
				String noteTitle = request.getParameter("noteContent");
				if (noteTitle != null && noteTitle.length() > 0) {
					noteBook.setNoteContent(noteTitle);
					//System.out.println(noteTitle);
				}

				HttpSession session = request.getSession();
				String noteReplyUser = (String) session.getAttribute("userID");
				noteBook.setNoteReplayUser(noteReplyUser);

				String noteContent = request.getParameter("noteContent");
				if (noteContent != null && noteContent.length() > 0) {

					noteBook.setNoteContent(noteContent);
					//System.out.println(noteContent);
					
					noteBook.setNoteSecret(false);					

					String _isPublish = request.getParameter("isPublish");
					int isPublish = 0;
					try {
						isPublish = Integer.parseInt(_isPublish);
					} catch (RuntimeException e) {
						//System.out.println(e);
						isPublish = 0;
					}

					noteBook.setIsPublish(isPublish);					

					String noteReplay = request.getParameter("noteReplay");
					if (noteReplay != null) {
						noteBook.setNoteReplay(noteReplay);
						noteBook.setReplayTime(new Timestamp(new Date()
								.getTime()));
					}

					service.updateNoteBook(noteBook);
					//System.out.println("回复成功！");
					out.write("1");
					out.flush();
					out.close();
				} 
				else {
					//System.out.println("留言字数不能为0！");
					out.write("0");
					out.flush();
					out.close();
				}
			}
			else {
				//System.out.println("咨询条目不存在！");
				out.write("0");
				out.flush();
				out.close();
			}
		} 
		else if (opeType.equals("saveNoteBook"))// 匿名留言
		{
			NoteBook noteBook = new NoteBook();
			String name = request.getParameter("name");
			//System.out.println(name);
			noteBook.setName(name);

			String email = request.getParameter("email");
			//System.out.println(email);
			noteBook.setEmail(email);

			String sex = request.getParameter("sex");
			//System.out.println(sex);
			noteBook.setSex(sex);

			String noteType = "一般留言";
			noteBook.setNoteType(noteType);

			String noteTitle = request.getParameter("noteTitle");
			//System.out.println(noteTitle);
			noteBook.setNoteTitle(noteTitle);

			String noteContent = request.getParameter("noteContent");
			//System.out.println(noteContent);
			noteBook.setNoteContent(noteContent);
			noteBook.setNoteSecret(false);

			noteBook.setCreateTime(new Timestamp(new Date().getTime()));
			noteBook.setIsPublish(0);

			service.saveNoteBook(noteBook);
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