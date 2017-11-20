import java.util.Map;

/**
 * Created by Akansha Gupta on 21-02-2017.
 */
public class NewFrequency {

    public static void main(String[] args){
        Map<String, Integer> selectSum = getCols();
        if (selectSum.size() > 0) {
            for (Map.Entry<String, Integer> entry : selectSum.entrySet()) {
                String word = entry.getKey();
                Integer sum = entry.getValue();
                resultToDB(word,sum);
            }
        }
    }

    private static void resultToDB(String word, Integer sum) {
        String sql = "UPDATE book2 SET new_frequency ='" + sum + "' WHERE word = '"+ word+"'";
        ConnectDB1 dbClass = new ConnectDB1(sql);
        dbClass.closeConnection();
    }

    private static Map<String, Integer> getCols(){
        String sql = "SELECT word, sum(frequency) FROM book2 WHERE variation IS NOT NULL GROUP BY variation";
        ConnectDB1 dbClass = new ConnectDB1(sql);
        dbClass.closeConnection();
        return dbClass.getSelectSum();
    }
}
