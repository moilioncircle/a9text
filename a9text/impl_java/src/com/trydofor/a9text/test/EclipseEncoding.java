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
	private long sze = 0;
	private int docCnt = 0;
	private long docSze = 0;
	private int xlsCnt = 0;
	private long xlsSze = 0;
	private int vsdCnt = 0;
	private long vsdSze = 0;
	
	public void makePrefs(String root,String ext) throws IOException
	{
		File file = new File(root);
		StringBuffer out = new StringBuffer();
		walkDir(file,ext,out);
		
		System.out.println("other:"+count +"("+sze+")");
		System.out.println("word:"+docCnt +"("+docSze+")");
		System.out.println("excel:"+xlsCnt +"("+xlsSze+")");
		System.out.println("visio:"+vsdCnt +"("+vsdSze+")");
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
				String fn = file.getName();
				if(fn.endsWith(".doc"))
				{
					docCnt ++;
					docSze +=file.length();
				}
				else if (fn.endsWith(".xls"))
				{
					xlsCnt ++;
					xlsSze +=file.length();
				}
				else if (fn.endsWith(".vsd"))
				{
					vsdCnt ++;
					vsdSze +=file.length();
				}
				else
				{
					count++;
					sze +=file.length();
				}
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
		ee.makePrefs("D:/workspace/document_jic/document/normal/jp", null);
		ee.makePrefs("D:/workspace/document/normal/jp", null);
	}
}
