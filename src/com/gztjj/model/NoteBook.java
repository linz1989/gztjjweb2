package com.gztjj.model;
import java.sql.Timestamp;


/**
 * NoteBook entity. @author MyEclipse Persistence Tools
 */

public class NoteBook  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String name;
     private String email;
     private String sex;
     private String noteType;
     private String noteTitle;
     private String noteContent;
     private Timestamp createTime;
     /*
      * false :¹«é_
      * true£ºË½ÃÜ
      */
     private Boolean noteSecret;
     private String noteReplay;
     private Timestamp replayTime;
     private String noteReplayUser;
     private int isPublish;

    // Constructors

    /** default constructor */
    public NoteBook() {
    }

    
    /** full constructor */
    public NoteBook(String name, String email, String sex, String noteType, String noteTitle, String noteContent, Timestamp createTime, Boolean noteSecret, String noteReplay, Timestamp replayTime) {
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

    public Timestamp getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
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

    public Timestamp getReplayTime() {
        return this.replayTime;
    }
    
    public void setReplayTime(Timestamp replayTime) {
        this.replayTime = replayTime;
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