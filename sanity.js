import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-25",
    useCdn: process.env.NODE_ENV === "production"
};


export const sanityClient = createClient(config)

// export const getSanity = async () => {
//      
//     const url = `https://${NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`
//     const response = await fetch(url).then(res => res.json())

//     console.log(response)
//     console.log('response')
//     return {
//         data:response.result
//     }
// }


export const urlFor = (source) => imageUrlBuilder(config).image(source);

// export const useCurrentUser = createCurrentUserHook(config)