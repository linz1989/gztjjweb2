package com.gztjj.servlet;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
import com.gztjj.service.EachEconomicIndicatorService;
import com.gztjj.model.EachEconomicIndicator;
import com.gztjj.model.DataTableModel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import java.io.FileInputStream;

public class EachEconomicIndicatorAdminServlet extends HttpServlet 
{
	private static final long serialVersionUID = 7512001492425261841L;
	private EachEconomicIndicatorService service=null;
	
	public EachEconomicIndicatorAdminServlet() 
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
		service = (EachEconomicIndicatorService) ctx.getBean("EachEconomicIndicatorService");
		PrintWriter out = response.getWriter(); 
		Map<String,String> map=new HashMap<String,String>(); 
		//System.out.println("opeType:"+opeType);
		
		if(opeType.equals("queryAllByYearMonth"))//依据年月查询对应的经济指标记录
		{
			String yearMonth=request.getParameter("yearMonth");
			if(yearMonth.length()!=6){
				throw new ServletException();
			}
			//System.out.println(" yearMonth:"+yearMonth);
			List results=service.queryAllByYearMonth(yearMonth);
			ArrayList list=new ArrayList();
			int count=0;
			EachEconomicIndicator u = null;
			for(int i=0;i<results.size();i++)
			{
				u=(EachEconomicIndicator) results.get(i);
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
		else if(opeType.equals("delEachEconomicIndicator"))//删除记录
		{
			String recordID=request.getParameter("recordID");
			//System.out.println("recordID:"+recordID);
			 
			if(service.delEachEconomicIndicators(recordID) == 1)
			{ 
				//System.out.println("删除成功！");
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
		else if(opeType.equals("addEachEconomicIndicator"))//增加记录
		{
			String yearMonth = request.getParameter("yearMonth");
			String place=request.getParameter("place");
			
			//System.out.println("保存各县经济指标：yearMonth:"+yearMonth+" place:"+place);
			
			if(service.EachEconomicIndicatorExists(place,yearMonth) == false) //经济指标是否已经存在
			{
				Float scV=null,scP=null;
				Float czV=null,czP=null;
				Float ggV=null,ggP=null;
				Float gmV=null,gmP=null;
				Float gdV=null,gdP=null;
				Float xeV=null,xeP=null;
				Float sjV=null,sjP=null;
				Float ckV=null,ckP=null;
				
				String scV_str=request.getParameter("scV");
				String scP_str=request.getParameter("scP");
				String czV_str=request.getParameter("czV");
				String czP_str=request.getParameter("czP");
				String ggV_str=request.getParameter("ggV");
				String ggP_str=request.getParameter("ggP");
				String gmV_str=request.getParameter("gmV");
				String gmP_str=request.getParameter("gmP");
				String gdV_str=request.getParameter("gdV");
				String gdP_str=request.getParameter("gdP");
				String xeV_str=request.getParameter("xeV");
				String xeP_str=request.getParameter("xeP");
				String sjV_str=request.getParameter("sjV");
				String sjP_str=request.getParameter("sjP");
				String ckV_str=request.getParameter("ckV");
				String ckP_str=request.getParameter("ckP");
				
				if(scV_str != null && !scV_str.equals("")){
					scV=Float.parseFloat(scV_str);
				}
				if(scP_str != null && !scP_str.equals("")){
					scP=Float.parseFloat(scP_str);
				}
				
				if(czV_str != null && !czV_str.equals("")){
					czV=Float.parseFloat(czV_str);
				}
				if(czP_str != null && !czP_str.equals("")){
					czP=Float.parseFloat(czP_str);
				}
				
				if(ggV_str != null && !ggV_str.equals("")){
					ggV=Float.parseFloat(ggV_str);
				}
				if(ggP_str != null && !ggP_str.equals("")){
					ggP=Float.parseFloat(ggP_str);
				}
				
				if(gmV_str != null && !gmV_str.equals("")){
					gmV=Float.parseFloat(gmV_str);
				}
				if(gmP_str != null && !gmP_str.equals("")){
					gmP=Float.parseFloat(gmP_str);
				}
				
				if(gdV_str != null && !gdV_str.equals("")){
					gdV=Float.parseFloat(gdV_str);
				}
				if(gdP_str != null && !gdP_str.equals("")){
					gdP=Float.parseFloat(gdP_str);
				}
				
				if(xeV_str != null && !xeV_str.equals("")){
					xeV=Float.parseFloat(xeV_str);
				}
				if(xeP_str != null && !xeP_str.equals("")){
					xeP=Float.parseFloat(xeP_str);
				}
				
				if(sjV_str != null && !sjV_str.equals("")){
					sjV=Float.parseFloat(sjV_str);
				}
				if(sjP_str != null && !sjP_str.equals("")){
					sjP=Float.parseFloat(sjP_str);
				}
				if(ckV_str != null && !ckV_str.equals("")){
					ckV=Float.parseFloat(ckV_str);
				}
				if(ckP_str != null && !ckP_str.equals("")){
					ckP=Float.parseFloat(ckP_str);
				}
				
				EachEconomicIndicator in = new EachEconomicIndicator(place,yearMonth,scV,scP, czV, czP, ggV, ggP, gmV, gmP, gdV, gdP, xeV, xeP,sjV, sjP,ckV, ckP);
				service.saveEachEconomicIndicator(in);  
				//System.out.println("记录保存成功！"); 
				map.put("result","1"); 
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			} 
			else
			{
				//System.out.println("该年月的经济指标已经存在！");
				map.put("result","0");  
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("editEachEconomicIndicator"))//修改记录
		{ 
			String id=request.getParameter("id"); 
			EachEconomicIndicator u=service.getEachEconomicIndicatorByID(id);
			
			if(u != null)
			{ 
				Float scV=null,scP=null;
				Float czV=null,czP=null;
				Float ggV=null,ggP=null;
				Float gmV=null,gmP=null;
				Float gdV=null,gdP=null;
				Float xeV=null,xeP=null;
				Float sjV=null,sjP=null;
				Float ckV=null,ckP=null;
				
				String scV_str=request.getParameter("scV");
				String scP_str=request.getParameter("scP");
				String czV_str=request.getParameter("czV");
				String czP_str=request.getParameter("czP");
				String ggV_str=request.getParameter("ggV");
				String ggP_str=request.getParameter("ggP");
				String gmV_str=request.getParameter("gmV");
				String gmP_str=request.getParameter("gmP");
				String gdV_str=request.getParameter("gdV");
				String gdP_str=request.getParameter("gdP");
				String xeV_str=request.getParameter("xeV");
				String xeP_str=request.getParameter("xeP");
				String sjV_str=request.getParameter("sjV");
				String sjP_str=request.getParameter("sjP");
				String ckV_str=request.getParameter("ckV");
				String ckP_str=request.getParameter("ckP");
				
				if(scV_str != null && !scV_str.equals("")){
					scV=Float.parseFloat(scV_str);
				}
				if(scP_str != null && !scP_str.equals("")){
					scP=Float.parseFloat(scP_str);
				}
				
				if(czV_str != null && !czV_str.equals("")){
					czV=Float.parseFloat(czV_str);
				}
				if(czP_str != null && !czP_str.equals("")){
					czP=Float.parseFloat(czP_str);
				}
				
				if(ggV_str != null && !ggV_str.equals("")){
					ggV=Float.parseFloat(ggV_str);
				}
				if(ggP_str != null && !ggP_str.equals("")){
					ggP=Float.parseFloat(ggP_str);
				}
				
				if(gmV_str != null && !gmV_str.equals("")){
					gmV=Float.parseFloat(gmV_str);
				}
				if(gmP_str != null && !gmP_str.equals("")){
					gmP=Float.parseFloat(gmP_str);
				}
				
				if(gdV_str != null && !gdV_str.equals("")){
					gdV=Float.parseFloat(gdV_str);
				}
				if(gdP_str != null && !gdP_str.equals("")){
					gdP=Float.parseFloat(gdP_str);
				}
				
				if(xeV_str != null && !xeV_str.equals("")){
					xeV=Float.parseFloat(xeV_str);
				}
				if(xeP_str != null && !xeP_str.equals("")){
					xeP=Float.parseFloat(xeP_str);
				}
				
				if(sjV_str != null && !sjV_str.equals("")){
					sjV=Float.parseFloat(sjV_str);
				}
				if(sjP_str != null && !sjP_str.equals("")){
					sjP=Float.parseFloat(sjP_str);
				}
				if(ckV_str != null && !ckV_str.equals("")){
					ckV=Float.parseFloat(ckV_str);
				}
				if(ckP_str != null && !ckP_str.equals("")){
					ckP=Float.parseFloat(ckP_str);
				}
				
				u.setCkP(ckP);
				u.setCkV(ckV);
				u.setCzP(czP);
				u.setCzV(czV);
				u.setGdP(gdP);
				u.setGdV(gdV);
				u.setGgP(ggP);
				u.setGgV(ggV);
				u.setGmP(gmP);
				u.setGmV(gmV);
				u.setScP(scP);
				u.setScV(scV);
				u.setSjP(sjP);
				u.setSjV(sjV);
				u.setXeP(xeP);
				u.setXeV(xeV);
				
				service.updateEachEconomicIndicator(u); 
				//System.out.println("记录修改成功！");
				map.put("result","1");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			else
			{
				//System.out.println("记录不存在！"); 
				map.put("result","2");
				JSONObject jsonObject = JSONObject.fromObject(map);
				out.write(jsonObject.toString());
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("importExcel"))//导入excel
		{
			String yearMonth = request.getParameter("yearMonth");
			String excelFilePath=getServletContext().getRealPath("/")+request.getParameter("excelFilePath");
			File file=new File(excelFilePath); 
			//System.out.println("excelFilePath:"+excelFilePath+" yearMonth:"+yearMonth);
			
			if(file.exists() && file.isFile())
			{
				String fileType=excelFilePath.substring(excelFilePath.lastIndexOf(".")+1);
				//System.out.println(fileType);
				if(fileType !=null && (fileType.equals("xls") || fileType.equals("xlsx")) )
				{ 
					FileInputStream fIn=new FileInputStream(excelFilePath);
					//System.out.println("导入各县市区："+yearMonth);
					imortExcelDataAll(fIn,fileType,yearMonth); 
				}
			}
			
			//返回结果1
			map.put("result","1");
			JSONObject jsonObject = JSONObject.fromObject(map);
			out.write(jsonObject.toString());
			//System.out.println("返回1");
			out.flush();
			out.close(); 
		}
	}
	
	//导入各县的经济指标EXCEL
	public void imortExcelDataAll(FileInputStream fIn,String fileType,String year)
	{
		try
		{
			Workbook workBook=null;
			if(fileType.equals("xls")) { workBook=new HSSFWorkbook(fIn); System.out.print(" workBook xls"); }
			else if(fileType.equals("xlsx")) { workBook=new XSSFWorkbook(fIn); System.out.print("workBook xlsx");}
			//System.out.println("workBook.getNumberOfSheets():"+workBook.getNumberOfSheets());
			for(int i=0;i<workBook.getNumberOfSheets();i++)
			{
				Sheet readSheet= workBook.getSheetAt(i); 
				String sheetName=readSheet.getSheetName().trim();
				if(!sheetName.startsWith("1-")) continue;
				
				String month=sheetName.substring(2, sheetName.length()-1);
				////System.out.println("sheetName:"+sheetName+"month:"+month);
				String yearMonth=year;
				
				if(month.length()==1) yearMonth+="0"+month;
				else yearMonth+=month; 
				//System.out.println("sheet yearMonth:"+yearMonth);
				
				int startRowIndex=3; 
				Row readRow =readSheet.getRow(startRowIndex);
				int startColIndex=0;
				if(readRow == null || readRow.getCell(startColIndex) == null) return;
				readRow.getCell(startColIndex).setCellType(Cell.CELL_TYPE_STRING);
				ArrayList list=new ArrayList();
				while(readRow != null && readRow.getCell(startColIndex) != null && !readRow.getCell(startColIndex).toString().trim().equals(""))
				{ 
					Cell readCell = readRow.getCell(startColIndex);
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					String place=readCell.getStringCellValue().toString().trim();//县市区
					if(place.equals("南康市")) place="南康区";
					
					//生产总值
					readCell = readRow.getCell(startColIndex+1);
					String scV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						scV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+2);
					String scP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						scP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					//财政总收入
					readCell = readRow.getCell(startColIndex+3);
					String czV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						czV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+4);
					String czP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						czP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					//公共财政预算收入
					readCell = readRow.getCell(startColIndex+5);
					String ggV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						ggV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+6);
					String ggP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						ggP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					//规模以上工业增加值
					readCell = readRow.getCell(startColIndex+7);
					String gmV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						gmV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+8);
					String gmP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						gmP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					Float scV=null,scP=null;
					Float czV=null,czP=null;
					Float ggV=null,ggP=null;
					Float gmV=null,gmP=null;
					
					if(scV_Str != null && !scV_Str.equals("") && isNumeric(scV_Str)){
						scV=Float.parseFloat(scV_Str);
					}
					
					if(scP_Str != null && !scP_Str.equals("") && isNumeric(scP_Str)){
						scP=Float.parseFloat(scP_Str);
					}
					
					if(czV_Str != null && !czV_Str.equals("") && isNumeric(czV_Str)){
						czV=Float.parseFloat(czV_Str);
					}
					
					if(czP_Str != null && !czP_Str.equals("") && isNumeric(czP_Str)){
						czP=Float.parseFloat(czP_Str);
					}
					
					if(ggV_Str != null && !ggV_Str.equals("") && isNumeric(ggV_Str)){
						ggV=Float.parseFloat(ggV_Str);
					}
					
					if(ggP_Str != null && !ggP_Str.equals("") && isNumeric(ggP_Str)){
						ggP=Float.parseFloat(ggP_Str);
					}
					
					if(gmV_Str != null && !gmV_Str.equals("") && isNumeric(gmV_Str)){
						gmV=Float.parseFloat(gmV_Str);
					}
					
					if(gmP_Str != null && !gmP_Str.equals("") && isNumeric(gmP_Str)){
						gmP=Float.parseFloat(gmP_Str);
					}
					
					EachEconomicIndicator u=service.getEachEconomicIndicatorByYearAndPlace(place, yearMonth);
					if(u != null)//更新
					{
						u.setScV(scV);
						u.setScP(scP);
						u.setCzV(czV);
						u.setCzP(czP);
						u.setGgV(ggV);
						u.setGgP(ggP);
						u.setGmV(gmV);
						u.setGmP(gmP);
					}
					else//保存
					{
						u = new EachEconomicIndicator();
						u.setPlace(place);
						u.setYearmonth(yearMonth);
						u.setScV(scV);
						u.setScP(scP);
						u.setCzV(czV);
						u.setCzP(czP);
						u.setGgV(ggV);
						u.setGgP(ggP);
						u.setGmV(gmV);
						u.setGmP(gmP);
					}
					list.add(u);
					startRowIndex++;
					//System.out.println(place+" "+yearMonth+" "+scV+" "+scP+" "+czV+" "+czP+" "+ggV+" "+ggP+" "+gmV+" "+gmP );
					readRow =readSheet.getRow(startRowIndex);
				}
				
				//==========================================================excel的下部分
				startRowIndex=startRowIndex+4;
				readRow =readSheet.getRow(startRowIndex);
				startColIndex=0;
				if(readRow == null || readRow.getCell(startColIndex) == null) return;
				readRow.getCell(startColIndex).setCellType(Cell.CELL_TYPE_STRING);
				
				while(readRow != null && readRow.getCell(startColIndex) != null && !readRow.getCell(startColIndex).toString().trim().equals(""))
				{ 
					Cell readCell = readRow.getCell(startColIndex);
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					String place=readCell.getStringCellValue().toString().trim();//县市区
					if(place.equals("南康市")) place="南康区";
					
					//固定资产投资
					readCell = readRow.getCell(startColIndex+1);
					String gdV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						gdV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+2);
					String gdP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						gdP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					//限额以上消费品零售额
					readCell = readRow.getCell(startColIndex+3);
					String xeV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						xeV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+4);
					String xeP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						xeP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					//实际利用外资
					readCell = readRow.getCell(startColIndex+5);
					String sjV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						sjV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+6);
					String sjP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						sjP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					//规模以上工业增加值
					readCell = readRow.getCell(startColIndex+7);
					String ckV_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						ckV_Str=readCell.getStringCellValue().toString().trim();
					}
					
					readCell = readRow.getCell(startColIndex+8);
					String ckP_Str = "";
					if(readCell != null)
					{
						readCell.setCellType(Cell.CELL_TYPE_STRING);
						ckP_Str=readCell.getStringCellValue().toString().trim();
					}
					
					Float gdV=null,gdP=null;
					Float xeV=null,xeP=null;
					Float sjV=null,sjP=null;
					Float ckV=null,ckP=null;
					
					if(gdV_Str != null && !gdV_Str.equals("") && isNumeric(gdV_Str)){
						gdV=Float.parseFloat(gdV_Str);
					}
					
					if(gdP_Str != null && !gdP_Str.equals("") && isNumeric(gdP_Str)){
						gdP=Float.parseFloat(gdP_Str);
					}
					
					if(xeV_Str != null && !xeV_Str.equals("") && isNumeric(xeV_Str)){
						xeV=Float.parseFloat(xeV_Str);
					}
					
					if(xeP_Str != null && !xeP_Str.equals("") && isNumeric(xeP_Str)){
						xeP=Float.parseFloat(xeP_Str);
					}
					
					if(sjV_Str != null && !sjV_Str.equals("") && isNumeric(sjV_Str)){
						sjV=Float.parseFloat(sjV_Str);
					}
					
					if(sjP_Str != null && !sjP_Str.equals("") && isNumeric(sjP_Str)){
						sjP=Float.parseFloat(sjP_Str);
					}
					
					if(ckV_Str != null && !ckV_Str.equals("") && isNumeric(ckV_Str)){
						ckV=Float.parseFloat(ckV_Str);
					}
					
					if(ckP_Str != null && !ckP_Str.equals("") && isNumeric(ckP_Str)){
						ckP=Float.parseFloat(ckP_Str);
					}
					
					EachEconomicIndicator u=null;
					for(int k=0;k<list.size();k++)
					{
						EachEconomicIndicator item=(EachEconomicIndicator)list.get(k);
						if(item.getPlace().equals(place) )
						{
							u=item;
							break;
						}
					}
					
					//System.out.println(place+" "+yearMonth+" "+gdV+" "+gdP+" "+xeV+" "+xeP+" "+sjV+" "+sjP+" "+ckV+" "+ckP );
					
					if(u != null)//更新
					{
						u.setGdV(gdV);
						u.setGdP(gdP);
						u.setXeV(xeV);
						u.setXeP(xeP);
						u.setSjV(sjV);
						u.setSjP(sjP);
						u.setCkV(ckV);
						u.setCkP(ckP);
						
						if(u.getId() != null && !u.getId().equals(""))//更新操作
						{
							service.updateEachEconomicIndicator(u);
						}
						else
						{
							service.saveEachEconomicIndicator(u);//保存操作
						}
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
	
	public boolean isNumeric(String str){ 
		   Pattern pattern = Pattern.compile("^(-?\\d+)(\\.\\d+)?"); 
		   Matcher isNum = pattern.matcher(str);
		   if( !isNum.matches() ){
		       return false; 
		   } 
		   return true; 
		}

	public void destroy() 
	{
		super.destroy();  
	}
}