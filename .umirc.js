// ref: https://umijs.org/config/
import px2rem from 'postcss-pxtorem';

export default {
  treeShaking: true,
  history: 'hash',
  theme: {
    'primary-color': '#1DA57A',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'naluduo.github.io',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 19.2,
      exclude: /node_modules/i,
      propList: ['*'],
    }),
  ],
};
