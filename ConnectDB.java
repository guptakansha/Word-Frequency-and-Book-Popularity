package aar;

import java.sql.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Akansha Gupta on 08-02-2017.
 */
public class ConnectDB {

    Connection conn = null;
    Statement stmt = null;
    PreparedStatement pstmt = null;
   
    String sql = null;

    // JDBC driver name and database URL
    private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String DB_URL = "jdbc:mysql://localhost:3306/catvar?user=******&password=catvar";

    private static Set<String> selectFilter = new HashSet<String>();
    
    //getters and setters
    private void setSelectFilter(Set<String> selectFilter) {
        this.selectFilter = selectFilter;
    }

    public static Set<String> getSelectFilter() {
        return selectFilter;
    }
    
    public void clearSelectFilter() {
        selectFilter.clear();
    }


    //constructors
    private ConnectDB() {

        try{
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");
            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL);
        }catch(Exception e){
            //Handle errors for Class.forName
            e.printStackTrace();
        }
    }
    
    public ConnectDB(String sql) {
            this();
            this.sql = sql;
            dbProcess();
    }
    
    public ConnectDB(String sql, Set<String> stems) {
            this();
            this.sql = sql;
            setSelectFilter(stems);
            dbUpdates();
    }
    
    //jdbc query method with sql statement
    private void dbProcess() {
       //STEP 4: Execute a query
        ResultSet rs = null;
        int queryType = sql.substring(0,3).toUpperCase().equals("SEL")?0:1;
        
        try{
        System.out.println("Creating statement...");
        stmt = conn.createStatement();

        switch (queryType){
            case 0 :
                rs = stmt.executeQuery(sql);
                //System.out.print("selectFilter:");
                while(rs.next()){
                    String word = rs.getString(1);
                    selectFilter.add(word);
                    //System.out.print(word);
                }
                break;
            case 1 :
                int rows = stmt.executeUpdate(sql);
                System.out.print(rows + " updates.");
                break;
        }
        //STEP 6: Clean-up environment
        if(rs!=null) rs.close();
        stmt.close();
        conn.close();
        }catch(SQLException se){
            //Handle errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //Handle errors for Class.forName
            e.printStackTrace();
        }finally{
            closeConnection();
        }//end try
        System.out.println("Goodbye!");
    }
    
    //jdbc query method with prepared statement 
    private void dbUpdates() {
    try{
        //STEP 4: Execute Updates to multiple rows
        System.out.println("Creating prepared statement...");
        pstmt = conn.prepareStatement(sql);
        for (String e : selectFilter) {
            pstmt.setString(1, e);
            int rows = pstmt.executeUpdate();
            if (rows == 1)  System.out.print(e + " updated.");
        }
        //STEP 6: Clean-up environment
        pstmt.close();
        conn.close();
    }catch(SQLException se){
            //Handle errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //Handle errors for Class.forName
            e.printStackTrace();
        }finally{
            closeConnection();
        }//end try
        System.out.println("Goodbye!");
    }
    


    public void closeConnection() { //finally block used to close resources
        try{
            if(stmt!=null)
                stmt.close();
        }catch(SQLException se2){
        }// nothing we can do
        
        try{
            if(pstmt!=null)
                pstmt.close();
        }catch(SQLException se2){
        }// nothing we can do


        try{
            if(conn!=null)
                conn.close();
        }catch(SQLException se){
            se.printStackTrace();
        }//end finally try
    }
}
