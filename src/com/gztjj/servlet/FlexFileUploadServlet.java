package com.gztjj.servlet;

import javax.servlet.http.HttpServlet;
import java.io.IOException;
import java.io.File;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.List; 
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem; 
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class FlexFileUploadServlet extends HttpServlet 
{
	private static final long serialVersionUID = 5425836342860978977L;
	
	public FlexFileUploadServlet()
	{
		super();
	}
	
	protected void processRequest(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		request.setCharacterEncoding("utf-8");  
		response.setContentType("text/html;charset=utf-8"); 
		  
		String objName="default";  
		String fileName="";
	
		//�����ļ�·��
		SimpleDateFormat df=new SimpleDateFormat("yyyy");
		SimpleDateFormat df2=new SimpleDateFormat("MM");
		String uploadFilePath= getServletContext().getRealPath("/"); 
		////System.out.println("uploadFilePath:"+uploadFilePath);  
		   
		int maxPostSize = 4000 * 1024 * 1024;
		try
		{
			DiskFileItemFactory factory = new DiskFileItemFactory();     
			factory.setSizeThreshold(4096);                                            
			ServletFileUpload upload = new ServletFileUpload(factory);  
			upload.setSizeMax(maxPostSize);
			List<FileItem> fileItems = upload.parseRequest(request);
			String path="";
			for(FileItem item : fileItems)
			{
				if(item.isFormField() == true && item.getFieldName().equals("bizobjPN"))
				{ 
					objName=item.getString();
					path="uploadfile//"+objName+"//"+df.format(new Date())+"//"+df2.format(new Date());
					uploadFilePath+=path;
					//System.out.println("�ļ��ϴ�·����"+uploadFilePath);
					File fileDir=new File(uploadFilePath);
					if( !fileDir.exists() ) 
					{
						fileDir.mkdirs();
					}
				} 
				else if( !item.isFormField() )  //�ļ���
				{
					fileName=URLDecoder.decode(item.getName(),"utf-8");
					long fileSize = item.getSize();
					//System.out.println("�ϴ����ļ�����"+fileName);
					fileName=getUUID()+fileName.substring(fileName.lastIndexOf("."));
					//System.out.println("�ϴ����ļ�������Ϊ��"+fileName);
					if(fileName.length() > 1 && fileSize>0)
					{
						String filePath=uploadFilePath+"//"+fileName;	
						path+="//"+fileName;
						item.write(new File(filePath));
						//System.out.println("�������ϴ����ļ���"+filePath);
					}
				}
			}  
				
			/////////////////////���ͻ��˷����ļ���·�����������ļ�����
			////System.out.println("����·���� /"+virPath+subFilePath);
			PrintWriter out = response.getWriter();
			out.print(path);   //����Flex 
			out.flush();   
			out.close();
		}
		catch (Exception e)
		{
			response.getWriter().print("ERROR");  
			e.printStackTrace();
		}
	}

    public String getUUID()
    { 
        String s = UUID.randomUUID().toString(); 
        return s.substring(0,8)+s.substring(9,13)+s.substring(14,18)+s.substring(19,23)+s.substring(24); //ȥ����-������
    } 
	
	@Override
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException 
	{
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException 
	{
		processRequest(request, response);
	}

	@Override
	public String getServletInfo() 
	{
		return "";
	}
	
}