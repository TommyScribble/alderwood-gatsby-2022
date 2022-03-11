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
		}
	]
};
