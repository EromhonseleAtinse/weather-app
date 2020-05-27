import React from 'react'
import { Table, Row, Col } from 'reactstrap'

const Weather = (props) => {
    const { data } = props


    if (!data) return <div></div>
    const { name, weather, main, wind } = data

    return (
        <Row className="weather">
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <h2>{name}</h2>
                <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} alt="Weather" />
                <span>{weather[0].main}</span>
                <span>{Math.floor(main.temp)}</span>
                <Table>
                    <tbody>
                        <tr>
                            <td>Wind</td>
                            <td>{Math.floor(wind.speed)}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{Math.floor(main.pressure)}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{Math.floor(main.humidity)}</td>
                        </tr>
                        <tr>
                            <td>Min Temp</td>
                            <td>{Math.floor(main.temp_min)}</td>
                        </tr>
                        <tr>
                            <td>Max Temp</td>
                            <td>{Math.floor(main.temp_max)}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default Weather
