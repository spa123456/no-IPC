module.exports = {
    pwa: {
        iconPaths: {
            favicon32: 'favi.png',
            favicon16: 'favi.png',
            appleTouchIcon: 'favi.png',
            maskIcon: 'favi.png',
            msTileImage: 'favi.png'
        }
    },
    publicPath: './',
    outputDir: 'noIPCdist',
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
}