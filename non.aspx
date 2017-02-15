<%@ Page Language="C#" AutoEventWireup="true" CodeFile="non.aspx.cs" Inherits="non" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="doc/js/Calendar2.js" type="text/javascript"></script>
    <script src="doc/js/DCoolWeb.Calendar%20v3.2.en.js" type="text/javascript"></script>
    <style type="text/css">
    button{}
    table{ width:80%; margin-top:10px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox ID="TextBox1" runat="server"  onclick='calendar()'></asp:TextBox>
        <asp:Button ID="Button1" runat="server" Text="Search" onclick="Button1_Click" />
    
        <br />
        <asp:GridView ID="GridView1" runat="server">
        </asp:GridView>
    
    </div>
    </form>
</body>
</html>
