module.exports = {
	proxyList: {
		'/shops': {
			// 测试环境
			target: 'http://192.168.31.205:8888',
			changeOrigin: true,
		},
	}
}
