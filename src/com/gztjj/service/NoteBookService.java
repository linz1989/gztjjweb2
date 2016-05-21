package com.gztjj.service;

import com.gztjj.model.NoteBook;
import com.gztjj.dao.NoteBookDao;
import java.util.List;

public class NoteBookService 
{
	private NoteBookDao noteBookDao = null;
	
	public void setNoteBookDao(NoteBookDao dao)
	{
		this.noteBookDao=dao;
	}
	
	public void saveNoteBook(NoteBook u)
	{
		this.noteBookDao.save(u);
	}
	
	public void updateNoteBook(NoteBook u)
	{
		this.noteBookDao.merge(u);
	}
	
	public NoteBook getNoteBookById(int id)
	{
		return this.noteBookDao.findById(id);
	}
	
	public int queryAllNoteBookTotalSize(int isPublish, String keyWords)
	{
		return this.noteBookDao.queryAllNoteBookTotalSize(isPublish,keyWords);
	}
	
	public List findPageResult(final int startPos, final int requestLength,int isPublic,String keyWords) {
		return this.noteBookDao.findPageResult(startPos, requestLength, isPublic, keyWords);
	}
	
	public int delNoteBook(int[] ids) 
	{
		NoteBook u;
		for(int i=0;i<ids.length;i++)
		{
			u=this.noteBookDao.findById(ids[i]);
			if(u != null) 
			{
				this.noteBookDao.delete(u);
			}
		}
		return 1;
	}
}