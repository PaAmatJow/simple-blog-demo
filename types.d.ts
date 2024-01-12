export type Article = {
	sys: {
		id: string;
	};
	title: string;
	slug: string;
	summary: string;
	details: {
		json: any;
		links: {
			assets: {
				block: {
					sys: {
						id: string;
					};
					url: string;
					description: string;
				}[];
			};
		};
	};
	date: Date;
	authorName: string;
	categoryName: string;
	articleImage: {
		url: string;
	};
};