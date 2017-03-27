

var jg_danwei = "";
function EC() {
    this.Chart_Box = "Chart";
    this.Title = "Chart_demo";
    this.SubTitle = "";
    this.X_step = 1;
    this.Y_name = ""
    this.Export_button =false;
    this.Source_Data = "A1,B2,C3,D4,E5,F6,H7|82.3,null,null,39.9,38,45.4,39.6=81,89,65,47,39,49,35";
    this.Series_name = "xiaoming,xiaozhang";
    this.Series_type = "spline,spline";
    this.Line_Val = false;
    this.Spline_Val = false;
    this.Column_Val = true;
    this.Area_Val = false;
   // this.Y_Max = 100;
    this.Y_Min = null;
    this.Goal_Val = 0;
    this.Goal_Width = 0;
    this.Column_Total = true;
    this.Y_Para = "mm=降水量|℃=温度";
    this.Pie_3D = false;
    this.Pie_innerSize = 0;
    this.Pie_depth = 35;
    this.columnWidth =16;
    this.pointcount = 0;
    this.group = false;
    this.style_3D = true;
this.Pie_val="300,300,300,300,300,300,300,300,300,300,300,300"; //"403,474,496,402,355,229,295,263,251,399,448,354,444,420,407,408,415,259,290,223,277,346,361,259";
this.Pie_item = "1点,2点,3点,4点,5点,6点,7点,8点,9点,10点,11点,12点";
//Highcharts.setOptions({
//    colors: ['#4f81bd','#00b050','#f00', '#00437a', '#4f7600', '#630063', '#50e466', '#dee477', '#db4fad']//#4f81bd,#00b050,#f00
//}); 
Highcharts.setOptions({
// colors: ['#6ea7db','#68c555','#e9a059', '#9196f8']//#4f81bd,#00b050,#f00
    colors: ['#d2171f', '#717171', '#9b2128', '#0072aa', '#dab130', '#3f8f37']
}); 
this.Show_Chart = function () {

    var sz = this.Source_Data.split('|'); //, type: 'spline'

    var options = { chart: { renderTo: this.Chart_Box, backgroundColor: ''//, plotBackgroundImage: 'doc/img/bg/wf.jpg'
    , backgroundColor: 'rgba(0,0,0,0)'//http://www.highcharts.com/demo/gfx/skies.jpg
        , options3d: { enabled: this.style_3D, alpha: 4, beta: 7, depth: 50, viewDistance: 25 }
    },
        title: { text: this.Title },
        exporting: { enabled: this.Export_button },
        credits: { enabled: false },

        xAxis: { categories: [], labels: { step: this.X_step, rotation: -45} },
        plotOptions: {
            line: { dataLabels: { enabled: this.Line_Val} }, spline: { dataLabels: { enabled: this.Spline_Val} },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: this.columnWidth,
                //stacking: 'normal',
                 dataLabels: { enabled: this.Column_Val }
            },
            /*Whether to stack the values of each series on top of each other. 
            Possible values are null to disable, "normal" to stack by value or "percent".*/
            area: { dataLabels: { enabled: this.Area_Val} },
            series: {
                cursor: 'pointer',
                events: {
                    click: function (e) {
                        //alert('X轴的值：' + e.point.category + ' \r\n类别的名称:' + this.name);
                        // document.getElementById("tit").innerHTML += this.name + ":" + e.point.category + "=" + e.point.y + "<br/>";
                        try {
                            EC_Click_Event(this.name, e.point.category, e.point.y);
                        }
                        catch (e) {
                            // alert("若需web相应此点击事件，请添加 \r\nfunction click_event(Series_Type,X_name,Y_value)\r\n{\r\n--自定义点击事件，此处可缺省--\r\n}");
                        }
                    }
                }
            }
        },
        legend: {
            //                layout: 'vertical',
            //                align: 'left',
            itemStyle: {
                'fontSize': '11px', fontWeight: 'normal'
            }
            //    ,

            //                verticalAlign: 'top',
            //                y:10,x:50,
            //                floating: true //,               backgroundColor: '#FFFFFF'
        },

        yAxis: { title: { text: this.Y_name },
            stackLabels: {
                enabled: this.Column_Total,

                style: {
                    fontWeight: 'normal',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                },
                formatter: function () {
                    return Highcharts.numberFormat(this.total, 0, ".", ",");
                }
            },

            min: this.Y_Min, max: this.Y_Max

            , plotLines: [{ label: { align: 'left', style: { color: '#ed1c24', fontWeight: 'normal' }, text: this.Goal_Val }, value: this.Goal_Val, width: this.Goal_Width, color: '#ed1c24'}]
        },
        //  plotOptions: { line: { dataLabels: { enabled: true }, enableMouseTracking: false }, spline: { dataLabels: { enabled: true }, enableMouseTracking: false }, column: { dataLabels: { enabled: true }, enableMouseTracking: false} },
        series: [],
        exporting: { enabled: this.Export_button }
    };     //声明option

    //tooltip:{
    //   formatter:function(){
    //      return''+this.series.name+''+
    //         this.x+': '+Highcharts.numberFormat(this.y,2,'.')+' millions';
    //   }
    //},

    var name = "chart";



    var aa = sz[1].split('='); //切割表格



    var lines = "";
    var s_li = this.Series_name;
    var s_it = s_li.split(',');
    var s_ty = this.Series_type; // "area,spline,spline";
    var s_tyi = s_ty.split(',');
    for (i = 0; i < aa.length; i++) {
        lines = aa[i].split(',');
//        if (this.group) {//UPDATE 0709
//            var series = { type: [], name: [], data: [], stack: [] };
//            if (i % 2 == 0) { series.stack = "Actual"; } else { series.stack = "Goal"; }
//        } else {
            var series = { type: [], name: [], data: [] };
//        }

        series.name = s_it[i];
        series.type = s_tyi[i];
       series.tooltip=
        {
            valueSuffix: jg_danwei
        }
        $.each(lines, function (lineNo, line) {
            if (line == "null") { series.data.push(null); } else {
                series.data.push(parseFloat(line));
            }
        })
        options.series.push(series);
    }

    //  bb = temp(lines.length); //获取温度点
    //if (this.group) { sz[0] = "Q1,Q2,Q3,Q4"; }
    var items = sz[0].split(',');

    $.each(items, function (itemNo, item) { options.xAxis.categories.push(item); });

    var chart = new Highcharts.Chart(options);

}
    this.Show_Chart_pie = function () {
        //        // var arr = [["0-1",26],["1-1",12],["2-1",22]];

        //        bbb = "300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300,300"; //"403,474,496,402,355,229,295,263,251,399,448,354,444,420,407,408,415,259,290,223,277,346,361,259";
        //        aaa = "凌晨0-1点,凌晨1-2点,凌晨2-3点,凌晨3-4点,凌晨4-5点,凌晨5-6点,上午6-7点,上午7-8点,上午8-9点,上午9-10点,上午10-11点,上午11-12点,下午12-13点,下午13-14点,下午14-15点,下午15-16点,下午16-17点,下午17-18点,晚上18-19点,晚上19-20点,晚上20-21点,晚上21-22点,晚上22-23点,晚上23-0点";
        //        this.Source_Data = aaa + "|" + bbb;
        //        var aa = this.Source_Data.split("|");
        var lines = this.Pie_item.split(','); var items = this.Pie_val.split(',');
        var arr = new Array();
        for (var i = 0; i < lines.length; i++) {
            var tmp = new Array();
            tmp[0] = lines[i];
            tmp[1] = parseFloat(items[i]);
            arr[i] = tmp;
        }

        var options = { chart: { renderTo: this.Chart_Box, type: 'pie',
            options3d: {
                enabled: this.Pie_3D,
                alpha: 45
            }



        }, credits: { enabled: false },
            title: { text: this.Title }, tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y;
                }
            }
        , plotOptions: {
            pie: {
                // allowPointSelect: false,
                innerSize: this.Pie_innerSize,
                depth: this.Pie_depth,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function () {
                        return '<b>' + this.point.name + '</b> ' + (this.y / 84.78).toFixed(2) + ' %';
                    }
                }
            }
        }, exporting: { enabled: this.Export_button },


            series: [{
                name: 'Browser share',
                events: {
                    click: function (e) {
                        //alert("Index:"+e.point.x + ",Value:" + e.point.y);
                        // document.getElementById("tit").innerHTML += this.name + ":" + e.point.category + "=" + e.point.y + "<br/>";
                        try {
                            Pie_click(e.point.x, e.point.y);
                        }
                        catch (e) {
                            alert("若需web相应此点击事件，请添加 \r\nfunction Pie_click(str0,str1)\r\n{\r\n--自定义点击事件，此处可缺省--\r\n}");
                        }

                    }
                },


                data: arr
            }




        ]
        }; //声明option
        //        $('#container').highcharts({
        //            chart: {
        //                type: 'pie',
        //                options3d: {
        //                    enabled: true,
        //                    alpha: 45
        //                }
        //            },
        //            title: {
        //                text: 'Contents of Highsofts weekly fruit delivery'
        //            },
        //            subtitle: {
        //                text: '3D donut in Highcharts'
        //            },
        //            plotOptions: {
        //                pie: {
        //                    innerSize: 100,
        //                    depth: 45
        //                }
        //            },
        //            series: [{
        //                name: 'Delivered amount',
        //                data: [
        //                ['Bananas', 8],
        //                ['Kiwi', 3],
        //                ['Mixed nuts', 1],
        //                ['Oranges', 6],
        //                ['Apples', 8],
        //                ['Pears', 4],
        //                ['Clementines', 4],
        //                ['Reddish (bag)', 1],
        //                ['Grapes (bunch)', 1]
        //            ]
        //            }]
        //        });


        var chart = new Highcharts.Chart(options);
    }

    this.Show_Chart_TwoY=function(){
            if (this.Source_Data == "语文,数学,英语,地理,政治,历史,生物|82.3,null,null,39.9,38,45.4,39.6=81,89,65,47,39,49,35")
            { this.Source_Data = "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月|123,245,368,486,512,679,902,1002,753,562,458,267=-3.4,-0.9,4.5,12.3,24.5,27.9,30.0,27.4,20.5,15.6,9.4,2.3"; }
            var y_para = this.Y_Para.split('|'); var y_1 = y_para[0].split('='); var y_2 = y_para[1].split('='); yAxis_name = y_1[1] + "," + y_2[1];
            col_co = "#89A54E,#4572A7,#AA4643";

            var sz = this.Source_Data.split('|');
            var col = col_co.split(',');
            var options = {
                chart: {
                    renderTo: this.Chart_Box //zoomType: 'xy',
                },
                title: {
                    text: this.Title///////////
                },
                credits: { enabled: false },
                xAxis: {
                    categories: []//'a','b','c','d','e','f','g'
                }, plotOptions: {
                    line: { dataLabels: { enabled: this.Line_Val} }, spline: { dataLabels: { enabled: this.Spline_Val} },
                    column: { dataLabels: { enabled: this.Column_Val} },
                    /*Whether to stack the values of each series on top of each other. 
                    Possible values are null to disable, "normal" to stack by value or "percent".*/
                    area: { dataLabels: { enabled: this.Area_Val} },
                    series: {
                        cursor: 'pointer',
                        events: {
                            click: function (e) {
                                //alert('X轴的值：' + e.point.category + ' \r\n类别的名称:' + this.name);
                                // document.getElementById("tit").innerHTML += this.name + ":" + e.point.category + "=" + e.point.y + "<br/>";
                                try {
                                    EC_Click_Event(this.name, e.point.category, e.point.y);
                                }
                                catch (e) { alert("若需web相应此点击事件，请添加 \r\nfunction click_event(Series_Type,X_name,Y_value)\r\n{\r\n--自定义点击事件，此处可缺省--\r\n}"); }
                            }
                        }
                    }
                },
                yAxis: [{ // Primary yAxis
                    labels: {
                        formatter: function () {
                            return this.value + y_1[0];
                        }
                    },
                    title: {
                        text: y_1[1]
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: y_2[1]
                    },
                    labels: {
                        formatter: function () {
                            return this.value + y_2[0];
                        }
                    }

                }/*, { // Tertiary yAxis
                             gridLineWidth: 0,
                             title: {
                                 text: y_3[1]
                             },
                             labels: {
                                 formatter: function () {
                                     return this.value + y_3[0];
                                 }
                             },
                             opposite: true
                         }*/],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 80,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                exporting: { enabled: this.Export_button }, series: []
            };
            var aa = sz[1].split('='); //切割表格



            var lines = "";
            var s_li = yAxis_name; var s_it = s_li.split(',');
            var s_ty = this.Series_type; var s_tyi = s_ty.split(',');
            for (i = 0; i < aa.length; i++) {
                lines = aa[i].split(',');
                var series = { type: [], name: [], data: [], yAxis: [] }; //UPH,UPH Goal,Average

                series.name = s_it[i];
                series.type = s_tyi[i];


                series.yAxis = i;
                $.each(lines, function (lineNo, line) {
                    if (line == "null") { series.data.push(null); } else {
                        series.data.push(parseFloat(line));
                    }
                })
                options.series.push(series);
            }


            var items = sz[0].split(',');
            $.each(items, function (itemNo, item) { options.xAxis.categories.push(item); });

            var chart = new Highcharts.Chart(options);
        }


}
//function EC_init() {
//    var echart = new EC();
//    EC_Chart_Box = "Chart";
//    EC_Title = "Chart_demo";
//    EC_SubTitle = "";
//    EC_X_step = 1;
//    EC_Y_name = "数值单位"
//    EC_Export_button = false;
//    EC_Source_Data = "语文,数学,英语,地理,政治,历史,生物|82.3,null,null,39.9,38,45.4,39.6=81,89,65,47,39,49,35";
//    EC_Series_name = "xiaoming,xiaozhang";
//    EC_Series_type = "column,column";
//    EC_Line_Val = false;
//    EC_Spline_Val = false;
//    EC_Column_Val = false;
//    EC_Area_Val = false;
//    EC_Y_Max = null;
//    EC_Y_Min = null;
//    EC_Goal_Val = 0;
//    EC_Goal_Width = 0;
//    EC_Column_Total = true;
//    EC_Y_Para = "mm=降水量|℃=温度";
//}
//function EC_Show_Chart() {




//    var sz = EC_Source_Data.split('|'); //, type: 'spline'

//    var options = { chart: { renderTo: EC_Chart_Box
//        //    , options3d: { enabled: true, alpha: 15,beta: 15, depth: 50,viewDistance: 25 }
//    },
//        title: { text: EC_Title },
//        credits: { enabled: false },
//        xAxis: { categories: [], labels: { step: EC_X_step} },
//        plotOptions: {
//            line: { dataLabels: { enabled: EC_Line_Val} }, spline: { dataLabels: { enabled: EC_Spline_Val} },
//            column: { stacking: 'normal', dataLabels: { enabled: EC_Column_Val} },
//            /*Whether to stack the values of each series on top of each other. 
//            Possible values are null to disable, "normal" to stack by value or "percent".*/
//            area: { dataLabels: { enabled: EC_Area_Val} },
//            series: {
//                cursor: 'pointer',
//                events: {
//                    click: function (e) {
//                        //alert('X轴的值：' + e.point.category + ' \r\n类别的名称:' + this.name);
//                        // document.getElementById("tit").innerHTML += this.name + ":" + e.point.category + "=" + e.point.y + "<br/>";
//                        try {
//                            EC_Click_Event(this.name, e.point.category, e.point.y);
//                        }
//                        catch (e) { alert("若需web相应此点击事件，请添加 \r\nfunction click_event(Series_Type,X_name,Y_value)\r\n{\r\n--自定义点击事件，此处可缺省--\r\n}"); }
//                    }
//                }
//            }
//        },
//        yAxis: { title: { text: EC_Y_name },
//            stackLabels: {
//                enabled: EC_Column_Total,
//                style: {
//                    fontWeight: 'bold',
//                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
//                }
//            },

//            min: EC_Y_Min, max: EC_Y_Max

//            , plotLines: [{ label: { align: 'left', style: { color: '#ed1c24', fontWeight: 'bold' }, text: EC_Goal_Val }, value: EC_Goal_Val, width: EC_Goal_Width, color: '#ed1c24'}]
//        },
//        //  plotOptions: { line: { dataLabels: { enabled: true }, enableMouseTracking: false }, spline: { dataLabels: { enabled: true }, enableMouseTracking: false }, column: { dataLabels: { enabled: true }, enableMouseTracking: false} },
//        exporting: { enabled: EC_Export_button }, series: []
//    };     //声明option


//    var name = "chart";



//    var aa = sz[1].split('='); //切割表格



//    var lines = "";
//    var s_li = EC_Series_name;
//    var s_it = s_li.split(',');
//    var s_ty = EC_Series_type; // "area,spline,spline";
//    var s_tyi = s_ty.split(',');
//    for (i = 0; i < aa.length; i++) {
//        lines = aa[i].split(',');
//        var series = { type: [], name: [], data: [] };

//        series.name = s_it[i];
//        series.type = s_tyi[i];
//        $.each(lines, function (lineNo, line) {
//            if (line == "null") { series.data.push(null); } else {
//                series.data.push(parseFloat(line));
//            }
//        })
//        options.series.push(series);
//    }

//    //  bb = temp(lines.length); //获取温度点
//    var items = sz[0].split(',');

//    $.each(items, function (itemNo, item) { options.xAxis.categories.push(item); });

//    var chart = new Highcharts.Chart(options);
//    EC_init();
//}
////Chart_box, Title, yAxis, Source_data, yAxis_type
////var EC_Chart_Box = "Chart";
////var EC_Title = "Chart_demo";
////var EC_SubTitle = "";
////var EC_X_step = 1;
////var EC_Y_name = "数值单位"
////var EC_Export_button = false;
////var EC_Source_Data = "语文,数学,英语,地理,政治,历史,生物|82.3,null,null,39.9,38,45.4,39.6=81,89,65,47,39,49,35=91,83.5,75,38,42,45.5,42.7";
////var EC_Series_name = "xiaoming,xiaozhang,xiaowang";
////var EC_Series_type = "spline,column,column";
////var EC_Line_Val = false;
////var EC_Spline_Val = false;
////var EC_Column_Val = false;
////var EC_Area_Val = false;
////var EC_Y_Max = null;
////var EC_Y_Min = null;
////var EC_Goal_Val = 0;
////var EC_Goal_Width = 0;



//function EC_Show_Chart_TwoY() {
//    if (EC_Source_Data == "语文,数学,英语,地理,政治,历史,生物|82.3,null,null,39.9,38,45.4,39.6=81,89,65,47,39,49,35")
//    { EC_Source_Data = "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月|123,245,368,486,512,679,902,1002,753,562,458,267=-3.4,-0.9,4.5,12.3,24.5,27.9,30.0,27.4,20.5,15.6,9.4,2.3"; }
//    var y_para = EC_Y_Para.split('|'); var y_1 = y_para[0].split('='); var y_2 = y_para[1].split('='); yAxis_name = y_1[1] + "," + y_2[1];
//    col_co = "#89A54E,#4572A7,#AA4643";

//    var sz = EC_Source_Data.split('|');
//    var col = col_co.split(',');
//    var options = {
//        chart: {
//            renderTo: EC_Chart_Box //zoomType: 'xy',
//        },
//        title: {
//            text: EC_Title///////////
//        },
//        credits: { enabled: false },
//        xAxis: {
//            categories: []//'a','b','c','d','e','f','g'
//        }, plotOptions: {
//            line: { dataLabels: { enabled: EC_Line_Val} }, spline: { dataLabels: { enabled: EC_Spline_Val} },
//            column: { dataLabels: { enabled: EC_Column_Val} },
//            /*Whether to stack the values of each series on top of each other. 
//            Possible values are null to disable, "normal" to stack by value or "percent".*/
//            area: { dataLabels: { enabled: EC_Area_Val} },
//            series: {
//                cursor: 'pointer',
//                events: {
//                    click: function (e) {
//                        //alert('X轴的值：' + e.point.category + ' \r\n类别的名称:' + this.name);
//                        // document.getElementById("tit").innerHTML += this.name + ":" + e.point.category + "=" + e.point.y + "<br/>";
//                        try {
//                            EC_Click_Event(this.name, e.point.category, e.point.y);
//                        }
//                        catch (e) { alert("若需web相应此点击事件，请添加 \r\nfunction click_event(Series_Type,X_name,Y_value)\r\n{\r\n--自定义点击事件，此处可缺省--\r\n}"); }
//                    }
//                }
//            }
//        },
//        yAxis: [{ // Primary yAxis
//            labels: {
//                formatter: function () {
//                    return this.value + y_1[0];
//                }
//            },
//            title: {
//                text: y_1[1]
//            },
//            opposite: true

//        }, { // Secondary yAxis
//            gridLineWidth: 0,
//            title: {
//                text: y_2[1]
//            },
//            labels: {
//                formatter: function () {
//                    return this.value + y_2[0];
//                }
//            }

//        }/*, { // Tertiary yAxis
//                     gridLineWidth: 0,
//                     title: {
//                         text: y_3[1]
//                     },
//                     labels: {
//                         formatter: function () {
//                             return this.value + y_3[0];
//                         }
//                     },
//                     opposite: true
//                 }*/],
//        tooltip: {
//            shared: true
//        },
//        legend: {
//            layout: 'vertical',
//            align: 'left',
//            x: 120,
//            verticalAlign: 'top',
//            y: 80,
//            floating: true,
//            backgroundColor: '#FFFFFF'
//        },
//        exporting: { enabled: EC_Export_button }, series: []
//    };
//    var aa = sz[1].split('='); //切割表格



//    var lines = "";
//    var s_li = yAxis_name; var s_it = s_li.split(',');
//    var s_ty = EC_Series_type; var s_tyi = s_ty.split(',');
//    for (i = 0; i < aa.length; i++) {
//        lines = aa[i].split(',');
//        var series = { type: [], name: [], data: [], yAxis: [] }; //UPH,UPH Goal,Average

//        series.name = s_it[i];
//        series.type = s_tyi[i];


//        series.yAxis = i;
//        $.each(lines, function (lineNo, line) {
//            if (line == "null") { series.data.push(null); } else {
//                series.data.push(parseFloat(line));
//            }
//        })
//        options.series.push(series);
//    }


//    var items = sz[0].split(',');
//    $.each(items, function (itemNo, item) { options.xAxis.categories.push(item); });

//    var chart = new Highcharts.Chart(options);
//    EC_init();
//};



////function show_chart_ny(Chart_Box, Title, X_step, Y_name, Export, Source_Data, Series_name, Series_type, Line_Val, Spline_Val, Column_Val, Area_Val) {
////   
////    str = Chart_Box; str1 = Title; str2 = X_step; str3 = Y_name; str4 = Export; str5 = Source_Data; str6 = Series_name;
////    str7 = Series_type; str8 = Line_Val; str9 = Spline_Val; str10 = Column_Val; str11 = Area_Val;
////    //'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
////    var ch_da = str5; //"语文,数学,英语,地理,政治,历史,生物|82.3,89.6,87.1,39.9,38,45.4,39.6=81,89,65,47,39,49,35=91,83.5,75,38,42,45.5,42.7";
////    var sz = ch_da.split('|'); //, type: 'spline'

////    var options = { chart: {
////            zoomType: 'xy',renderTo: str
////        },
////        title: {
////            text: str1
////        },
////      
////        xAxis: [{
////            categories: []
////        }],
////        yAxis: [{ // Primary yAxis
////            labels: {
////                formatter: function() {
////                    return this.value +'°C';
////                },
////                style: {
////                    color: '#89A54E'
////                }
////            },
////            title: {
////                text: 'Temperature',
////                style: {
////                    color: '#89A54E'
////                }
////            },
////            opposite: true

////        }, { // Secondary yAxis
////            gridLineWidth: 0,
////            title: {
////                text: 'Rainfall',
////                style: {
////                    color: '#4572A7'
////                }
////            },
////            labels: {
////                formatter: function() {
////                    return this.value +' mm';
////                },
////                style: {
////                    color: '#4572A7'
////                }
////            }

////        }, { // Tertiary yAxis
////            gridLineWidth: 0,
////            title: {
////                text: 'Sea-Level Pressure',
////                style: {
////                    color: '#AA4643'
////                }
////            },
////            labels: {
////                formatter: function() {
////                    return this.value +' mb';
////                },
////                style: {
////                    color: '#AA4643'
////                }
////            },
////            opposite: true
////        }],
////        tooltip: {
////            shared: true
////        },
////        legend: {
////            layout: 'vertical',
////            align: 'left',
////            x: 120,
////            verticalAlign: 'top',
////            y: 80,
////            floating: true,
////            backgroundColor: '#FFFFFF'
////        },
//////            series: {
//////                cursor: 'pointer',
//////                events: {
//////                    click: function (e) {
//////                        //alert('X轴的值：' + e.point.category + ' \r\n类别的名称:' + this.name);
//////                        // document.getElementById("tit").innerHTML += this.name + ":" + e.point.category + "=" + e.point.y + "<br/>";
//////                        try {
//////                            click_event(this.name, e.point.category, e.point.y);
//////                        }
//////                        catch (e) { alert("若需web相应此点击事件，请添加 \r\nfunction click_event(Series_Type,X_name,Y_value)\r\n{\r\n--自定义点击事件，此处可缺省--\r\n}"); }
//////                    }
//////                }
//////            }
//////        },
////       // yAxis: { title: { text: str3 } },
////            //,  plotLines: [{ label: { align: 'left', style: { color: 'ed1c24', fontWeight: 'bold' }, text: '0' }, value: 0, width: 2, color: '#ed1c24'}]
////       
////        //  plotOptions: { line: { dataLabels: { enabled: true }, enableMouseTracking: false }, spline: { dataLabels: { enabled: true }, enableMouseTracking: false }, column: { dataLabels: { enabled: true }, enableMouseTracking: false} },
////       // exporting: { enabled: str4 },
////        series: []
////    };     //声明option


////    var name = "chart";



////    var aa = sz[1].split('='); //切割表格



////    var lines = "";
////    var s_li = str6; //"平均分,张晓明,李小强"; 
////    var s_it = s_li.split(',');
////    var s_ty = str7; // "area,spline,spline";
////    var s_tyi = s_ty.split(',');
////    for (i = 0; i < aa.length; i++) {
////        lines = aa[i].split(',');
////        var series = { type: [], name: [], data: [] }; //UPH,UPH Goal,Average

////        series.name = s_it[i];
////        series.type = s_tyi[i];
////        $.each(lines, function (lineNo, line) { series.data.push(parseFloat(line)); })
////        options.series.push(series);
////    }

////    //  bb = temp(lines.length); //获取温度点
////    var items = sz[0].split(',');

////    $.each(items, function (itemNo, item) { options.xAxis.categories.push(item); });

////    var chart = new Highcharts.Chart(options);


////}