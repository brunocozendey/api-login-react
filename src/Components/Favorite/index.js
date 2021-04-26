import React, {useState, useEffect, useCallback} from 'react';

function Favorite(){
    useEffect(() => {
        async function loadCharacter(){
            const LIMIT = 20;
            const response = await marvelUrl.get(`characters`,{
                params: {
                  ts: process.env.REACT_APP_TS,
                  apikey: process.env.REACT_APP_API_KEY,
                  hash: process.env.REACT_APP_HASH, 
                  offset: (LIMIT * (1 - 1))
                }
              })
              setCharacters(response.data.data.results);  
            }
        loadCharacter();
        
        async function loadFavCharacter(){
            console.log(getToken())
            const res = await userUrl.get(`\characters`,
                { 'headers': { 'x-access-token': getToken() }
            })
            console.log(res.data.fav_character)
            setFavCharacters(res.data.fav_character)
        }
        loadFavCharacter();

    }, [])
    return(
        <div>
        <h1> Favorite Comics</h1>

        <h1> Favorite Characters</h1>

        </div>
        
    )

}

export default Favorite;