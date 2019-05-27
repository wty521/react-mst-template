module.exports = {
	presets: [
        ["@babel/preset-typescript", {
            "isTSX": true,
            "allExtensions": true
        }],
        ["@babel/preset-env", {
            "modules": false,
            "loose": true,
            "useBuiltIns": "entry"
        }],
        "@babel/preset-react"
    ],
	plugins: [
        "@babel/plugin-syntax-dynamic-import",
		["@babel/plugin-proposal-decorators",{
            "legacy": true
        }],
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }],
		"@babel/plugin-transform-runtime",
		[
			"import",
			{
				"libraryName": "antd",
				"style": true
			}
        ],
	]
}
