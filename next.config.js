/** @type {import('next').NextConfig} */
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
    webpack: (config) => {
        const customPlugins = [
            new CopyPlugin({
                patterns: [
                    {
                        from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                        to: 'public/plugins/bootstrap/bootstrap.bundle.js',
                    },
                ],
            }),
        ];

        config.plugins.push(...customPlugins);

        return config;
    },
}

module.exports = nextConfig
