const API = "https://api.themoviedb.org/3"

export function get(path){
    return fetch(API + path, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGVjMDZlNDM3Y2Q3YWIzMWFlMWUxMWMzZDdmNmM4YiIsInN1YiI6IjYzMTc4ZTg1NDZlNzVmMDBhNTc0ZWRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zokjovcFgRkDTVgrOqYsXN6jZYZiyrHLfwldAE7juRM", 
            "Content-Type": "application/json;charset=utf-8"
        }
    })
    .then(res => res.json())
}