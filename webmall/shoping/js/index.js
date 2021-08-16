window.addEventListener('load', function () {
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;//图片的宽度 与父级宽度一样
    //2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrowr.click();
        }, 2000)
    })


    //3、根据图片数动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = this.document.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {

        //循环创建小li
        var li = this.document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        //把li插入到ol中
        ol.appendChild(li);
        //4、为li绑定点击事件  排他思想
        li.addEventListener('click', function () {
            //先把所有小li的样式清除
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //再为自己添加样式
            this.className = 'current';

            //5、 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            //点击小圆圈，拿到当前小圆圈的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;

            //使用animate动画函数
            // animate(ul, target, callback)
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';

    //6、克隆第一张图片 放到ul最后
    var first = ul.children[0].cloneNode(true); //true 深克隆 false 浅克隆
    ul.appendChild(first);

    //7、点击右侧按钮，图片滚动   到最后一张 无缝滚动
    var num = 0;
    var circle = 0;// 控制小圆圈
    var flag = true;
    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到了最后一张复制的图片，ul快速复原 left=0
            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, - num * focusWidth, function () {
                flag = true;
            });

            //8、点击右侧按钮的同时，小圆圈也随之变化 在声明一个全局变量circle
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }

    })

    //9、左侧按钮
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到了最后一张复制的图片，ul快速复原 left=0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, - num * focusWidth, function () {
                flag = true;
            });

            //8、点击右侧按钮的同时，小圆圈也随之变化 在声明一个全局变量circle
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            circle = circle < 0 ? ol.children.length - 1 : circle;
            //调用函数
            circleChange();
        }

    })

    function circleChange() {
        //先清除所有小圆圈的样式
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //添加当前小圆圈的样式
        ol.children[circle].className = 'current';
    }

    //10、自动轮播
    var timer = setInterval(function () {
        //手动调用点击事件
        arrowr.click();
    }, 2000)




})
