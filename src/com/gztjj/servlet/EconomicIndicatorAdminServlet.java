package com.gztjj.servlet;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.File;
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
import com.gztjj.service.EconomicIndicatorService;
import com.gztjj.model.EconomicIndicator;
import com.gztjj.model.DataTableModel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import java.io.FileInputStream;

public class EconomicIndicatorAdminServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private EconomicIndicatorService service=null;
	
	public EconomicIndicatorAdminServlet() 
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
		service = (EconomicIndicatorService) ctx.getBean("EconomicIndicatorService");
		PrintWriter out = response.getWriter(); 
		Map<String,String> map=new HashMap<String,String>(); 
		//System.out.println("opeType:"+opeType);
		
		if(opeType.equals("queryAllByYearMonth"))//�������²�ѯ��Ӧ�ľ���ָ���¼
		{
			String yearMonth=request.getParameter("yearMonth");
			String place=request.getParameter("place");
			if(yearMonth.length()!=6 || place.length()>9){
				throw new ServletException();
			}
			//System.out.println("place:"+place+" yearMonth:"+yearMonth);
			List results=service.queryAllByYearMonth(place,yearMonth);
			//System.out.println("��ѯ�����Ŀ��"+results.size());
			ArrayList list=new ArrayList();
			int count=0;
			EconomicIndicator u = null;
			for(int i=0;i<results.size();i++)
			{
				u=(EconomicIndicator) results.get(i);
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
		else if(opeType.equals("delEconomicIndicator"))//ɾ����¼
		{
			String recordID=request.getParameter("recordID");
			//System.out.println("idArr:"+recordID);
			 
			if(service.delEconomicIndicators(recordID) == 1)
			{ 
				//System.out.println("ɾ���ɹ���");
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
				out.flush();
				out.close();
			}
		}
		else if(opeType.equals("addEconomicIndicator"))//���Ӽ�¼
		{
			String yearMonth = request.getParameter("yearMonth");
			String indicator = request.getParameter("indicator");
			String place=request.getParameter("place");
			
			//System.out.println("���棺yearMonth:"+yearMonth+" place:"+place+"indicator:"+indicator);
			
			if(service.economicIndicatorExists(place,yearMonth,indicator) == false) //����ָ���Ƿ��Ѿ�����
			{
				String unit = request.getParameter("unit");
				String indicatorValue = request.getParameter("indicatorValue").trim();
				String indicatorGrowth = request.getParameter("indicatorGrowth").trim();
				 
				EconomicIndicator in = new EconomicIndicator(place,yearMonth,indicator,unit,indicatorValue,indicatorGrowth);
				service.saveEconomicIndicator(in); 
				//System.out.println("��¼����ɹ���"); 
				map.put("result","1"); 
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			} 
			else
			{
				//System.out.println("�����µľ���ָ���Ѿ����ڣ�");
				map.put("result","0");  
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("queryEconomicIndicatorChartData"))//��ѯ֮ǰ��12���µ�ĳ��ָ�������
		{
			//System.out.println("��ѯ֮ǰ��12���µ�ĳ��ָ�������");
			String indicatorName=request.getParameter("indicatorName");
			List results=service.queryEconomicIndicatorChartData(indicatorName);
			ArrayList list=new ArrayList();
			int count=0;
			EconomicIndicator u = null;
			for(int i=0;i<results.size();i++)
			{
				u=(EconomicIndicator) results.get(i);
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
		else if(opeType.equals("queryChartData"))//��ѯ֮ǰ��12���µ�ָ������
		{
			//System.out.println("��ѯ֮ǰ��12���µ�ĳ��ָ�������");
			List results=service.queryChartData();
			ArrayList list=new ArrayList();
			int count=0;
			EconomicIndicator u = null;
			//System.out.println("result size��"+results.size());
			for(int i=0;i<results.size();i++)
			{
				u=(EconomicIndicator) results.get(i);
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
		else if(opeType.equals("editEconomicIndicator"))//�޸ļ�¼
		{ 
			String yearMonth = request.getParameter("yearMonth");
			String indicator = request.getParameter("indicator");
			String place=request.getParameter("place");
			String id=request.getParameter("id"); 
			EconomicIndicator u=service.getEconomicIndicatorByID(id);
			if(u != null)
			{ 
				u.setUnit(request.getParameter("unit"));
				String indicatorValue = request.getParameter("indicatorValue").trim();
				String indicatorGrowth = request.getParameter("indicatorGrowth").trim();
				 
				u.setIndicatorValue(indicatorValue);
				u.setIndicatorGrowth(indicatorGrowth);
				service.updateEconomicIndicator(u); 
				//System.out.println("��¼�޸ĳɹ���");
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else
			{
				//System.out.println("��¼�����ڣ�"); 
				map.put("result","2");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("importExcel"))//����excel
		{
			String yearMonth = request.getParameter("yearMonth");
			String place=request.getParameter("place");
			String excelFilePath=getServletContext().getRealPath("/")+request.getParameter("excelFilePath");
			File file=new File(excelFilePath); 
			//System.out.println("excelFilePath:"+excelFilePath+" yearMonth:"+yearMonth+" place:"+place);
			
			if(file.exists() && file.isFile())
			{
				String fileType=excelFilePath.substring(excelFilePath.lastIndexOf(".")+1);
				//System.out.println(fileType);
				if(fileType !=null && (fileType.equals("xls") || fileType.equals("xlsx")) )
				{ 
					FileInputStream fIn=new FileInputStream(excelFilePath);
					if(place.equals("������")){
						//System.out.println("��������У�"+yearMonth);
						imortExcelDataAll(fIn,fileType,yearMonth);
					}
				}
			}
			
			//���ؽ��1
			map.put("result","1");
			JSONObject jsonObject = JSONObject.fromObject(map);
			out.write(jsonObject.toString());
			//System.out.println("����1");
			out.flush();
			out.close(); 
		}
	}
	
	//����ȫ�еľ���ָ��EXCEL
	public void imortExcelDataAll(FileInputStream fIn,String fileType,String year)
	{
		try
		{
			Workbook workBook=null;
			if(fileType.equals("xls")) workBook=new HSSFWorkbook(fIn);
			else if(fileType.equals("xlsx")) workBook=new XSSFWorkbook(fIn);
			
			for(int i=0;i<workBook.getNumberOfSheets();i++)
			{
				Sheet readSheet= workBook.getSheetAt(i);
				String sheetName=readSheet.getSheetName().trim();
				String month=sheetName.substring(2, sheetName.length()-1);
				String yearMonth=year; 
				if(month.length()==1) yearMonth+="0"+month;
				else yearMonth+=month; 
				//System.out.println("sheet yearMonth:"+yearMonth);
				
				int startRowIndex=3;
				Row readRow =readSheet.getRow(startRowIndex);
				int startColIndex=1;
				if(readRow == null || readRow.getCell(startColIndex) == null) return;
				readRow.getCell(startColIndex).setCellType(Cell.CELL_TYPE_STRING);
				while(readRow != null && readRow.getCell(startColIndex) != null && !readRow.getCell(startColIndex).toString().trim().equals("")
						&& !readRow.getCell(startColIndex).toString().trim().startsWith("ע") && !readRow.getCell(startColIndex).toString().trim().startsWith("2"))
				{ 
					Cell readCell = readRow.getCell(startColIndex);
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					String indicator=readCell.getStringCellValue().toString().trim();
					
					//��λ
					readCell = readRow.getCell(startColIndex+1);
					String unit = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						unit=readCell.getStringCellValue().toString().trim();
					}
					
					//ֵ
					readCell = readRow.getCell(startColIndex+2);
					String indicatorValue = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						indicatorValue=readCell.getStringCellValue().toString().trim();
					}
					
					if(indicatorValue.length()>0 && ( Character.isDigit(indicatorValue.charAt(0)) || indicatorValue.startsWith("-"))){
						if(indicatorValue.indexOf(".")>0 && indicatorValue.substring(indicatorValue.indexOf(".")+1).length()>2){
							indicatorValue=indicatorValue.substring(0, indicatorValue.indexOf(".")+3);
						}
					}
					
					
					//�ٷֱ�
					readCell = readRow.getCell(startColIndex+3);
					String indicatorGrowth = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						indicatorGrowth=readCell.getStringCellValue().toString().trim();
					}
					
					if(indicatorGrowth.length()>0 && (Character.isDigit(indicatorGrowth.charAt(0)) || indicatorGrowth.startsWith("-"))){
						if(indicatorGrowth.indexOf(".")>0 && indicatorGrowth.substring(indicatorGrowth.indexOf(".")+1).length()>2){
							indicatorGrowth=indicatorGrowth.substring(0, indicatorGrowth.indexOf(".")+3);
						}
					}
					
//					Float value=null;
//					Float growth=null;
//					if(indicatorValue != null && !indicatorValue.equals("")){
//						value=Float.parseFloat(indicatorValue);
//					}
//					if(indicatorGrowth != null && !indicatorGrowth.equals("")){
//						growth=Float.parseFloat(indicatorGrowth);
//					}
					
					EconomicIndicator u=service.getEconomicIndicatorByYearAndIndicator("������", yearMonth, indicator);
					if(u != null)//����
					{
						u.setUnit(unit);
						u.setIndicatorValue(indicatorValue);
						u.setIndicatorGrowth(indicatorGrowth);
						service.updateEconomicIndicator(u);
					}
					else//����
					{
						EconomicIndicator in = new EconomicIndicator("������",yearMonth,indicator,unit,indicatorValue,indicatorGrowth);
						service.saveEconomicIndicator(in); 
					}
					
					startRowIndex++;
					readRow =readSheet.getRow(startRowIndex);
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public void destroy() 
	{
		super.destroy();  
	}
}