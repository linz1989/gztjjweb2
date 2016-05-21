package com.gztjj.model;

import java.sql.Timestamp;

/**
 * Article entity. @author MyEclipse Persistence Tools
 */

public class Article implements java.io.Serializable {

	// Fields

	private Integer id;
	private String title;
	private String content;
	private Integer browseCount;
	private String origin;
	private String author;
	private String addUser;
	private Timestamp addTime;
	private Timestamp publishTime;
	private String keyWords;
	private String category;
	private String isPublished;

	// Constructors

	/** default constructor */
	public Article() {
	}

	/** full constructor */
	public Article(String title, String content, Integer browseCount,
			String origin, String author, String addUser, Timestamp addTime,
			Timestamp publishTime, String keyWords, String category,
			String isPublished) {
		this.title = title;
		this.content = content;
		this.browseCount = browseCount;
		this.origin = origin;
		this.author = author;
		this.addUser = addUser;
		this.addTime = addTime;
		this.publishTime = publishTime;
		this.keyWords = keyWords;
		this.category = category;
		this.isPublished = isPublished;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getBrowseCount() {
		return this.browseCount;
	}

	public void setBrowseCount(Integer browseCount) {
		this.browseCount = browseCount;
	}

	public String getOrigin() {
		return this.origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getAuthor() {
		return this.author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getAddUser() {
		return this.addUser;
	}

	public void setAddUser(String addUser) {
		this.addUser = addUser;
	}

	public Timestamp getAddTime() {
		return this.addTime;
	}

	public void setAddTime(Timestamp addTime) {
		this.addTime = addTime;
	}

	public Timestamp getPublishTime() {
		return this.publishTime;
	}

	public void setPublishTime(Timestamp publishTime) {
		this.publishTime = publishTime;
	}

	public String getKeyWords() {
		return this.keyWords;
	}

	public void setKeyWords(String keyWords) {
		this.keyWords = keyWords;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getIsPublished() {
		return this.isPublished;
	}

	public void setIsPublished(String isPublished) {
		this.isPublished = isPublished;
	}

}