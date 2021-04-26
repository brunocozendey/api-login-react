import React, {useState, useEffect, useCallback} from 'react';
import {marvelUrl, userUrl} from '../../Api'
import Table from 'react-bootstrap/Table'
import starOk from '../../assets/imgs/starOk.png'
import starNok from '../../assets/imgs/starNok.png'
import { getToken, login } from '../../Services/auth';

function Comics(){

    const [comics, setComics] = useState([]);
    const [favComics, setFavComics] = useState([]);

    function handleFavComicsdel(e,comicid){
        e.preventDefault();
        console.log("comicid",comicid)
        userUrl.put(`\comics`, {"comicid":comicid},
        { 'headers': { 'x-access-token': getToken() }
        })
    }


    function handleFavComics(e,comicid){
        e.preventDefault();
        console.log("comicid",comicid)
        userUrl.post(`\comics`, {"comicid":comicid},
        { 'headers': { 'x-access-token': getToken() }
        })
    }

    useEffect(() => {
        async function loadComics(){
            const LIMIT = 20;
            const response = await marvelUrl.get(`comics`,{
                params: {
                  ts: process.env.REACT_APP_TS,
                  apikey: process.env.REACT_APP_API_KEY,
                  hash: process.env.REACT_APP_HASH, 
                  offset: (LIMIT * (1 - 1))
                }
              })
              setComics(response.data.data.results);  
            }
        loadComics();
        async function loadFavComics(){
            const res = await userUrl.get(`\comics`,
                { 'headers': { 'x-access-token': getToken() }
            })
            setFavComics(res.data.comics);
        }
        loadFavComics();
    }, [])

    return(
        <div>
                <h1> Comics Marvel</h1>
             <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Picture</th>
                        <th>Favorite</th>
                    </tr>
                </thead>
                <tbody>
                {comics.map((comic) => (
                <tr key={comic.id} class="text-left">
                    <td>{comic.title}</td>
                    <td><img src={comic.thumbnail.path+"."+comic.thumbnail.extension} height="75px" width="75px"/></td>
                    <td>
                        <img src={ (favComics.indexOf(comic.id.toString()) > -1) ? starOk:starNok} height="20px" width="20px" onClick={(e) => handleFavComics(e, comic.id)} />
                    </td>
                </tr>
                ))}
                </tbody>
             </Table>
        </div>
    )

}

export default Comics;
