package com.gztjj.servlet;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class Log4jInit extends HttpServlet
{
	static Logger logger = Logger.getLogger(Log4jInit.class); 
	
    public Log4jInit() { 
    } 

    public void init(ServletConfig config) throws ServletException 
    { 
        String prefix = config.getServletContext().getRealPath("/"); 
        String file = config.getInitParameter("log4j"); 
        String filePath = prefix + file; 
        
        //System.out.println("prefix:"+prefix);
        //System.out.println("file:"+file);
        //System.out.println("filePath:"+filePath);
        
        Properties props = new Properties(); 
        try 
        { 
            FileInputStream istream = new FileInputStream(filePath); 
            props.load(istream); 
            istream.close();  
             
            String logFile = prefix + props.getProperty("log4j.appender.R.File");//设置路径 
            //System.out.println("logFile:"+logFile);
            props.setProperty("log4j.appender.R.File",logFile); 
            PropertyConfigurator.configure(props);//装入log4j配置信息 
        } 
        catch (IOException e) 
        { 
            //System.out.println("Could not read configuration file [" + filePath + "]."); 
            //System.out.println("Ignoring configuration file [" + filePath + "]."); 
            return; 
        } 
    } 
}