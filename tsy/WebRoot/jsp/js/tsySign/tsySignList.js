
var startTime = null;
var endTime = null;
var nickName = null;

$(function(){
	init();
});

function init(){
	dataInit();
	eventInit();
}

function dataInit(){
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
}

function eventInit(){
	$('body').on('click', '#select', function(e){
		startTime = $("#startTime").val();
		endTime = $("#endTime").val();
		nickName = $("#nickName").val();
		$('#massage').bootstrapTable('refresh', {url: path+'/post/investigationQuestion/queryinvestigationQuestionList'});  
	});
}

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#massage').bootstrapTable({
            url: path+'/post/investigationQuestion/queryinvestigationQuestionList',             //请求后台的URL（*）
            method: 'post',                     //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            contentType: "application/x-www-form-urlencoded",         //发送到服务器的数据编码类型
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            height: 650,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                  //是否显示父子表
            columns: [{
            	field: 'Number',
            	title: '序号',
            	width: '50',
            	align: 'center',
                formatter: function (value, row, index) {
                	return '<font style="width:40px;height:40px;line-height:40px">'+(index+1)+'</font>';
                }
            }, {
                field: 'nickname',
                title: '签到人',
                align: 'center',
                width: '150',
                formatter: function (value, row, index) {
                	return '<font style="width:40px;height:40px;line-height:40px">'+value+'</font>';
                }
            }, {
                field: 'headimgurl',
                title: '签到人头像',
                align: 'center',
                width: '150',
                formatter: function (value, row, index) {
                	return '<img style="width:40px;height:40px" src="'+value+'"/>';
                }
            }, {
                field: 'sex',
                title: '签到人性别',
                align: 'center',
                width: '150',
                formatter: function (value, row, index) {
                	if(value==1){
                		return '<font style="width:40px;height:40px;line-height:40px">男</font>';
                	}else if(value==2){
                		return '<font style="width:40px;height:40px;line-height:40px">女</font>';
                	}else{
                		return '<font style="width:40px;height:40px;line-height:40px">-</font>';
                	}
                }
            }, {
                field: 'wechat_user_sign_time',
                title: '签到时间',
                align: 'center',
                width: '150',
                formatter: function (value, row, index) {
                	return '<font style="width:40px;height:40px;line-height:40px">'+value+'</font>';
                }
            }, {
                field: 'wechat_user_sign_integral',
                title: '签到次数',
                align: 'center',
                width: '170',
                formatter: function (value, row, index) {
                	return '<font style="width:40px;height:40px;line-height:40px">'+value+'</font>';
                }
            }],
            onLoadSuccess: function(){  //加载成功时执行
//            	console.log("加载成功");
            },
            onLoadError: function(){  //加载失败时执行
            	console.log("加载数据失败", {time : 1500, icon : 2});
            }
        });
    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {
        	limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            nickName: nickName,
            startTime: startTime,
            endTime: endTime
        };
        return temp;
    };
    return oTableInit;
}

