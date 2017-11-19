## H2 Just a test app.
> Just a burger builder test app. 

##### H5 SET UP
>npm start or yarn start

Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

>npm test or yarn test

Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.

>npm run build or yarn build

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

###### h6 [DEPLOYMENT link] (https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)


##### H5 Css module set up
- npm run eject
- config/webpack.config.dev.js
```javascript
  {
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        },
      },
    ....
```

- config/webpack.config.prod.js
```javascript
use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        modules: true,
                        sourceMap: shouldUseSourceMap,
                        localIdentName: '[name]__[local]__[hash:base64:5]',
                      },
                    },
                  .....
```