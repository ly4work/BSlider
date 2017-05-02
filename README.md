# BSlider
原生js实现移动端焦点轮播图组件
```
// index.html
    ...
    <div class="demo">
        <ul id="bannerWrap">
            <li class="bannerItem"><a href="#"><img src="" /></a></li>
            <li class="bannerItem"><a href="#"><img src="" /></a></li>
            <li class="bannerItem"><a href="#"><img src="" /></a></li>
            <li class="bannerItem"><a href="#"><img src="" /></a></li>
        </ul>
        <ul id="pointsWrap">
            <li class="pointItem on"></li>
            <li class="pointItem"></li>
            <li class="pointItem"></li>
            <li class="pointItem"></li>
        </ul>
    </div>
    ...
```
```
// banner.css

//轮播图 ul 建议采用flex布局
#bannerWrap {
    width: 100%;
    display: flex;
}
.bannerItem{
    flex: 0 0 100%;
    align-items: center;
}                
```
```
// main.js中使用

BSlider({
    checkTime: 3000,
    transTime: 600,
    bannerWrap: '#bannerWrap',
    childBanner: '.bannerItem',
    points: '.pointItem',
    pointOn: 'on'
});
```

