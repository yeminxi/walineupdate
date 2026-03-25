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
});
