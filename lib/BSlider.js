/*  @name: BSlider.js
*   @version: 1.1.0
*   @author: leon
*   @Created: 2016-12-27
*   @Edited: 2017-03-07
*   @description 轮播图组件
*   @params: {
*        checkTime:     [Number],     //轮播图切换频率，单位ms，选填，默认值 3000
*        transTime:     [Number],     //轮播图过渡频率，单位ms，选填，默认值 500
*        bannerWrap:    [String],     //轮播图父容器选择器（例如'#bannerWrap')，必填
*        childBanner:   [String],     //轮播图子图选择器，必填
*        points:        [String],     //焦点圆钮选择器，必填
*        pointOn:       [String]      //焦点激活类名，必填
*   }
*/

(function(name, def) {
    //检测上下文环境是否为AMD或者CMD
    var hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        // AMD环境或CMD环境
        define(def);
    } else if (hasExports) {
        //定义为普通Node模块
        module.exports = def();
    } else {
        //将模块的执行结果挂在window变量中，在浏览器中this指向window对象
        this[name] = def();
    }
})('BSlider', function() {
    var BSlider = function(o) {
        var defaults = {
            checkTime: 2000,
            transTime: 500,
            bannerWrap: '',
            childBanner: '',
            points: '',
            pointOn: ''
        };
        for (key in o) {
            defaults[key] = o[key];
        }
        var bw = defaults.bannerWrap,
            cb = defaults.childBanner,
            pts = defaults.points,
            ptOn = defaults.pointOn;

        //bannerWrap, childBanner, points, pointOn必填
        if (o === null || typeof o !== 'object' || !bw || !cb || !pts || !ptOn) {
            throw new Error('【 bannerWrap, childBanner, points, pointOn are necessary 】');
            return false;
        }
        //轮播图父容器
        var bannerBox = document.querySelector(defaults.bannerWrap),
            width = bannerBox.offsetWidth,
            //轮播图 子图
            banners = bannerBox.querySelectorAll(defaults.childBanner),
            //圆点 && 计时器
            timer,
            count = 1,
            checkTime = defaults.checkTime,
            transTime = defaults.transTime,
            points = document.querySelectorAll(defaults.points),
            //触摸点
            moveX = 0,
            startX = 0,
            distanceX = 0,
            //判断是否滑动
            isMove = false;

        // 轮播对象
        var Bn = {
            doInit: function() {
                Bn.initBannerImg();
                Bn.setTimer();
                Bn.TOUCH();
            },
            //混合器
            _extend: function(targetObj, utilObj) {
                for (key in utilObj) {
                    targetObj[key] = utilObj[key];
                }
            },

            //初始化轮播图数量
            initBannerImg: function() {
                Bn.setTranslateX(bannerBox, -count * width);

                var cloneFirst = banners[0].cloneNode(true);
                var cloneLast = banners[banners.length - 1].cloneNode(true);

                //复制第一张放末尾，复制最后一张放最前
                bannerBox.appendChild(cloneFirst);
                bannerBox.insertBefore(cloneLast, bannerBox.childNodes[0]);

                Bn.setTranslateX(bannerBox, -count * width);
            },

            //监听过渡结束
            transitionEnd: function(el, cb) {
                if (el && typeof el === 'object') {
                    el.addEventListener('webkitTransitionEnd', function() {
                        cb && cb();
                    })
                    el.addEventListener('transitionEnd', function() {
                        cb && cb();
                    })
                }
                //解除禁止页面上下滚动
                document.querySelector('body').removeEventListener('touchstart', Bn.forbidScroll);
            },

            //添加过渡
            addTransition: function(el) {
                var cs1 = {
                    webkitTransition: "all " + transTime + "ms",
                    transition: "all " + transTime + "ms"
                }
                Bn._extend(el.style, cs1);
            },
            //删除过渡
            removeTransition: function(el) {
                var cs2 = {
                    webkitTransition: "none",
                    transition: "none"
                }
                Bn._extend(el.style, cs2);
            },
            //设置位移
            setTranslateX: function(el, w) {
                var cs3 = {
                    webkitTransform: "translateX(" + w + "px)",
                    transform: "translateX(" + w + "px)"
                }
                Bn._extend(el.style, cs3);
            },

            //初始化定时器
            setTimer: function() {
                timer = setInterval(function() {
                    count++;
                    //开始轮播
                    Bn.addTransition(bannerBox);
                    Bn.setTranslateX(bannerBox, -count * width);
                    Bn.setPoint();
                }, checkTime);

                Bn.transitionEnd(bannerBox, function() {
                    //设置当前点
                    Bn.getCount();
                    //动画结束刷新状态
                    Bn.removeTransition(bannerBox);
                    Bn.setTranslateX(bannerBox, -count * width);
                });
            },
            //限制当前 count
            getCount: function() {
                if (count >= points.length + 1) {
                    count = 1;
                } else if (count <= 0) {
                    count = points.length;
                }
            },
            hasClass: function(el, cls) {
                cls = cls || '';
                if (cls.replace(/\s/g, '').length == 0)
                    return false; //当cls没有参数时，返回false
                return new RegExp(' ' + cls + ' ').test(' ' + el.className + ' ');
            },
            addClass: function(el, cls) {
                if (!Bn.hasClass(el, cls)) {
                    el.className = el.className == ''
                        ? cls
                        : el.className + ' ' + cls;
                }
            },
            removeClass: function(el, cls) {
                if (Bn.hasClass(el, cls)) {
                    var newClass = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' ';
                    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                        newClass = newClass.replace(' ' + cls + ' ', ' ');
                    }
                    el.className = newClass.replace(/^\s+|\s+$/g, '');
                }
            },
            //点动
            setPoint: function() {
                var arrs = [];
                for (var i = 0; i < points.length; i++) {
                    arrs.push(points[i]);
                }
                arrs.forEach(function(v, i) {
                    Bn.removeClass(v, 'on');
                    // v.className = "";
                })
                Bn.getCount();
                Bn.addClass(arrs[count - 1], defaults.pointOn);
                // arrs[count - 1].className = defaults.pointOn;
            },
            //触摸焦点图时禁止页面滚动
            forbidScroll: function(evt) {
                evt.preventDefault();
            },
            TOUCH: function() {

                bannerBox.addEventListener('touchstart', function(e) {
                    //禁止页面滑动
                    document.querySelector('body').addEventListener('touchstart', Bn.forbidScroll);
                    //清除定时器
                    clearInterval(timer);
                    startX = e.touches[0].clientX;
                });

                bannerBox.addEventListener('touchmove', function(e) {
                    isMove = true;
                    moveX = e.touches[0].clientX;
                    distanceX = moveX - startX;

                    Bn.removeTransition(bannerBox);
                    Bn.setTranslateX(bannerBox, -count * width + distanceX);
                });

                bannerBox.addEventListener('touchend', function(e) {
                    //滑动距离超过十分之一屏即切换，否则回弹
                    if (Math.abs(distanceX) > (width / 10) && isMove) {
                        if (distanceX > 0) {
                            count--;
                        } else {
                            count++;
                        }
                    }
                    Bn.addTransition(bannerBox);
                    Bn.setTranslateX(bannerBox, -count * width);

                    //重置参数
                    startX = moveX = distanceX = 0;
                    isMove = false;

                    //重置状态
                    clearInterval(timer);
                    Bn.setTimer();
                    Bn.setPoint();
                });
            }
        }
        Bn.doInit();
    }
    return BSlider;
})
