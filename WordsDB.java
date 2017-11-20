package aar;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Set;

/**
 * Created by Akansha Gupta on 08-02-2017.
 */
public class WordsDB {
    public static void main(String[] args) throws Exception {

    String strFile = "./data/list2.txt";
    //create BufferedReader to read csv file
    BufferedReader br = new BufferedReader(new FileReader(strFile));
    String wordOnLine = "";
    boolean usedRoot = false;
    
    //read the list from file line by line
    while ((wordOnLine = br.readLine()) != null) {
        wordOnLine= wordOnLine.trim();
        String sql = "SELECT variation FROM book2 where word ='" + wordOnLine+ "'";
        ConnectDB dbClass = new ConnectDB(sql);
        Set<String> checkWord = dbClass.getSelectFilter();
        dbClass.clearSelectFilter();
        checkWord.remove(null);
        //System.out.print("variations set :" + checkWord + " size:"+ checkWord.size() );
        //System.out.println();
        if (checkWord.size() == 0){
           
            Set<String> selectFilter = getRelatedWords(wordOnLine);
            System.out.print(wordOnLine + ": ");
            //System.out.print(selectFilter);

            if (selectFilter.size() > 1) {
                ConnectURL url = new ConnectURL(wordOnLine);
                String capture = wordOnLine;
                if (url.getCluster().size() == 0){
                    String root = wordOnLine.replaceAll("(ment|s|ed|ing)$", "");
                    if (!(root.equals(capture))){
                        url = new ConnectURL(root);
                        if (url.getCluster().contains(root) ) usedRoot = true;
                    }
                }
                System.out.println(" Iterating over HashSet from CATVAR: " + url.getCluster());
                selectFilter.retainAll(url.getCluster());
                if (usedRoot) {
                    selectFilter.add(capture);
                    usedRoot=false;
                }
                System.out.println(" Iterating over HashSet from DB: " + selectFilter);
                resultToDb(capture, selectFilter);
            }
        }
    }
    br.close();
    }

    private static Set<String> getRelatedWords(String nextWord) {
        String sql;
        String filter = nextWord.substring(0,2);
        sql = "SELECT word FROM book2 where word like '" + filter + "%'";
        ConnectDB dbClass = new ConnectDB(sql);
        dbClass.closeConnection();
        return dbClass.getSelectFilter();

    }

    private static void resultToDb(String currentWord, Set<String> stems) {
        String sql;
        ConnectDB dbClass;
        
        if (stems.size() > 0) {
            System.out.print(currentWord);
            sql = "Update book2 set variation ='" + currentWord + "' where word =?";
            dbClass = new ConnectDB(sql, stems);
        }else
        {
            sql = "Update book2 set variation ='" + currentWord + "' where word = '"+ currentWord +"'";
            dbClass = new ConnectDB(sql);
        }
        dbClass.closeConnection();
    }


}
