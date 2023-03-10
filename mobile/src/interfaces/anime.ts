export type Interesets =
  | 'Action'
  | 'Adventure'
  | 'Cars'
  | 'Comedy'
  | 'Dementia'
  | 'Demons'
  | 'Drama'
  | 'Ecchi'
  | 'Fantasy'
  | 'Game'
  | 'Harem'
  | 'Historical'
  | 'Horror'
  | 'Isekai'
  | 'Josei'
  | 'Kids'
  | 'Magic'
  | 'Martial Arts'
  | 'Mecha'
  | 'Military'
  | 'Music'
  | 'Mystery'
  | 'Parody'
  | 'Police'
  | 'Psychological'
  | 'Romance'
  | 'Samurai'
  | 'School'
  | 'Sci-Fi'
  | 'Seinen'
  | 'Shoujo'
  | 'Shoujo Ai'
  | 'Shounen'
  | 'Shounen Ai'
  | 'Slice of Life'
  | 'Space'
  | 'Sports'
  | 'Super Power'
  | 'Supernatural'
  | 'Thriller'
  | 'Vampire'
  | 'Yaoi'
  | 'Yuri';

export const interesets: Interesets[] = [
  'Action',
  'Adventure',
  'Cars',
  'Comedy',
  'Demons',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Game',
  'Harem',
  'Historical',
  'Horror',
  'Isekai',
  'Josei',
  'Kids',
  'Magic',
  'Martial Arts',
  'Mecha',
  'Military',
  'Music',
  'Mystery',
  'Parody',
  'Police',
  'Romance',
  'Samurai',
  'School',
  'Sci-Fi',
  'Seinen',
  'Shoujo',
  'Shounen',
  'Space',
  'Sports',
  'Super Power',
  'Thriller',
  'Vampire',
];

export type Anime = {
  id: string;
  title?: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  episodeNumber?: number;
  genres: Interesets[];
  cover?: string;
  image?: string;
  rating?: number;
  releaseDate?: number;
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  };
  totalEpisodes?: number;
  description?: string;
  status?: string;
};

export type Recommendations = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
};

export type Episode = {
  id: string;
  title: string;
  description: string;
  number: number;
  image: string;
};

export type Characters = {
  id: number;
  role: string;
  name: {
    first: string;
    last: string;
    full: string;
    native: string;
    userPreferred: string;
  };
  image: string;
  voiceActors: [
    {
      id: number;
      name: {
        first: string;
        last: string;
        full: string;
        native: string;
        userPreferred: string;
      };
      image: string;
    },
  ];
};

export interface AnimePage extends Anime {
  synonyms: string[];
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  popularity: number;
  color: string;
  nextAiringEpisode: {
    year: number;
    month: number;
    day: number;
  };
  totalEpisodes: number;
  duration: number;
  season: string;
  studios: string[];
  subOrDub: string;
  type: string;
  recommendations: Recommendations[];
  characters: Characters[];
  episodes: Episode[];
}
