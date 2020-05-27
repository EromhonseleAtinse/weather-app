import React, { useState, useEffect } from 'react';

import { Container, Navbar, NavbarBrand, Row, Col, Jumbotron, InputGroup, InputGroupAddon, Button, Input, FormGroup } from 'reactstrap'

import Weather from './Weather'

const App = () => {

  useEffect(() => {

    getCityList();
    // eslint-disable-next-line 
  }, [])

  const initialState = {
    weather: null,
    cityList: [],
    newCityName: 'New York'
  }

  const [state, setState] = useState(initialState)
  const { weather, cityList, newCityName } = state



  //methods
  const getCityList = async () => {
    await fetch('http://localhost:5000/api/cities').then((res) => res.json()).then((data) => {
      let cityList = data.map(element => element.city_name);
      setState({ ...state, cityList })

    })

  }


  const handleAddCity = () => {

    fetch('http://localhost:5000/api/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: newCityName })

    }).then(res => res.json()).then(res => {
      setState({ ...state, newCityName: "" })
      getCityList();
      console.log(res);

    })


  }

  const handleChangeCity = (event) => {

    getWeather(event.target.value);
  }

  const handleInputChange = (e) => {
    setState({ ...state, newCityName: e.target.value })
  }

  const getWeather = (city) => {
    if (city === "Select a Country") return setState({ ...state, weather: null })
    fetch(`http://localhost:5000/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        setState({
          ...state, weather
        })
      })
  }





  return (
    <Container fluid className="centered">
      <Navbar dark color="dark">
        <NavbarBrand href="/">MyWeather</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="display-3">MyWeather</h1>
            <p className="lead">The Current Weather For your Favourite cities</p>
            <InputGroup>
              <Input
                placeholder="New city name.."
                value={newCityName}
                onChange={handleInputChange}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleAddCity}>Add City</Button>
              </InputGroupAddon>
            </InputGroup>
          </Jumbotron>

        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-5">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={handleChangeCity}>
              {cityList.length === 0 ? <option>No cities added yet.</option> : <option>Select a Country</option>}
              {cityList.map((city, i) => <option key={i}>{city}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Weather data={weather} />
    </Container>
  );
}

export default App;
