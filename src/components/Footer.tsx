import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Logo } from "./Utils";
import Navlinks from "./NavigationList";
// import {
// 	FooterLinksQuery,<FooterLinksQuery>
// 	FooterLinksQuery_site_siteMetadata_footerLinks,<{
// 	data: FooterLinksQuery_site_siteMetadata_footerLinks;
// }>
// } from "./__generated__/FooterLinksQuery"; add types when genrated

export default function () {
	const query = useStaticQuery(graphql`
		query FooterLinksQuery {
			site {
				siteMetadata {
					title
					footerLinks {
						name
						url
					}
				}
			}
		}
	`);

	const footerLinks = query.site.siteMetadata.footerLinks.map((item: string, i: number) => (
		<ListItem data={item} key={`footer-n-l-${i}`} />
	));

	return (
		<footer className="footer bg-bgalt py-12">
			<div className="container mx-auto text-center">
				<div className="flex justify-center my-3 mb-6">
					<Link to="/" title={query.site.siteMetadata.title}>
						<Logo className="w-12" />
					</Link>
				</div>
				<div className="text-color-2 my-3 footer-links animated-link-parent">
					<Navlinks
						className="flex items-center justify-center flex-wrap"
						withThemeSwitch={false}
					/>
				</div>
				<div className="text-color-2 my-3">
					<ul>{footerLinks}</ul>
				</div>
				<p className="text-color-default text-lg">
					Copyright &copy; {query.site.siteMetadata.title}{" "}
					{new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}

const ListItem = ({ data }: any) => {
	return (
		<li className="inline-block mx-3 animated-link-parent">
			<Link to={data.url} title={data.name}>
				<span>{data.name}</span>
			</Link>
		</li>
	);
};
