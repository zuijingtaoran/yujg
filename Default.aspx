<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title><meta http-equiv="X-UA-Compatible" content="IE=8,IE=11" />
    <style type="text/css">
    *{  font-family:Arial; font-size:20px; margin:0px; padding:0px;}
    .head{ padding:10px; height:30px; background-color:#4394d6; color:#fff;  position:relative;}
   #box{ padding:5%; }
    button{ width:100px; height:100px; background-color:#00b88c; color:#fff; margin:10px; display:block; border:none; border-radius:50%;}
  
  #kd100{ position:absolute; right:10px; top:10px; color:#fff;}  </style>
</head>
<body>
    
    <div class='head'>
    My web monitor
    <a id='kd100' href="//m.kuaidi100.com" target="_blank">快递查询</a></div>
    <div id='box'>
    <button class='non'>
    NON_DM Import
    </button>
     <button class='non'>
    Mail MES
    </button>
    
    </div>
    <script type="text/javascript">
        var buts = document.getElementById('box').getElementsByTagName('button');
        buts[0].onclick = function () {
            window.open('non.aspx', '_self');
        }
        buts[1].onclick = function () {
            window.open('MAIL.aspx', '_self');
        }
        window.onload = function () {
           
          

        }
    </script>
   
</body>
</html>
