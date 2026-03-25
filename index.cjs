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
  mailTemplateAdmin: `<div style="background-image: url(https://npm.elemecdn.com/sarakale-assets@v1/Article/email/bg.jpg);;padding:20px 0px 20px;margin:0px;background-color:#ded8ca;width:100%;">
	<div style="background: url(https://npm.elemecdn.com/sarakale-assets@v1/Article/email/leisi-714x62.png) repeat-y scroll top;">
		<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffe8dd61;box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);margin:auto">
			<img class="headerimg no-lightbox entered loaded" src="https://images.418121.xyz/random?dir=blog/camera/&&type=img" style="width:100%;overflow:hidden;pointer-events:none" data-ll-status="loaded">
				<div style="width:100%;color:#9d2850;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;background: url(https://npm.elemecdn.com/sarakale-assets@v1/Article/email/line034_666x66.png) left top no-repeat;">
				<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;padding: 23px 32px;margin:0;border-radius: 10px 10px 0 0;">您在<a style="text-decoration:none;color: #9d2850;" href="{{site.url}}"target="_blank">{{site.name}}</a>上的文章有了新的评论</p>
				</div>
					<div style="margin:40px auto;width:90%;"><p><strong>{{self.nick}}</strong> 回复说：</p>
					<div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}
					</div>
					<p>您可以点击<a style="text-decoration:none; color:#cf5c83" href="{{site.postUrl}}" target="_blank">查看回复的完整内容</a></p>
					</div>
		</div>
	</div>
</div>`,
  mailSubject: '{{parent.nick}}，您在『{{site.name}}』上发表的评论收到了来自 {{self.nick}} 的回复',
  mailTemplate: `<div style="background-image:url(https://npm.elemecdn.com/sarakale-assets@v1/Article/email/bg.jpg);;padding:20px 0px 20px;margin:0px;background-color:#ded8ca;width:100%;">
<div style="background:url(https://npm.elemecdn.com/sarakale-assets@v1/Article/email/leisi-714x62.png) repeat-y scroll top;">
	<div style="border-radius:10px 10px 10px 10px;font-size:14px;color:#555555;width:666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background:#ffe8dd61;box-shadow:0 1px 5px rgba(0,0,0,0.15);margin:auto">
	<img class="headerimg no-lightbox entered loaded" src="https://images.418121.xyz/random?dir=blog/camera/&&type=img" style="width:100%;overflow:hidden;pointer-events:none" data-ll-status="loaded">
		<div style="width:100%;border-radius:10px 10px 0 0;background-image:-moz-linear-gradient(0deg,rgb(67,198,184),rgb(255,209,244));height:66px;background:url(https://npm.elemecdn.com/sarakale-assets@v1/Article/email/line034_666x66.png) left top no-repeat;color:#9d2850;">
		<p style="font-size:16px;font-weight: bold;text-align:center;word-break:break-all;padding:23px 32px;margin:0;border-radius:10px 10px 0 0;">您在<a style="text-decoration:none;color:#9d2850;" href="{{site.url}}">『{{site.name | safe}}』</a>上的留言有新回复啦！</p>
		</div>
		<div style="margin:40px auto;width:90%;"><p>Hi，{{parent.nick}}，您曾在文章上发表评论：</p>
		<div style="background:#fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow:0 2px 5px rgba(0,0,0,0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{parent.comment | safe}}</div>
		<p><strong>{{self.nick}}</strong> 给您的回复如下：</p>
		<div style="background:#fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow:0 2px 5px rgba(0,0,0,0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:15px;color:#555555;">{{self.comment | safe}}</div>
		<p>您可以点击<a style="text-decoration:none;color:#cf5c83" href="{{site.postUrl}}" target="_blank"> 查看回复的完整内容 </a>，欢迎再次光临<a style="text-decoration:none;color:#cf5c83" href="{{site.url}}" target="_blank"> {{site.name}} </a>。
		<hr /><p style="font-size:14px;color:#b7adad">本邮件为系统自动发送，请勿直接回复邮件哦，可到博文内容回复。<br />https://sarakale.top/blog</p></p>
		</div>
	</div>
</div>
</div>`
  },
});
