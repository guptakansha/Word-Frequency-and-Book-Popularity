package aar;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Akansha Gupta on 08-02-2017.
 */
public class ConnectURL {
    final private static String CATVAR_URL = "https://clipdemos.umiacs.umd.edu/cgi-bin/catvar/webCVsearch.pl?";
    Set<String> cluster = new HashSet<String>();


    public Set<String> getCluster() {
        return cluster;
    }

    public void setCluster(Set<String> cluster) {
        this.cluster = cluster;
    }

    public ConnectURL(String nextWord) {


        Document catvar = null;
        String filter = nextWord.substring(0,2);
        boolean found = false;
        try {
            catvar = Jsoup.connect(makeQuery(nextWord)).get();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Elements query = catvar.select("tr");
        //System.out.println(query);
        for (Element row : query) {
            String word = row.getElementsByTag("td").get(0).getElementsByTag("b").text();
            
            if (word.equals("Word") || word.isEmpty() ) {
                    if (found) {
                        setCluster(cluster);
                        break;
                    }
                    cluster.clear();
            }
            if (!(word.equals("Word") || word.isEmpty() )){
                if (word.startsWith(filter)) {
                    cluster.add(word);
                    if (word.equals(nextWord)) found = true;
                }
            }
        }


    }

    private static String makeQuery(String word) {
        return CATVAR_URL+"query="+word+"&submit=CatVariate%21";
    }



}
