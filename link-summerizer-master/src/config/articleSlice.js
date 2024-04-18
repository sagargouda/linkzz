import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', process.env.REACT_APP_KEY );
            headers.set('X-RapidAPI-Host', process.env.REACT_APP_HOST);
            return headers;
        },
    }),


    endpoints(build) {
        return {
            getSummary: build.query({
                // encodeURIComponent() function encodes special characters that may be present in the parameter values
                // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
                query: (arg) => `summarize?url=${encodeURIComponent(arg.articleUrl)}&length=3`,
            }),
        };
    },
});

// on demand (useLazy[endpoint]Query) it returns an arry , first elemnt is trigge
export const { useLazyGetSummaryQuery } = articleApi;
