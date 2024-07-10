export interface CreditCastMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number,
    character: string,
    credit_id: string,
    order: number
}

export interface CreditCrewMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number,
    credit_id: string,
    department: string,
    job: string
}

export interface CreditMovies {
    cast: CreditCastMovie[],
    crew: CreditCrewMovie[],
    id: number
}