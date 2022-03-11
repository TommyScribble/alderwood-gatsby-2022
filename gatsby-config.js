module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "Scibbles scribbling",
	},
	plugins: [
		{
			resolve: `gatsby-plugin-ts`,
			options: {
				typeCheck: process.env.NODE_ENV !== "production",
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/pages/`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/src/posts/`,
			},
		},
		{
			resolve: `gatsby-plugin-page-creator`,
			options: {
				path: `${__dirname}/src/posts`,
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.mdx`, `.md`],
			},
		},
	],
};
