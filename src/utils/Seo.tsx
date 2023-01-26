import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
// import { SeoQuery } from "./__generated__/SeoQuery"; add <SeoQuery> to useStaticQuery when gerneated

export type SEOProps = {
	description?: string;
	lang?: string;
	meta?: any;
	title?: string;
	image?: any;
};
function SEO({ description, lang, meta, title, image }: SEOProps) {
	const { site } = useStaticQuery(
		graphql`
			query SeoQuery {
				site {
					siteMetadata {
						title
						description
						author
						ogImage
					}
				}
			}
		`
	);

	const metaDescription = description || site.siteMetadata.description;
	const ogImage = image || site.siteMetadata.ogImage;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={
				title === site.siteMetadata.title
					? title
					: `%s | ${site.siteMetadata.title}`
			}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				{
					property: `og:image`,
					content: ogImage,
				},
			].concat(meta)}
		/>
	);
}

export default SEO;
