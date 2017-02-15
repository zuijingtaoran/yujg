<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MAIL.aspx.cs" Inherits="MAIL" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="doc/js/Calendar2.js" type="text/javascript"></script>
    <script src="doc/js/DCoolWeb.Calendar%20v3.2.en.js" type="text/javascript"></script>
    <style type="text/css">
        *{ font-size:25px;}
  
    table{ width:90%; margin-top:2%; margin-left:2%}
    input{ width:60%; height:40px;}
     #Button1{ height:40px; width:25%; background:#4394d6;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox ID="TextBox1" runat="server" >1572129</asp:TextBox><asp:TextBox ID="TextBox2"
            runat="server"></asp:TextBox>
        <asp:Button ID="Button1" runat="server" Text="Search" onclick="Button1_Click" />
    
        <br />
        <asp:GridView ID="GridView1" runat="server">
        </asp:GridView>
    
    </div>
    </form>
</body>
</html>
