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
import javax.servlet.ServletConfig;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.gztjj.model.Article;
import com.gztjj.model.ArticleVO;
import com.gztjj.model.DataTableModel;
import com.gztjj.service.ArticleService;
import javax.servlet.http.HttpSession;
import com.gztjj.model.Subject;
import com.gztjj.service.SubjectService;

public class ArticleServlet extends HttpServlet
{
	private static final long serialVersionUID = 7512001492425261841L;
	private ArticleService service;
	
	public ArticleServlet()
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
		service=(ArticleService)ctx.getBean("ArticleService");
		
		PrintWriter out = response.getWriter();
		if(opeType.equals("editArticle"))//�༭����
		{
			String id=request.getParameter("id");
			Article article=service.getArticleById(Integer.parseInt(id));
			Map<String,String> map=new HashMap<String,String>(); 
			if(article != null)
			{
				if(request.getParameter("title") !=null && request.getParameter("title").length() != 0) article.setTitle(request.getParameter("title"));
				if(request.getParameter("origin")!=null && request.getParameter("origin").length() !=0) article.setOrigin(request.getParameter("origin"));
				if(request.getParameter("author")!=null && request.getParameter("author").length()!=0) article.setAuthor(request.getParameter("author"));
				if(request.getParameter("content")!=null && request.getParameter("content").length()!=0) article.setContent(request.getParameter("content"));
				if(request.getParameter("category")!=null && request.getParameter("category").length()!=0) article.setCategory(request.getParameter("category"));
				service.updateArticle(article);
				
				//System.out.println("���±���ɹ���");
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else
			{
				//System.out.println("�����²����ڣ�");
				map.put("result","0");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("addNewArticle"))//��������ӵ�����
		{
			Article article=new Article();
			article.setAddTime(new Timestamp(new Date().getTime()));
			HttpSession  session=request.getSession();
			String userName=(String) session.getAttribute("userID");
			article.setAddUser(userName);
			article.setAuthor(request.getParameter("author"));
			article.setBrowseCount(0);
			article.setCategory(request.getParameter("category"));
			article.setContent(request.getParameter("content"));
			article.setIsPublished("0");
			article.setKeyWords("");
			article.setOrigin(request.getParameter("origin"));
			article.setTitle(request.getParameter("title"));
			Map<String,String> map=new HashMap<String,String>(); 
			if(service.saveArticle(article)==1)//��������³ɹ�
			{
				//System.out.println("��������³ɹ�");
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else
			{
				//System.out.println("���������ʧ��");
				map.put("result","0");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush(); 
			out.close();
		}
		else if(opeType.equals("delArticle"))//�������µ�id,ɾ������
		{
			String id=request.getParameter("id");
			//System.out.println("ɾ�����£�"+id);
			Map<String,String> map=new HashMap<String,String>(); 
			int[] ids=new int[1];
			ids[0]=Integer.parseInt(id);
			if(service.delArticle(ids) == 1)
			{
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else
			{
				map.put("result","0");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("batchDel"))//����ɾ��
		{
			String idStr=request.getParameter("ids");
			//System.out.println("����ɾ�����£�"+idStr);
			Map<String,String> map=new HashMap<String,String>(); 
			String[] idStrArr=idStr.split("-");
			int[] ids=new int[idStrArr.length];
			for(int i=0;i<idStrArr.length;i++){
				ids[i]=Integer.parseInt(idStrArr[i]);
			}
			if(service.delArticle(ids) == 1)
			{
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else 
			{
				map.put("result","0");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("publishArticle"))//��������
		{
			String id=request.getParameter("id");
			//System.out.println("�������£�"+id);
			Map<String,String> map=new HashMap<String,String>(); 
			
			if(service.publishArticle(Integer.parseInt(id)) == 1)
			{
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else
			{
				map.put("result","0");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("queryArticleById"))
		{
			String id=request.getParameter("id");
			String querySameCategory=request.getParameter("querySameCategory");
			if(querySameCategory == null || querySameCategory.equals("")) querySameCategory="0";
			Article article=service.getArticleById(Integer.parseInt(id));
			if(article != null)
			{
				//System.out.println("�ҵ����£�");
				
				//���������1
				HttpSession  session=request.getSession();
				String userName=(String) session.getAttribute("userID");
				if(userName == null){ 
					article.setBrowseCount(article.getBrowseCount()+1);
					service.updateArticle(article);  
				}
				 
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				HashMap<String,String> map=new HashMap<String,String>();
				map.put("id",article.getId().toString());
				map.put("title",article.getTitle());
				map.put("content",article.getContent());
				map.put("origin",article.getOrigin());
				map.put("author",article.getAuthor());
				map.put("addUser",article.getAddUser());
				if(article.getAddTime() != null) map.put("addTime",formatter.format(article.getAddTime()));
				else map.put("addTime","");
				map.put("keyWords",article.getKeyWords());
				map.put("category",article.getCategory());
				map.put("isPublished",article.getIsPublished());
				if(article.getIsPublished().equals("1"))
				{
					if(article.getPublishTime() != null) map.put("publishTime",formatter.format(article.getPublishTime()));
					else map.put("publishTime","");
					map.put("browseCount",article.getBrowseCount().toString());
				}
				
				if(querySameCategory.equals("1")){ //��ѯͬ������
					List sameCategoryList=service.querySameCategoryArticle(article.getCategory(),article.getId());
					for(int k=0;k<sameCategoryList.size();k++){
						Article a2=(Article) sameCategoryList.get(k);
						map.put("sameCategoryArticle_"+k+"_id", a2.getId().toString());
						map.put("sameCategoryArticle_"+k+"_title", a2.getTitle());
					}
				}
				JSONObject jsonObject = JSONObject.fromObject(map);
				//System.out.println(jsonObject.toString());
				out.write(jsonObject.toString());
				out.flush();
				out.close();
			}
			else
			{
				//System.out.println("���²����ڣ�");
				out.write("0");
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("queryHomeArticleData")){//��ҳ���²�ѯ
			//System.out.println("queryHomeArticleData");

			List result = service.queryHomeArticleData();
			ArrayList list = new ArrayList();
			Article a = null;
			ArticleVO vo = null;
			for (int i = 0; i < result.size(); i++) {
				a = (Article) result.get(i);
				vo = new ArticleVO();
				vo.setId(a.getId());
				vo.setCategory(a.getCategory());
				vo.setPublishTime(a.getPublishTime());
				vo.setTitle(a.getTitle());
				list.add(vo);
			}
			String jsonStr = JSONArray.fromObject(list).toString();
			//System.out.println(jsonStr);
			out.write(jsonStr);
			out.flush();
			out.close();
		}
		else if(opeType.equals("queryPublicArticleListByCategory"))//��ѯ�ѷ��������---��ҳģ��
		{
			//��ѯ���·����queryNum��Ŀ�������б���Ϣ
			String category=request.getParameter("category");
			if(category.length()!=6){
				throw new ServletException();
			}
			//System.out.println("category:"+category);
			String queryNum=request.getParameter("queryNum");//������Ŀ
			//System.out.println("queryNum:"+queryNum);
			String lineWordsNum=request.getParameter("lineWordsNum");//ÿ�е��������
			//System.out.println("lineWordsNum:"+lineWordsNum);
			
			if(queryNum != null && !queryNum.trim().equals("") && Integer.parseInt(queryNum)>0)
			{
				List result=service.queryPublicArticleListByCategory(category,Integer.parseInt(queryNum));
				//System.out.println("��ѯ�Ľ����Ŀ��"+result.size());
				ArrayList list=new ArrayList();
				for(int i=0;i<result.size();i++) 
				{
					Article a=(Article)result.get(i);
					ArticleVO vo=new ArticleVO(); 
					vo.setId(a.getId());
					vo.setCategory(a.getCategory());
					vo.setPublishTime(a.getPublishTime());
					if(a.getTitle().length()>Integer.parseInt(lineWordsNum))
					{
						vo.setTitle(a.getTitle().substring(0,Integer.parseInt(lineWordsNum)-1)+"...");
					}
					else vo.setTitle(a.getTitle());
					list.add(vo);
				}
				String jsonStr=JSONArray.fromObject(list).toString();
				//System.out.println(jsonStr);
				
				out.write(jsonStr);
				out.flush();
				out.close();
			}
			else
			{
				//System.out.println("��ѯ����");
				out.write("0");
				out.flush(); 
				out.close();
			}
		}		
		else if(opeType == null || opeType.equals("queryArticleListByCategory"))//����category���������б�
		{
			String category=request.getParameter("category");//�������
			//System.out.println("category:"+category);
			if(category.length()!=0 && category.length()>6){
				throw new ServletException();
			}
			String searchKeyWords=request.getParameter("searchKeyWords");//���˵Ĺؼ���
			//System.out.println("searchKeyWords:"+searchKeyWords);
			
			String _startPos=request.getParameter("start");//��ҳ����ʼλ��
			//System.out.println("startPos:"+_startPos);
			String _requestLength=request.getParameter("length");//ҳ�Ĵ�С
			//System.out.println("requestLength:"+_requestLength);
			int startPos = Integer.parseInt(_startPos);
			int requestLength = Integer.parseInt(_requestLength);
			String drawPage=request.getParameter("draw");//DataTable�����Ĳ��� �������ݵ�ʱ�򽫻�Ѹò�������ȥ
			if(drawPage == null || drawPage.equals("")) drawPage="0";
			//System.out.println("drawPage:"+drawPage);
			String isPublic=request.getParameter("isPublic");//�Ƿ��ѯ�ѷ����
			if(isPublic == null || isPublic.equals("")) isPublic="2";//2��ʾ�ѷ������δ���� ������
			//System.out.println("isPublic:"+isPublic);
			
			String lineWordsNum=request.getParameter("lineWordsNum");//ÿ�е��������
			//System.out.println("lineWordsNum:"+lineWordsNum);
			if(lineWordsNum == null || lineWordsNum.equals("")) lineWordsNum="1000";
			
			List<Map> results = null;
			int totalSize = 0;
			if(category != null && !category.equals(""))
			{				
				results=service.queryAllArticleByCategory(category,searchKeyWords,startPos,requestLength,isPublic);
				totalSize=service.findTotalSizeByCategory(category,searchKeyWords,isPublic);
			}
			else if(searchKeyWords != null && !searchKeyWords.equals("") )
			{
				results = service.queryArticleByTitleKeywords(searchKeyWords, startPos, requestLength);
				totalSize = service.findTotalSizeByKeyWords(searchKeyWords);
			}			
			if(results != null)
			{
				SubjectService subjectService = (SubjectService) ctx.getBean("SubjectService");
				List subjectList=subjectService.queryAllSubject();
				Subject subject;
			    //System.out.println("resultsSize:"+results.size());
				ArrayList list=new ArrayList();
				int count=startPos;
				for(Map item : results)
				{
					count++;
					ArticleVO vo=new ArticleVO();
					vo.setSeqNo(count);
					vo.setId((Integer)item.get("0"));
					String title=(String)item.get("1");
					if(title.length()>Integer.parseInt(lineWordsNum)){
						title=title.substring(0, Integer.parseInt(lineWordsNum))+"...";
					}
					vo.setTitle(title);
					vo.setBrowseCount((Integer)item.get("2"));
					vo.setOrigin((String)item.get("3"));
					vo.setAuthor((String)item.get("4"));
					vo.setAddUser((String)item.get("5"));
					vo.setAddTime((Timestamp)item.get("6"));
					vo.setPublishTime((Timestamp)item.get("7"));
					vo.setKeyWords((String)item.get("8"));
					vo.setCategory((String)item.get("9"));
					
					if(vo.getCategory().startsWith("zt")){//�����ר��
						for(int i=0;i<subjectList.size();i++){
							subject=(Subject) subjectList.get(i);
							if(subject.getId().toString().equals(vo.getCategory().substring(2))){
								vo.setSubjectID(subject.getId().toString());
								vo.setSubjectName(subject.getSubjectName());
								break;
							}
						}
					}
					vo.setIsPublished((String)item.get("10"));
					list.add(vo);
				}
				
				DataTableModel model=new DataTableModel();
				model.setData(list);
				model.setDraw(Integer.parseInt(drawPage));			   
				model.setRecordsTotal(totalSize);
				model.setRecordsFiltered(totalSize);
				JSONObject jsonObject = JSONObject.fromObject(model);
				//System.out.println("�����б�:\n"+jsonObject.toString());
				out.write(jsonObject.toString());
				out.flush(); 
				out.close();
			}
			else
			{
				//System.out.println("��̨�����������");
				out.write("0");
				out.flush();
				out.close();
			}
		}
	}
}