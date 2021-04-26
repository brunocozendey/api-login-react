import React  from 'react';

import API from './Api';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }  



  // Se você estiver setando o valor aqui
  handleState(number) {
    this.setState({ page: number });
    this.props.pageCallback(number);
  }

  componentDidMount() {
    const LIMIT = 20;
    API.get(`characters`,{
      params: {
        ts: process.env.REACT_APP_TS,
        apikey: process.env.REACT_APP_API_KEY,//"40e8a3ad689bd32b7fa7b99e88d98d3f", //process.env.REACT_APP_API_KEY,
        hash: process.env.REACT_APP_HASH, // "2101c7a1339b06123dd4f5ca9d8b28e3"//process.env.REACT_APP_API_HASH,
        offset: (LIMIT * (this.page - 1))
      }
    })
      .then(res => {
        const persons = res.data.data.results;
        this.setState({ persons });
      })
  }

  render(){
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
       
      </ul>
    )
  }
}