package com.gztjj.servlet;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;

import net.sf.json.JSONObject;
import net.sf.json.JSONArray;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.gztjj.service.ExamScoreService;
import com.gztjj.model.EconomicIndicator;
import com.gztjj.model.ExamScore;
import com.gztjj.model.DataTableModel;
import com.gztjj.model.ResultInfo;

public class ExamScoreServlet extends HttpServlet {
	private static final long serialVersionUID = 7512001492425261841L;
	private ExamScoreService service = null;

	public ExamScoreServlet() {
		super();
	}

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/javascript;charset=utf-8");
		String opeType = request.getParameter("opeType");
		ApplicationContext ctx = WebApplicationContextUtils
				.getWebApplicationContext(getServletContext());
		service = (ExamScoreService) ctx.getBean("ExamScoreService");
		PrintWriter out = response.getWriter();

		if (opeType == null || opeType.equals("queryDataByYearMonth"))// 查询所有的ExamScore
		{
			String yearMonth = request.getParameter("yearMonth");// 年月
			String nameStr = request.getParameter("name");// 考生姓名 模糊查询

			String _startPos = request.getParameter("start");// 分页的起始位置
			//System.out.println("startPos:" + _startPos);
			String _requestLength = request.getParameter("length");// 页的大小
			//System.out.println("requestLength:" + _requestLength);

			int startPos = Integer.parseInt(_startPos);
			int requestLength = Integer.parseInt(_requestLength);
			String drawPage = request.getParameter("draw");// DataTable传来的参数
															// 返回数据的时候将会把该参数传回去
			if (drawPage == null || drawPage.equals(""))
				drawPage = "0";
			//System.out.println("drawPage:" + drawPage);

			List<Map> results = null;
			int totalSize = 0;
			if (yearMonth != null && !yearMonth.equals("")) {
				results = service.queryAllByYearMonth(yearMonth, nameStr,startPos, requestLength);
				totalSize = service.findTotalSizeByYearMonth(yearMonth, nameStr);
			}

			if (results != null) {
				//System.out.println("resultsSize:" + results.size());
				ArrayList list = new ArrayList();
				int count = startPos;
				for (Map item : results) {
					count++;
					ExamScore vo = new ExamScore();
					vo.setSeqNo(count);
					vo.setId((Integer) item.get("0"));
					vo.setName((String) item.get("1"));
					vo.setExamYearMonth((String) item.get("2"));
					vo.setIdCardNumber((String) item.get("3"));
					vo.setExamCardNumber((String) item.get("4"));
					vo.setAmScore((String) item.get("5"));
					vo.setPmScore((String) item.get("6"));
					list.add(vo);
				}

				DataTableModel model = new DataTableModel();
				model.setData(list);
				model.setDraw(Integer.parseInt(drawPage));
				model.setRecordsTotal(totalSize);
				model.setRecordsFiltered(totalSize);
				JSONObject jsonObject = JSONObject.fromObject(model);
				//System.out.println("成绩查询记录:\n" + jsonObject.toString());
				out.write(jsonObject.toString());
				out.flush();
				out.close();
			} 
			else 
			{
				ArrayList list=new ArrayList();
				DataTableModel model = new DataTableModel();
				model.setData(list); 
				model.setDraw(Integer.parseInt(drawPage));
				model.setRecordsTotal(0);
				model.setRecordsFiltered(0);
				JSONObject jsonObject = JSONObject.fromObject(model);
				//System.out.println("成绩查询记录:\n" + jsonObject.toString());
				out.write(jsonObject.toString());
				out.flush();
				out.close();
			}
		} 
		else if (opeType.equals("delExamScore")) //删除
		{
			String id = request.getParameter("id");
			//System.out.println("id:" + id);
			int ids[]=new int[1];
			ids[0] = Integer.parseInt(id);
			if (service.delExamScore(ids) == 1) {
				//System.out.println("删除考生成绩成功！");
				out.write("1");
			} else {
				//System.out.println("删除考生成绩失败！");
				out.write("0");
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("batchDelExamScore"))//批量删除
		{
			String idsStr = request.getParameter("ids");
			//System.out.println("idsStr:" + idsStr);
			String[] idsArr = idsStr.split("-");
			int ids[]=new int[idsArr.length];
			for(int i=0;i<idsArr.length;i++)
			{
				ids[i]=Integer.parseInt(idsArr[i]);
			}
			if (service.delExamScore(ids) == 1) {
				//System.out.println("删除考生成绩成功！");
				out.write("1");
			} else {
				//System.out.println("删除考生成绩失败！");
				out.write("0");
			}
			out.flush();
			out.close();
		}
		else if (opeType.equals("editExamScore"))// 修改
		{
			String id = request.getParameter("id");
			ExamScore u = service.getExamScoreById(Integer.parseInt(id));
			if (u != null) {
				// u.setExamYearMonth(request.getParameter("yearMonth"));
				u.setName(request.getParameter("name"));
				u.setIdCardNumber(request.getParameter("idCardNumber"));
				u.setExamCardNumber(request.getParameter("examCardNumber"));

				if (!request.getParameter("amScore").equals(""))
					u.setAmScore(request.getParameter("amScore"));
				else
					u.setAmScore(null);

				if (!request.getParameter("pmScore").equals(""))
					u.setPmScore(request.getParameter("pmScore"));
				else
					u.setPmScore(null);

				service.updateExamScore(u);
				//System.out.println("修改成功！");
				out.write("1");
				out.flush();
				out.close();
			} else {
				//System.out.println("不存在！");
				out.write("0");
				out.flush();
				out.close();
			}
		} else if (opeType.equals("saveExamScore"))// 保存
		{
			ExamScore u = new ExamScore();
			u.setExamYearMonth(request.getParameter("yearMonth"));
			u.setName(request.getParameter("name"));
			u.setIdCardNumber(request.getParameter("idCardNumber"));
			u.setExamCardNumber(request.getParameter("examCardNumber"));
			if (!request.getParameter("amScore").equals(""))
				u.setAmScore(request.getParameter("amScore"));
			else
				u.setAmScore(null);
			if (!request.getParameter("pmScore").equals(""))
				u.setPmScore(request.getParameter("pmScore"));
			else
				u.setPmScore(null);
			service.saveExamScore(u);
			//System.out.println("保存成功！");
			out.write("1");
			out.flush();
			out.close();
		} else if (opeType.equals("queryYearMonth")) {
			List results = service.queryYearMonth();
			//System.out.println("results.size:" + results.size());
			JSONArray jsonObject = JSONArray.fromObject(results);
			//System.out.println("年月的查询结果：" + jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();
		} 
		else if (opeType.equals("query")) 
		{
			String nameString = (String) request.getParameter("name");
			//System.out.println("'"+nameString+"'");
			
			String idEaxmString = (String) request.getParameter("idExam");
			//System.out.println("'"+idEaxmString+"'");
			
			String yearMonth = (String) request.getParameter("yearMonth");
			//System.out.println("'"+yearMonth+"'");
			
			ResultInfo<ExamScore> result = new ResultInfo<ExamScore>();
			result.setData(null);
			boolean flag = false;
			
			if (isNullOrEmpty(nameString)) {
				flag = true;
				result.setReusltMessage("姓名不能为空.");
			}

			if (flag == false && isNullOrEmpty(idEaxmString)) {
				flag = true;
				result.setReusltMessage("准考证信息不能为空.");
			}
			
			if (flag == false) {
				try {
					ExamScore examScore = service.getExamScoreByYearAndExamCard(yearMonth,idEaxmString);
					JSONObject examScorejsonObject = JSONObject.fromObject(examScore);
					//System.out.println("成绩查询记录:\n" + examScorejsonObject.toString());

					if (examScore != null) {
						//System.out.println("'"+examScore.getName()+"'");
						//System.out.println("'"+nameString+"'");
						//System.out.println("'"+examScore.getExamCardNumber()+"'");
						//System.out.println("'"+idEaxmString+"'");		
						 
						if (examScore.getName().equals(nameString)) {
							result.setStatusCode(1);
							result.setReusltMessage("查询到" + nameString+ "的成绩信息.");
							result.setData(examScore);
						} 
						else 
						{
							result.setStatusCode(0);
							if (!examScore.getName().equals(nameString)) {
								result.setReusltMessage("未查到"+nameString+"的成绩信息，请仔细检查输入。");
							}  
						}
					} 
					else
					{
						result.setStatusCode(-1);
						result.setReusltMessage(yearMonth + "姓名：" + nameString + " ，准考证号："+ idEaxmString + "的成绩信息不存在，请确认你需要查询的年份!");
					}
				} 
				catch (Exception e) 
				{
					result.setStatusCode(-2);
					result.setReusltMessage("服务器内部执行出错.");
				}
			}
			JSONObject jsonObject = JSONObject.fromObject(result);
			//System.out.println("成绩查询记录:\n" + jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();

		} else if (opeType.equals("importExcel"))// 导入excel
		{
			Map<String, String> map = new HashMap<String, String>();
			String yearMonth = request.getParameter("yearMonth");
			String excelFilePath = getServletContext().getRealPath("/")+ request.getParameter("excelFilePath");

			File file = new File(excelFilePath);
			//System.out.println("excelFilePath:" + excelFilePath + " yearMonth:"+ yearMonth);

			if (file.exists() && file.isFile()) {
				String fileType = excelFilePath.substring(excelFilePath.lastIndexOf(".") + 1);
				//System.out.println(fileType);
				if (fileType != null
						&& (fileType.equals("xls") || fileType.equals("xlsx"))) {
					FileInputStream fIn = new FileInputStream(excelFilePath);
					imortExcelData(fIn, fileType, yearMonth);
				}
			}

			// 返回结果1
			map.put("result", "1");
			JSONObject jsonObject = JSONObject.fromObject(map);
			out.write(jsonObject.toString());
			//System.out.println("返回1");
			out.flush();
			out.close();
		}
	}

	private boolean isNullOrEmpty(String item) {
		if (item == null)
			return true;
		if (item.equals("") || item.trim().equals(""))
			return true;
		return false;
	}

	// 导入EXCEL数据
	public void imortExcelData(FileInputStream fIn, String fileType,
			String yearMonth) {
		try {
			Workbook workBook = null;
			if (fileType.equals("xls"))
				workBook = new HSSFWorkbook(fIn);
			else if (fileType.equals("xlsx"))
				workBook = new XSSFWorkbook(fIn);

			Sheet readSheet = workBook.getSheetAt(0);
			//System.out.println("sheet yearMonth:" + yearMonth);

			int startRowIndex = 1;
			Row readRow = readSheet.getRow(startRowIndex);
			int startColIndex = 0;

			if (readRow == null || readRow.getCell(startColIndex) == null)
				return;
			readRow.getCell(startColIndex).setCellType(Cell.CELL_TYPE_STRING);
			//System.out.println("开始读入一行。。。");
			while (readRow != null
					&& readRow.getCell(startColIndex) != null
					&& !readRow.getCell(startColIndex).toString().trim()
							.equals("")) {
				//System.out.println("读入一行。。。");
				Cell readCell = readRow.getCell(startColIndex);
				readCell.setCellType(Cell.CELL_TYPE_STRING);
				String name = readCell.getStringCellValue().toString().trim();

				// 身份证号
				readCell = readRow.getCell(startColIndex + 1);
				String idCardNumber = "";
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					idCardNumber = readCell.getStringCellValue().toString().trim();
				}

				// 准考证号
				readCell = readRow.getCell(startColIndex + 2);
				String examCardNumber = "";
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					examCardNumber = readCell.getStringCellValue().toString().trim();
				}

				// 上午成绩
				readCell = readRow.getCell(startColIndex + 3);
				String amScore = null;
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					amScore = readCell.getStringCellValue().toString().trim();
					if(amScore.length()>5) amScore=amScore.substring(0,5);
				}

				// 下午成绩 
				readCell = readRow.getCell(startColIndex + 4);
				String pmScore = null;
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					pmScore = readCell.getStringCellValue().toString().trim();
					if(pmScore.length()>5) pmScore=pmScore.substring(0,5);
				}

				ExamScore u = service.getExamScoreByYearAndIdCard(yearMonth,idCardNumber);
				if (u != null)// 更新
				{
					u.setIdCardNumber(idCardNumber);
					u.setExamCardNumber(examCardNumber);
					u.setName(name);
					if (amScore != null)
						u.setAmScore(amScore);
					else
						u.setAmScore(null);
					if (pmScore != null)
						u.setPmScore(pmScore);
					else
						u.setPmScore(null);
					service.updateExamScore(u);
				} else// 保存
				{
					u = new ExamScore();
					u.setExamYearMonth(yearMonth);
					u.setName(name);
					u.setIdCardNumber(idCardNumber);
					u.setExamCardNumber(examCardNumber);
					if (amScore != null)
						u.setAmScore(amScore);
					else
						u.setAmScore(null);
					if (pmScore != null)
						u.setPmScore(pmScore);
					else
						u.setPmScore(null);
					service.saveExamScore(u);
				}

				startRowIndex++;
				readRow = readSheet.getRow(startRowIndex);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void destroy() {
		super.destroy();
	}
}