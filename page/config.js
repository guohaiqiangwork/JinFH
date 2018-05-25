define({
    app: {
        name: '再保系统',
        client: 'canty',
        version: 'alpha 1.0',
        lan: 'zh-cn',
        debug: false
    },
    data:{
        method: 'urls' //files:urls
    },
    backend: {
//    	ip: 'http://ut-zbxt.cathay-ins.com.cn/reins',
    	ip: 'http://localhost:8080/reins',
        base: '/',
        timeout: 360000,
        printIp: '10.1.1.62:8808'
    },
    pagination: {
        pageSize: 20,
        previousText: '上一页',
        nextText: '下一页',
        firstText: '第一页',
        lastText: '最后一页'
    },
    display: {
        dateFormat: 'yyyy-MM-dd'
    }
});