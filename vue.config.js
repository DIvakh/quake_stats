const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../quake3-stats/nginx/html',
  assetsDir: 'assets'
});
