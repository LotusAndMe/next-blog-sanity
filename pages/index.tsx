import Header from '@components/Header'
import Head from 'next/head'
import { sanityClient, urlFor } from '../sanity'
import { Post } from './../typings';
import Layout from './_app'
import Link from 'next/link';


interface Props{
  posts: Post[];
}


export default function Home({ posts }: Props) {
  // console.log('render home')
  // console.log(JSON.stringify(posts))

  return (
    <div className="bg-white text-black max-w-7xl mx-auto">
      <Head>
        <title>Medium blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    
      <div
        className='flex justify-between items-center
         bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>Stay</span> curious.
          </h1>
          <h2>Discover stories, thinking, and expertise from writers on any topic.</h2>
        </div>
        <img
          className='hidden md:inline-flex h-32 lg:h-full'
          src="https://cdn.iconscout.com/icon/free/png-256/free-medium-47-433328.png" alt="" />
      </div>

      <div className=
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-6'>
        {posts?.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='group cursor-pointer border rounded-lg overflow-hidden'>
              {post.mainImage && (
                <img
                  className='h-60 w-full object-cover group-hover:scale-105 
                  transition-transform duration-200 ease-in-out'
                  src={urlFor(post.mainImage).url()} alt="" />
              )}
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author?.name}</p>
                </div>
                <img
                  className='h-12 w-12 rounded-full'
                  src={urlFor(post.author.image).url()!} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}

Home.Layout=Layout


export const getServerSideProps = async () => {
  // console.log('render get ssr')
  
   const query = 
  `*[_type == "post"]{
    _id,
    title,
    description,
    mainImage,
    slug,
    author-> {name,image}
  }`;

  const posts = await sanityClient.fetch(query)

  // console.log(posts[0].author.name)

  return {
    props: { posts }
  }

}

