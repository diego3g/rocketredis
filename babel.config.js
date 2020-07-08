module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true
        }
      ],
      !api.env('production') && 'react-refresh/babel'
    ].filter(Boolean)
  }
}
