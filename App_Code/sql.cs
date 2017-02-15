using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;


using System.Data.SqlClient;
using System.Data.OleDb;
/// <summary>
///sql 的摘要说明
/// </summary>
public class sql
{
    public string ccc()
    {
        string cc = "Data Source=qds108295359.my3w.com;User ID=qds108295359;Password=wy20151018;Initial Catalog=qds108295359_db;Integrated Security=false";
        //   string cc = "Data Source=CVPSQLIPV1\SDSS;User ID=cas_sa;Password=Ca5psuud;Initial Catalog=CAS;Integrated Security=false"
        return cc;
    }

    public DataTable table(string linkchar)
    {
        string linktable = "table";
        SqlConnection conn;
        SqlDataAdapter da;

        conn = new SqlConnection(ccc());
        da = new SqlDataAdapter(linkchar, conn);
        DataSet ds = new DataSet();
        da.Fill(ds, linktable);
        DataTable dt = ds.Tables[linktable];
        return dt;
    }
    public string up_sql(string ll)
    {

        SqlConnection conn;
        SqlCommand comm;
        conn = new SqlConnection(ccc());
        conn.Open();
        comm = new SqlCommand(ll, conn);
        comm.ExecuteNonQuery();
        conn.Close();//
        return "ok";
    }
}