module.exports = {
  publicPath: './',
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      '/proxy/10.20.67.111': {
        target: 'http://10.20.67.111',
        pathRewrite: {
          '/proxy/10.20.67.111' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.67.125': {
        target: 'http://10.20.67.125',
        pathRewrite: {
          '/proxy/10.20.67.125' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.67.112:80': {
        target: 'http://10.20.67.112:80',
        pathRewrite: {
          '/proxy/10.20.67.112:80' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.67.190:8080': {
        target: 'http://10.20.67.190:8080',
        pathRewrite: {
          '/proxy/10.20.67.190:8080' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.67.125': {
        target: 'http://10.20.67.125',
        pathRewrite: {
          '/proxy/10.20.67.125' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.67.112': {
        target: 'http://10.20.67.112',
        pathRewrite: {
          '/proxy/10.20.67.112' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.90.83:8080': {
        target: 'http://10.20.90.83:8080',
        pathRewrite: {
          '/proxy/10.20.90.83:8080' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.90.84': {
        target: 'http://10.20.90.84',
        pathRewrite: {
          '/proxy/10.20.90.84' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.67.111:80': {
        target: 'http://10.20.67.111:80',
        pathRewrite: {
          '/proxy/10.20.67.111:80' : ''
        },
        changeOrigin: true
      },
      '/proxy/10.20.90.82:8888': {
        target: 'http://10.20.90.82:8888',
        pathRewrite: {
          '/proxy/10.20.90.82:8888' : ''
        },
        changeOrigin: true
      },
    }
  }
};
