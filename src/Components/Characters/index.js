import React, {useState, useEffect} from 'react';
import {loginUrl, marvelUrl, userUrl} from '../../Api'
import Table from 'react-bootstrap/Table'
import starOk from '../../assets/imgs/starOk.png'
import starNok from '../../assets/imgs/starNok.png'
import { getToken, login } from '../../Services/auth';



function Characters(){

    const [characters, setCharacters] = useState([]);
    const [favCharacters, setFavCharacters] = useState([0]);

    function handleFavCharacater(e,characterid){
        e.preventDefault();
        console.log("characterid",characterid)
        userUrl.post(`\characters`, {characterid,characterid},
            { 'headers': { 'x-access-token': getToken() }
        })
       
    }

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
            console.log(res.data.favcharacter)
            setFavCharacters(res.data.favcharacter)
        }
        loadFavCharacter();

    }, [])


    return(
        <div>
                <h1> Characters Marvel</h1>
             <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Picture</th>
                        <th>Comics List</th>
                        <th>Favorite</th>
                    </tr>
                </thead>
                <tbody>
                {characters.map((character) => (
                <tr key={character.id} class="text-left">
                    <td>{character.name}</td>
                    <td><img src={character.thumbnail.path+"."+character.thumbnail.extension} height="75px" width="75px"/></td>
                    <td>
                    {character.comics.items.map((comic) =>(
                        <li><a href={comic.resourceURI}>{comic.name}</a></li>
                    ))}
                    </td>
                    <td>  
                        <img src={(favCharacters.indexOf(character.id.toString()) > -1) ? starOk:starNok} height="20px" width="20px" onClick={(e) => handleFavCharacater(e, character.id)}/>
                    </td>
                </tr>
                ))}
                </tbody>
             </Table>
        </div>
    )

}

export default Characters;
