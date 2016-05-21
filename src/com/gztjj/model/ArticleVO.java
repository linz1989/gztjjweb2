package com.gztjj.model;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class ArticleVO
{
	private int seqNo;
	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
	private Integer id;
	private String title;
	private Integer browseCount;
	private String origin;
	private String author;
	private String addUser;
	private String addTime;
	private String publishTime;
	private String keyWords;
	private String category;
	private String isPublished;
	private SimpleDateFormat formatter;
	private String subjectID;
	private String subjectName;
	
	public String getSubjectID() {
		return subjectID;
	}

	public void setSubjectID(String subjectID) {
		this.subjectID = subjectID;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	
	
	public ArticleVO()
	{
		formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getBrowseCount() {
		return browseCount;
	}
	public void setBrowseCount(Integer browseCount) {
		this.browseCount = browseCount;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getAddUser() {
		return addUser;
	}
	public void setAddUser(String addUser) {
		this.addUser = addUser;
	}
	public String getAddTime() {
		return addTime;
	}
	public void setAddTime(Timestamp addTime) {
		if(addTime != null) this.addTime = formatter.format(addTime);
		else this.addTime="";
	}
	public String getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(Timestamp publishTime) {
		if(publishTime != null) this.publishTime = formatter.format(publishTime);
		else this.publishTime="";
	}
	public String getKeyWords() {
		return keyWords;
	}
	public void setKeyWords(String keyWords) {
		this.keyWords = keyWords;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getIsPublished() {
		return isPublished;
	}
	public void setIsPublished(String isPublished) {
		this.isPublished = isPublished;
	}
}