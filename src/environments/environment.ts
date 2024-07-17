export const environment = {

    image_url: "https://image.tmdb.org/t/p/w500",
    search_url: ["https://api.themoviedb.org/3/search/", "&include_adult=false&language=tr-tr&page=1"],
    
    moviestrending_url: "https://api.themoviedb.org/3/trending/movie/day?language=tr-tr",
    moviesupcoming_url: "https://api.themoviedb.org/3/movie/upcoming?language=tr-tr&page=",
    moviespopular_url: "https://api.themoviedb.org/3/movie/popular?language=tr-tr&page=",
    moviestopRated_url: "https://api.themoviedb.org/3/movie/top_rated?language=tr-tr&page=",
    moviesnowPlaying_url: "https://api.themoviedb.org/3/movie/now_playing?language=tr-tr&page=",
    movieDetails_url: ["https://api.themoviedb.org/3/movie/", "?language=tr-tr"],
    movieReviews_url: ["https://api.themoviedb.org/3/movie/", "/reviews?language=en-US&page="],
    movieCastsCrews_url: ["https://api.themoviedb.org/3/movie/", "/credits?language=tr-tr"],
    movieImages_url: ["https://api.themoviedb.org/3/movie/", "/images"],
    movieVideos_url: ["https://api.themoviedb.org/3/movie/", "/videos?language=tr-tr"],
    moviesSimilar_url: ["https://api.themoviedb.org/3/movie/", "/similar?language=tr-tr&page="],

    tvshowstrending_url: "https://api.themoviedb.org/3/trending/tv/day?language=tr-tr",
    tvshowsAiringToday_url : "https://api.themoviedb.org/3/tv/airing_today?language=tr-tr&page=",
    tvshowsOntheAir_url: "https://api.themoviedb.org/3/tv/on_the_air?language=tr-tr&page=",
    tvshowspopular_url: "https://api.themoviedb.org/3/tv/popular?language=tr-tr&page=",
    tvshowstopRated_url: "https://api.themoviedb.org/3/tv/top_rated?language=tr-tr&page=",
    tvshowDetails_url: ["https://api.themoviedb.org/3/tv/", "?language=tr-tr"],
    tvshowReviews_url: ["https://api.themoviedb.org/3/tv/", "/reviews?language=en-US&page="],
    TvShowCastsCrews_url : ["https://api.themoviedb.org/3/tv/", "/credits?language=tr-tr"],
    tvshowImages_url: ["https://api.themoviedb.org/3/tv/", "/images"],
    tvshowVides_url: ["https://api.themoviedb.org/3/tv/", "/videos?language=tr-tr"],
    tvshowsSimilar_url: ["https://api.themoviedb.org/3/tv/", "/similar?language=tr-tr&page="],

    celebrities_url: "https://api.themoviedb.org/3/person/popular?language=tr-tr&page=",
    credit_url: ["https://api.themoviedb.org/3/person/", "?language=tr-tr"],
    creditImages_url: ["https://api.themoviedb.org/3/person/", "/images"],
    creditMovies_url: ["https://api.themoviedb.org/3/person/", "/movie_credits?language=tr-tr"],
    creditTvShows_url: ["https://api.themoviedb.org/3/person/", "/tv_credits?language=tr-tr"],

    api: "",
    api_key: "",
};
