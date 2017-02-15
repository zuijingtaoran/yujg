using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class non : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string ll = "select*from non_dm_mon where data_now like'%" + TextBox1.Text + "%' ";
        sql s = new sql();
        GridView1.DataSource = s.table(ll);
        GridView1.DataBind();
    }
}