const CracoAlias = require( "craco-alias" );

module.exports = {
    webpack: {
        configure: ( webpackConfig, { env, paths } ) => {
            webpackConfig.cache = false;
            webpackConfig.externals = {
                // TODO: Find a better way.
                "react": "React",
                "react-dom": "ReactDOM",
                "redux": "Redux",
                "react-redux": "ReactRedux",
            };
            return webpackConfig;
        }
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./",
                tsConfigPath: "./tsconfig.paths.json"
            },
        }
    ]
};
