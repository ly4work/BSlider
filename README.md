# BSlider
原生js实现移动端焦点轮播图组件
```
@name: BSlider.js
@version: 1.1.0
@author: leon
@Created: 2016-12-27
@Edited: 2017-03-07
@description 轮播图组件
@params: {
    checkTime:     [Number],     //轮播图切换频率，单位ms，选填，默认值 3000
    transTime:     [Number],     //轮播图过渡频率，单位ms，选填，默认值 500
    bannerWrap:    [String],     //轮播图父容器选择器（例如'#bannerWrap')，必填
    childBanner:   [String],     //轮播图子图选择器，必填
    points:        [String],     //焦点圆钮选择器，必填
    pointOn:       [String]      //焦点激活类名，必填
    }
```


```
// index.html 示例结构

    <div class="bannerBox">
		<ul id="bannerWrap">
			<li class="bannerItem"><img src="../images/1.jpg" /></li>
			<li class="bannerItem"><img src="../images/2.jpg" /></li>
			<li class="bannerItem"><img src="../images/3.jpg" /></li>
			<li class="bannerItem"><img src="../images/4.jpg" /></li>
			<li class="bannerItem"><img src="../images/5.jpg" /></li>
		</ul>
		<ol id="pointsWrap">
			<li class="pointItem on"></li>
			<li class="pointItem"></li>
			<li class="pointItem"></li>
			<li class="pointItem"></li>
			<li class="pointItem"></li>
		</ol>
	</div>
```
```
// banner.css  示例样式
// ul建议采用flex布局
#bannerWrap {
	width: 100%;
	display: flex;
}
#bannerWrap .bannerItem {
	flex: 0 0 100%;
	align-items: center;
}
#bannerWrap .bannerItem img {
	display: block;
	width: 100%;
}         
```
```
// main.js中使用

BSlider({
    checkTime: 5000,
    transTime: 600,
    bannerWrap: '#bannerWrap',
    childBanner: '.bannerItem',
    points: '.pointItem',
    pointOn: 'on'
});
```
