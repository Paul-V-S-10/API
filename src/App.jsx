import React, { useEffect, useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import './App.css'

const App = () => {
    const [data, setData] = useState([])
    const [isClicked,setIsClicked] = useState(null)
    useEffect(() => {


        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(json => {
                console.log(json.products)
                setData(json.products)
            })
    }, [])
    let shortText=[]
data.map((item,index) => {
    const maxCharacters = 50
    shortText[index] = item.description.substring(0, maxCharacters)+'...'
})
    return (
        <div className='app'>
            {
                data.map((item, key) => 
                    (
                        <div key={key} className='box'>
                            <Card style={{ width: '18rem' }}>

                                <Card.Img variant="top" src={item.images} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {isClicked==key ? item.description :shortText[key]}
                                    {isClicked==key ? <span variant="info" onClick={()=>setIsClicked(null)}>Show Less</span> :<span variant="secondary" onClick={()=>setIsClicked(key)}>Show More</span>}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{item.category}</ListGroup.Item>
                                    <ListGroup.Item>Price: {item.price}$</ListGroup.Item>
                                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default App

