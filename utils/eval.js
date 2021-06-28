function mainEval($) {
    return `
!(async () => {
    cookies = process.env.JD_COOKIE ? process.env.JD_COOKIE.split("&") : require("./utils/jdcookie").cookie;
    console.log(\`======================本次任务共\${cookies.length}个京东账户Cookie======================\\n\`)
    try{
        await prepare(); 
    }catch(e1){console.log("初始函数不存在,将继续执行主函数Main\\n")}
    for (let i = 0; i < cookies.filter(d => d).length; i++) {
        $.cookie = cookies[i];
        $.user = decodeURIComponent($.cookie.match(/pt_pin=([^;]+)/)[1])
        $.index = parseInt(i) + 1;
        let info = {
            'index': $.index,
            'user': $.user,
            'cookie': $.cookie
        }
        if (!$.thread) {
            console.log(\`\n******开始【京东账号\${$.index}】\${$.user} 任务*********\n\`); 
            $.setCookie($.cookie) 
        }
        $.thread ? main(info) : await main(info);
    }
    if (typeof(extra) != 'undefined') {
        console.log(\`============================开始运行额外任务============================\`)
        try{
            await extra();
        }catch(e4){console.log(e4.message)}
    }
})().catch((e) => {
    console.log(\`❌ \${$.user}, 失败! 原因: \${e}!\`)
}).finally(() => { 
    if ($.message.length > 0) {
        $.notify($.message)
    }
    $.done();
});
`
}
module.exports = {
    mainEval
}
