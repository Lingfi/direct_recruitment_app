const { override, fixBabelImports, addLessLoader, } = require("customize-cra");


module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd-mobile",
        libraryDirectory: "es",
        style: true // change importing css to less
    }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@brand-primary": "#224466", // normal
            "@brand-primary-tap": "#112244", // press
        }
    })
);