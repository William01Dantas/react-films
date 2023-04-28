import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMoviesSave(key) {
    const myMovies = await AsyncStorage.getItem(key)
    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

export async function saveMovie(key, newMovie) {
    let moviesStored = await getMoviesSave(key);
    const hasMovie = moviesStored.some( item => item.id === newMovie.id);
    if (hasMovie) {
        console.log("ESSE FILME JÁ EXISTE EM SUA LISTA");
        return;
    }
    moviesStored.push(newMovie);
    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

export async function deleteMovie(id) {
    let moviesStored = await getMoviesSave('@reactfilms');
    let myMovies = moviesStored.filter( item => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('@reactfilms', JSON.stringify(myMovies));
    return myMovies;
}

export async function hasMovie(movie) {
    let moviesStored = await getMoviesSave('@reactfilms');
    const hasMovie = moviesStored.find( item => item.id === movie.id);
    if (hasMovie) {
        return true;
    }
    return false;
}