module.exports = {
	siteMetadata: {
		siteUrl: "https://www.alderwoodtreecare.com",
		title: "Alderwood Tree Care 2022",
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/pages/`,
			},
		},
		// {
		// 	resolve: `gatsby-source-filesystem`,
		// 	options: {
		// 		name: `posts`,
		// 		path: `${__dirname}/src/posts/`,
		// 	},
		// },
		// { not needed as already included by gatsby.. only needed when using another folder like 'posts'
		// 	resolve: `gatsby-plugin-page-creator`,
		// 	options: {
		// 		path: `${__dirname}/src/posts`,
		// 	},
		// },
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.mdx`, `.md`],
			},
		},
		{
			resolve: "gatsby-plugin-typegen",
			options: {
				outputPath: "src/__generated__/gatsby-types.d.ts",
				emitSchema: {
					"src/__generated__/gatsby-introspection.json": true,
					"src/__generated__/gatsby-schema.graphql": true,
				},
				emitPluginDocument: {
					"src/__generated__/gatsby-plugin-documents.graphql": true,
				},
			},
		},
	],
};
