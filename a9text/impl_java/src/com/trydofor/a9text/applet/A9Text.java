package com.trydofor.a9text.applet;

import java.applet.Applet;

 /************************************************************
 * @author  : Shi Rongjiu (www.trydofor.com)
 * @version : 2008-1-24 / $Revision$
 * @see     : requires/documents
 * ====================== change-logs =======================
 * $Log$
 ************************************************************/

public class A9Text extends Applet
{

	private static final long serialVersionUID = 1009;

	
	/**
	 *  Applet
	 */
	
	public void destroy() 
	{
		super.destroy();
		System.out.println("destory");
	}

	public void init() 
	{
		super.init();
		System.out.println("init");
	}

	public void start() 
	{
		super.start();
		System.out.println("start");
	}

	public void stop() 
	{
		super.stop();
		System.out.println("stop");
	}

	/**
	 * Application
	 */
	public static void main(String[] args) 
	{

	}
}
