using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MAIL : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {//select top 1*from auto_mail order by a1 desc
        if (TextBox2.Text != "automail") { return; }
        string ll = "select*from AUTO_MAIL where a6 like'%" + TextBox1.Text.Replace("-","") + "%'";
        sql s = new sql();
        GridView1.DataSource = s.table(ll);
        GridView1.DataBind();
    }
}