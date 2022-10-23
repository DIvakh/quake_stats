const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../fork/quake3-stats/nginx/html',
  assetsDir: 'assets',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080'
      }
    }
  }
});
