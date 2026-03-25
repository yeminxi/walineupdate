const Application = require('@waline/vercel');
const LinkInterceptor = require('waline-link-interceptor'); // 添加这一行
module.exports = Application({
  forbiddenWords: ['习近平', '毛泽东'], //词汇限制
  disallowIPList: ['8.8.8.8', '4.4.4.4'],//黑名单IP
  plugins: [
     LinkInterceptor({
      whiteList: [
        'yeminxi.github.io',
        '418121.xyz'
      ],
      // blackList: [],
      // interceptorTemplate: `hello __URL__ `,   // 如果下面自定义了跳转地址，那么此处模板不生效
      redirectUrl: "https://blog.418121.xyz/go.html", // 填写中间页的具体 html 地址。
      encodeFunc: (url) =>{
        return "u="+Buffer.from(url).toString('base64');                               // 填入一个外链 url 的处理函数
      }
    })
  ],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
	mailSubjectAdmin: '{{site.name | safe}} 上有新评论了',
    mailTemplateAdmin: `<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}"target="_blank">{{site.name}}</a>上的文章有了新的评论</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p><strong>{{self.nick}}</strong> 回复说：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p style="text-align:center;position: relative;z-index: 99;">您可以点击<a style="text-decoration:none;color:#cf5c83" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a></p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">叶泯希博客竭诚为您服务！</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>`,
    mailSubject: '{{parent.nick}}，您在『{{site.name}}』上发表的评论收到了来自 {{self.nick}} 的回复',
    mailTemplate: `<div style="background: url(https://tva3.sinaimg.cn/large/c56b8822ly1h62npb7s1ej201y01y0lh.jpg);padding:40px 0px 20px;margin:0px;background-color:#FFCDCE;width:100%;">
	<style type="text/css">@media screen and (max-width:600px){.afterimg,.beforeimg{display:none!important}}</style>
	<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 530px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;max-width:100%;background: ##ffffff;">
		<img class="beforeimg" style="width:530px;height:317px;z-index:-100;pointer-events:none" src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/before.png">
		<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/violet.jpg" style="width:100%;overflow:hidden;pointer-events:none;margin-top: -120px;">
		<div style="width:100%;background:#f8d1ce;color:#9d2850;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://tva2.sinaimg.cn/large/c56b8822ly1h61tb7tagcj20ii01u3yc.jpg) left top no-repeat;display: flex;justify-content: center;flex-direction: column;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;margin:0;">
		您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}">『{{site.name | safe}}』</a>上的留言有新回复啦！</p>
		</div>
		<div class="formmain" style="background:#fff;width:100%;max-width:800px;margin:auto auto;overflow:hidden;margin-bottom: -155px;">
			<div style="margin:40px auto;width:90%;"><p>😊Hi，{{parent.nick}}，您曾在文章上发表评论：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{parent.comment | safe}}</div>
			<p><strong>{{self.nick}}</strong> 给您的回复如下：</p>
			<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
			<p>您可以点击<a style="text-decoration:none; color:#cf5c83" href="{{site.postUrl}}" target="_blank"> 查看回复的完整內容 </a>，欢迎再次光临<a style="text-decoration:none; color:#cf5c83" href="{{site.url}}" target="_blank"> {{site.name}} </a>。<hr />
			<p style="font-size:14px;color:#b7adad;text-align:center;position: relative;z-index: 99;">本邮件为系统自动发送，请勿直接回复邮件哦，可到博文内容回复。<br />{{site.url}}</p>
			</p>
			<img src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/line.png" style="width:100%;margin:25px auto 5px auto;display:block;pointer-events:none">叶泯希博客竭诚为您服务！</p>
			</div>
		</div>
		<img class="afterimg" style="width:535px;height:317px;z-index:100;margin-left: -3px;"src="https://npm.elemecdn.com/hexo-butterfly-envelope/lib/after.png">
	</div>
</div>`
});

});
