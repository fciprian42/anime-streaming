import axios from "axios";

import { Anime, AnimePage, Episode } from "@interfaces/anime";
import { useInfiniteQuery } from "react-query";

const apiURL = "http://localhost:3000/meta/anilist";

const getMostPopularAnime = (): Promise<Anime> => {
  return axios
    .get(`${apiURL}/trending`, {
      params: {
        perPage: 1,
        page: 0,
      },
    })
    .then((response) => response.data.results[0]);
};

const getCategoryAnimes = (
  bucket: string,
  options?: {},
  withPagination?: boolean
): Promise<[Anime]> => {
  return axios
    .get(`${apiURL}/${bucket}`, {
      params: {
        ...options,
      },
    })
    .then((response) => {
      if (withPagination) {
        return {
          hasNextPage: response.data.hasNextPage,
          results: response.data.results,
        };
      } else {
        return response.data.results;
      }
    });
};

const getAnimeDetails = (id: string, options?: {}): Promise<AnimePage> => {
  return axios
    .get(`${apiURL}/data/${id}`, {
      params: {
        ...options,
      },
    })
    .then((response) => response.data);
};

const getAnimeEpisodes = (id: string, options?: {}): Promise<Episode[]> => {
  return axios
    .get(`${apiURL}/episodes/${id}`, {
      params: {
        ...options,
      },
    })
    .then((response) => response.data);
};

export default function useFetchCategory(bucket: string) {
  const getCategory = async ({ pageParam = 1 }) => {
    const res = await (await fetch(`${apiURL}/${bucket}?page=${pageParam}`)).json();

    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery([`anime-${bucket}`], getCategory, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.results.length < 10) return undefined;

      return lastPage.nextPage;
    },
  });
}

export {
  getMostPopularAnime,
  getCategoryAnimes,
  getAnimeDetails,
  getAnimeEpisodes,
  useFetchCategory,
};
