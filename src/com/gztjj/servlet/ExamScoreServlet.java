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

		if (opeType == null || opeType.equals("queryDataByYearMonth"))// ��ѯ���е�ExamScore
		{
			String yearMonth = request.getParameter("yearMonth");// ����
			String nameStr = request.getParameter("name");// �������� ģ����ѯ

			String _startPos = request.getParameter("start");// ��ҳ����ʼλ��
			//System.out.println("startPos:" + _startPos);
			String _requestLength = request.getParameter("length");// ҳ�Ĵ�С
			//System.out.println("requestLength:" + _requestLength);

			int startPos = Integer.parseInt(_startPos);
			int requestLength = Integer.parseInt(_requestLength);
			String drawPage = request.getParameter("draw");// DataTable�����Ĳ���
															// �������ݵ�ʱ�򽫻�Ѹò�������ȥ
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
				//System.out.println("�ɼ���ѯ��¼:\n" + jsonObject.toString());
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
				//System.out.println("�ɼ���ѯ��¼:\n" + jsonObject.toString());
				out.write(jsonObject.toString());
				out.flush();
				out.close();
			}
		} 
		else if (opeType.equals("delExamScore")) //ɾ��
		{
			String id = request.getParameter("id");
			//System.out.println("id:" + id);
			int ids[]=new int[1];
			ids[0] = Integer.parseInt(id);
			if (service.delExamScore(ids) == 1) {
				//System.out.println("ɾ�������ɼ��ɹ���");
				out.write("1");
			} else {
				//System.out.println("ɾ�������ɼ�ʧ�ܣ�");
				out.write("0");
			}
			out.flush();
			out.close();
		}
		else if(opeType.equals("batchDelExamScore"))//����ɾ��
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
				//System.out.println("ɾ�������ɼ��ɹ���");
				out.write("1");
			} else {
				//System.out.println("ɾ�������ɼ�ʧ�ܣ�");
				out.write("0");
			}
			out.flush();
			out.close();
		}
		else if (opeType.equals("editExamScore"))// �޸�
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
				//System.out.println("�޸ĳɹ���");
				out.write("1");
				out.flush();
				out.close();
			} else {
				//System.out.println("�����ڣ�");
				out.write("0");
				out.flush();
				out.close();
			}
		} else if (opeType.equals("saveExamScore"))// ����
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
			//System.out.println("����ɹ���");
			out.write("1");
			out.flush();
			out.close();
		} else if (opeType.equals("queryYearMonth")) {
			List results = service.queryYearMonth();
			//System.out.println("results.size:" + results.size());
			JSONArray jsonObject = JSONArray.fromObject(results);
			//System.out.println("���µĲ�ѯ�����" + jsonObject.toString());
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
				result.setReusltMessage("��������Ϊ��.");
			}

			if (flag == false && isNullOrEmpty(idEaxmString)) {
				flag = true;
				result.setReusltMessage("׼��֤��Ϣ����Ϊ��.");
			}
			
			if (flag == false) {
				try {
					ExamScore examScore = service.getExamScoreByYearAndExamCard(yearMonth,idEaxmString);
					JSONObject examScorejsonObject = JSONObject.fromObject(examScore);
					//System.out.println("�ɼ���ѯ��¼:\n" + examScorejsonObject.toString());

					if (examScore != null) {
						//System.out.println("'"+examScore.getName()+"'");
						//System.out.println("'"+nameString+"'");
						//System.out.println("'"+examScore.getExamCardNumber()+"'");
						//System.out.println("'"+idEaxmString+"'");		
						 
						if (examScore.getName().equals(nameString)) {
							result.setStatusCode(1);
							result.setReusltMessage("��ѯ��" + nameString+ "�ĳɼ���Ϣ.");
							result.setData(examScore);
						} 
						else 
						{
							result.setStatusCode(0);
							if (!examScore.getName().equals(nameString)) {
								result.setReusltMessage("δ�鵽"+nameString+"�ĳɼ���Ϣ������ϸ������롣");
							}  
						}
					} 
					else
					{
						result.setStatusCode(-1);
						result.setReusltMessage(yearMonth + "������" + nameString + " ��׼��֤�ţ�"+ idEaxmString + "�ĳɼ���Ϣ�����ڣ���ȷ������Ҫ��ѯ�����!");
					}
				} 
				catch (Exception e) 
				{
					result.setStatusCode(-2);
					result.setReusltMessage("�������ڲ�ִ�г���.");
				}
			}
			JSONObject jsonObject = JSONObject.fromObject(result);
			//System.out.println("�ɼ���ѯ��¼:\n" + jsonObject.toString());
			out.write(jsonObject.toString());
			out.flush();
			out.close();

		} else if (opeType.equals("importExcel"))// ����excel
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

			// ���ؽ��1
			map.put("result", "1");
			JSONObject jsonObject = JSONObject.fromObject(map);
			out.write(jsonObject.toString());
			//System.out.println("����1");
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

	// ����EXCEL����
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
			//System.out.println("��ʼ����һ�С�����");
			while (readRow != null
					&& readRow.getCell(startColIndex) != null
					&& !readRow.getCell(startColIndex).toString().trim()
							.equals("")) {
				//System.out.println("����һ�С�����");
				Cell readCell = readRow.getCell(startColIndex);
				readCell.setCellType(Cell.CELL_TYPE_STRING);
				String name = readCell.getStringCellValue().toString().trim();

				// ���֤��
				readCell = readRow.getCell(startColIndex + 1);
				String idCardNumber = "";
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					idCardNumber = readCell.getStringCellValue().toString().trim();
				}

				// ׼��֤��
				readCell = readRow.getCell(startColIndex + 2);
				String examCardNumber = "";
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					examCardNumber = readCell.getStringCellValue().toString().trim();
				}

				// ����ɼ�
				readCell = readRow.getCell(startColIndex + 3);
				String amScore = null;
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					amScore = readCell.getStringCellValue().toString().trim();
					if(amScore.length()>5) amScore=amScore.substring(0,5);
				}

				// ����ɼ� 
				readCell = readRow.getCell(startColIndex + 4);
				String pmScore = null;
				if (readCell != null) {
					readCell.setCellType(Cell.CELL_TYPE_STRING);
					pmScore = readCell.getStringCellValue().toString().trim();
					if(pmScore.length()>5) pmScore=pmScore.substring(0,5);
				}

				ExamScore u = service.getExamScoreByYearAndIdCard(yearMonth,idCardNumber);
				if (u != null)// ����
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
				} else// ����
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