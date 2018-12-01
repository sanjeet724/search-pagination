import http from './httpService';

const apiEndPoint = "http://localhost:4000";
const resourceEndpoint = apiEndPoint + "/api/movies";

export function getMovieByTitle(title) {
    return http.get(resourceEndpoint, {
        params: {
            title: title
        }
    });
};