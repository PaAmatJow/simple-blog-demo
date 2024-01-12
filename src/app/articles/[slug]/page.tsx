import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getArticle, getAllArticles } from "@/lib/api";
import { draftMode } from "next/headers";

interface Props {
  params: {
    slug: string;
  }
}

type Article = {
	slug: string;
};

export async function generateStaticParams() {
  const allArticles = await getAllArticles();

  return allArticles.map((article: Article) => ({
    slug: article.slug
  }))
}


const BlogDetailsPage = async ({params}: Props) => {
  const {slug} = params
  const { isEnabled } = draftMode();
	const article = await getArticle(params.slug, isEnabled);
  
  return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
			<section className='w-full'>
				<div className='container space-y-12 px-4 md:px-6'>
					<div className='space-y-4'>
						<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl'>
							{article.title}
						</h1>
						<p className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'>
							{article.summary}
						</p>
					</div>
					<div className='space-y-8 lg:space-y-10'>
						<Image
							alt='Article Image'
							className='aspect-video w-full overflow-hidden rounded-xl object-cover'
							height='365'
							src={article.articleImage.url}
							width='650'
						/>
						<div className='space-y-4 md:space-y-6'>
							<div className='space-y-2'>
								<div className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'>
									{documentToReactComponents(article.details.json)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
export default BlogDetailsPage