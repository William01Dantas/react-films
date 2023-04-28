import React, {useEffect, useState} from "react";
import { Container, ListMovies } from "./styles";
import Header from '../../components/Header/index_components';
import { getMoviesSave, deleteMovie } from "../../utils/storage";
import FavoriteItem from '../../components/FavoriteItem';
import { useNavigation, useIsFocused, } from "@react-navigation/native";

function Movies(){
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        let isActive = true;
        async function getFavoriteMovies() {
            const result = await getMoviesSave('@reactfilms');
            if (isActive) {
                setMovies(result);
            }
        }
        if (isActive) {
            getFavoriteMovies();
        }
        return () => {
            isActive = false;
        }
    }, [isFocused])

    async function handlerDelete(id) {
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailsPage(item) {
        navigation.navigate('Detail', {id: item.id})
    }

    return(
        <Container>
            <Header title="Meus filmes"/>

            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <FavoriteItem
                        data={item}
                        deleteMovie={handlerDelete}
                        navigatePage={()=> navigateDetailsPage(item)}
                    />
                )}
            />
        </Container>
    )
}

export default Movies;