import React,{ useEffect,useState } from 'react';
import logo from './logo.svg';
import './App.css';


import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Form from 'react-bootstrap/Form'
import Columns from "react-columns"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"



function App() {

  const [latest,setLatest]=useState([]);
  const [results,setResults]=useState([]);
  const [searchCountries,setSearchCountries]=useState("");
   
   useEffect(()=>{

    axios
    .all([
       axios.get("https://corona.lmao.ninja/all"),
       axios.get("https://corona.lmao.ninja/countries")
      ])
    .then(res=>{
      setLatest(res[0].data);
      setResults(res[1].data);
    })
    .catch(err=>{
      console.log(err);
    });
   },[]);

  const date=new Date(parseInt(latest.updated));
  const latestupdates=date.toString(); 


  const filterCountries=results.filter(item=>{

    return searchCountries !==""? item.country.toLowerCase().includes(searchCountries.toLowerCase()):item;
  })
  const countries=filterCountries.map((data,i)=>{

    return(
       
       <Card
             key={i}
             bg="light"
             text="dark"
             className="text-center"
             style={{margin:"10px"}}
       >
        <Card.Img variant="top" src={data.countryInfo.flag} />
       <Card.Body>
          <Card.Title>{data.country}</Card.Title>
        
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Todays's cases {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths  {data.todayDeaths}</Card.Text>
          
       </Card.Body>
       </Card>
     
      );
  });


  var queries=[{


    columns:2,
    query:'min-width :500px'
  },{

    columns:3,
    query:'min-width:1000px'
  }];

  return (
   <div
    

   >
    <br/>
      <h2 style={{textAlign:"center"}}>Covid-19 Live States</h2>

    <br/>
   <CardDeck>
   
   <Card 
   bg="secondary"
   text="white"
   className="text-center"

   style={{margin:"10px"}}

>
  
   <Card.Body >
   <Card.Title>Cases</Card.Title>
   <Card.Text>
   {latest.cases}
   </Card.Text>
   </Card.Body>
   <Card.Footer >
   <small >Last updated {latestupdates}</small>
   </Card.Footer>
   </Card>
   <Card 
   bg="danger"
   text="white"
   className="text-center"

   style={{margin:"10px"}}>

   <Card.Body >
   <Card.Title>Deaths</Card.Title>
   <Card.Text>
   {latest.deaths}
   </Card.Text>
   </Card.Body>
   <Card.Footer >
   <small >Last updated {latestupdates}</small>
   </Card.Footer>
   </Card>
   <Card
   bg="success"
   text="white"
   className="text-center"
   style={{margin:"10px"}}>

   <Card.Body>
   <Card.Title>Recovered</Card.Title>
   <Card.Text>
   {latest.recovered}
   </Card.Text>
   </Card.Body>
   <Card.Footer >
   <small >Last updated {latestupdates}</small>
   </Card.Footer>
   </Card>
 
   </CardDeck>


   <br/>

    <Form>
      <Form.Group controlId="formBasicSearch">
        <Form.Control 
           style={{margin:"10px"}}
           type="text" 
           placeholder="Seach a Country" 
           onChange={e=>setSearchCountries(e.target.value)}/>
      </Form.Group>
   </Form>



   <Columns queries={queries}>{countries}</Columns>
   </div>
   );
}

export default App;
