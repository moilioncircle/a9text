package com.trydofor.a9text.test;

import java.io.File;
import java.io.IOException;

 /************************************************************
 * @author  : Shi Rongjiu (www.trydofor.com)
 * @version : 2008-1-13 / $Revision$
 * @see     : requires/documents
 * ====================== change-logs =======================
 * $Log$
 ************************************************************/

public class EclipseEncoding {

	private int count = 0;
	
	public void makePrefs(String root,String ext) throws IOException
	{
		File file = new File(root);
		StringBuffer out = new StringBuffer();
		walkDir(file,ext,out);
		
		System.out.println(count);
		System.out.println(out.toString());
	}
	
	private void walkDir(File file,String ext,StringBuffer out) throws IOException
	{
		if(file.isDirectory())
		{
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) 
			{
				walkDir(files[i],ext,out);
			}
		}
		else
		{
			if(true)
			{
				count++;
			}
			else
			{
				if(ext == null)
				{
					out.append(file.getCanonicalPath());
					out.append("\n");
				}
				else if(file.getName().endsWith(ext))
				{
					out.append(file.getCanonicalPath());
					out.append("\n");
				}
			}
		}
	}
	
	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException 
	{
		EclipseEncoding ee = new EclipseEncoding();
		ee.makePrefs("D:/workspace/document/normal/jp", null);
	}
}
