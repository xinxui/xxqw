var timer = null;
//封装动画函数  任意元素的任意的多个属性抵达任意位置
function animate(obj, json, fn) {
    //进入动画，首先清楚定时器
    clearInterval(obj.timer)
    //将定时器绑在元素身上
    obj.timer = setInterval(function () {
        //每次执行定时器，声明一个阀值默认为true,
        //如果多个属性走一遍，leader == target就不会修改该值；
        var flag = true;
        // json里多个属性要同时变化，抵达位置
        for (var k in json) {
            //有个别属性，属性值非正常整数，单独处理
            if (k == "opacity") {
                //数值0-1；放大1000倍处理渐变，缩小1000倍赋值
                var leader = getStyle(obj, k) * 1000;
                var target = json[k] * 1000
                var step = (target - leader) / 10
                step = target - leader > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step
                obj.style.opacity = leader / 1000
            } else if (k == "zIndex") {
                obj.style.zIndex = json[k]
            } else {
                //元素对应属性的当前位置
                var leader = parseInt(getStyle(obj, k));
                //获取对应属性的目标值
                var target = json[k];
                //计算步伐
                var step = (target - leader) / 10;
                step = target - leader > 0 ? Math.ceil(step) : Math.floor(step)
                leader = leader + step;
                obj.style[k] = leader + "px"
            }
            //判断每一个有没有走到目标位置
            if (leader != target) {
                flag = false
            }
        }
        //判断阀值 如果为ture 就清除定时器
        if (flag) {
            clearInterval(obj.timer)
            //动画执行完毕
            fn && fn()
        }
    }, 16)
}

//封装获取元素样式
function getStyle(obj, style) {
    //能力检测
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[style]
    } else {
        return obj.currentStyle[style]
    }
}