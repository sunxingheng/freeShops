module.exports = {
	proxyList: {
		'/shops': {
			// 测试环境
			target: 'http://192.168.1.100:8888',
			changeOrigin: true,
		},
    '/fileServer': {
      // 测试环境
      target: 'http://192.168.1.100:8888',
      changeOrigin: true,
    },
	}
}
