package com.gztjj.model;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

/**
 * NoteBook entity. @author MyEclipse Persistence Tools
 */

public class NoteBookVO {

    // Fields    

     private Integer id;
     private String name;
     private String email;
     private String sex;
     private String noteType;
     private String noteTitle;
     private String noteContent;
     private String createTime;
     /*
      * false :¹«é_
      * true£ºË½ÃÜ
      */
     private Boolean noteSecret;
     private String noteReplay;
     private String replayTime;
     private String noteReplayUser;
     
     private int isPublish;
     private int seqNo;
     
	 private SimpleDateFormat formatter;


    // Constructors

    /** default constructor */
    public NoteBookVO() {
    	formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }

    /** full constructor */
    public NoteBookVO(String name, String email, String sex, String noteType, String noteTitle, String noteContent, String createTime, Boolean noteSecret, String noteReplay, String replayTime) {
        this.name = name;
        this.email = email;
        this.sex = sex;
        this.noteType = noteType;
        this.noteTitle = noteTitle;
        this.noteContent = noteContent;
        this.createTime = createTime;
        this.noteSecret = noteSecret;
        this.noteReplay = noteReplay;
        this.replayTime = replayTime;
        formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }
    
    public NoteBookVO(NoteBook noteBook){
    	formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	if(noteBook != null){
    		
    		this.setName(noteBook.getName());
    		this.id = noteBook.getId();
    		this.email = noteBook.getEmail();
    		this.sex = noteBook.getSex();
    		this.noteType=noteBook.getNoteType();
    		this.noteTitle = noteBook.getNoteTitle();
    		this.noteContent = noteBook.getNoteContent();
    		this.setCreateTime(noteBook.getCreateTime());
    		this.noteSecret = noteBook.getNoteSecret();
    		this.noteReplay = noteBook.getNoteReplay();
    		this.setReplayTime(noteBook.getReplayTime());
    		this.noteReplayUser = noteBook.getNoteReplayUser();
    		this.isPublish = noteBook.getIsPublish();
    		
    	}
    }
    
    public int getSeqNo() {
		return seqNo;
	 }

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}
   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return this.sex;
    }
    
    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getNoteType() {
        return this.noteType;
    }
    
    public void setNoteType(String noteType) {
        this.noteType = noteType;
    }

    public String getNoteTitle() {
        return this.noteTitle;
    }
    
    public void setNoteTitle(String noteTitle) {
        this.noteTitle = noteTitle;
    }

    public String getNoteContent() {
        return this.noteContent;
    }
    
    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }

    public String getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(Timestamp createTime) {
    	if(createTime != null) this.createTime = formatter.format(createTime);
		else this.createTime="";       
    }

    public Boolean getNoteSecret() {
        return this.noteSecret;
    }
    
    public void setNoteSecret(Boolean noteSecret) {
        this.noteSecret = noteSecret;
    }

    public String getNoteReplay() {
        return this.noteReplay;
    }
     
    public void setNoteReplay(String noteReplay) {    
    	this.noteReplay = noteReplay;
    }

    public String getReplayTime() {
        return this.replayTime;
    }
    
    public void setReplayTime(Timestamp replayTime) {
    	if(replayTime != null) this.replayTime = formatter.format(replayTime);
		else this.replayTime="";  
        
    }

	public String getNoteReplayUser() {
		return noteReplayUser;
	}

	public void setNoteReplayUser(String noteReplayUser) {
		this.noteReplayUser = noteReplayUser;
	}


	public int getIsPublish() {
		return isPublish;
	}

	public void setIsPublish(int isPublish) {
		this.isPublish = isPublish;
	} 
}