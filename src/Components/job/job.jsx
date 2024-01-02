import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import image from '../../assets/image.png'
import Navbar from '../navbar/Navbar';

const Job = () => {
  const cardsData = [
    { id: 1, imageUrl: image, company: 'TechTop', desgination: 'UI/UX Designer UI/UX Designer UI/UX Designer UI/UX Designer ', city: 'New York', country: 'NY', paragraph: ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
    { id: 2, imageUrl: image, company: 'TechTop', desgination: 'UI/UX Designer', city: 'New York', country: 'NY', paragraph: ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
    { id: 3, imageUrl: image, company: 'TechTop', desgination: 'UI/UX Designer', city: 'New York', country: 'NY', paragraph: ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
    { id: 4, imageUrl: image, company: 'TechTop', desgination: 'UI/UX Designer', city: 'New York', country: 'NY', paragraph: ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
    { id: 5, imageUrl: image, company: 'TechTop', desgination: 'UI/UX Designer', city: 'New York', country: 'NY', paragraph: ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
    { id: 6, imageUrl: image, company: 'TechTop', desgination: 'UI/UX Designer', city: 'New York', country: 'NY', paragraph: ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' },
  ];



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {cardsData.map((card) => (
            <div key={card.id} className="col-md-4 p-2">
              <Card className='h-100' style={{ padding: '20px' }}>
                <div className='d-flex flex-column grid gap-3'>
                  <div className='d-flex col-md-12 ' style={{ textAlign: 'left' }}>
                    <div className='d-flex flex-column justify-content-center col-md-10'>
                      <Typography gutterBottom variant="body2" style={{ fontSize: '15px', color: 'gray' }}>
                        {card.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {card.desgination}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.city},{card.country}
                      </Typography>
                    </div>
                    <div className='d-flex col-md-2 justify-content-end align-items-start'>
                      <CardMedia
                        component="img"
                        image={card.imageUrl}
                        style={{ height: '60%', width: '80%', borderRadius: '5%' }}
                      />
                    </div>

                  </div>


                  <div className='d-flex col-md-12 grid gap-4'>
                    <div className='col-md-2'>
                      <Button style={{ fontSize: '8px', color: 'black', backgroundColor: 'lightgray', borderRadius: '12px', fontWeight: 'bold' }}>
                        Full Time
                      </Button>
                    </div>
                    <div className='col-md-2'>
                      <Button style={{ fontSize: '8px', color: 'black', backgroundColor: 'lightgray', borderRadius: '12px', fontWeight: 'bold' }}>
                        On-Site
                      </Button>
                    </div>
                    <div className='col-md-2'>
                      <Button style={{ fontSize: '8px', color: 'black', backgroundColor: 'lightgray', borderRadius: '12px', fontWeight: 'bold' }}>
                        1-2 Year
                      </Button>

                    </div>
                  </div>
                  <div className='d-flex col-md-11'>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: 'left' }}>
                      {card.paragraph}
                    </Typography>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <Button
                      variant="contained"
                      style={{
                        fontWeight: 600,
                        fontSize: '15px',
                        color: 'white',
                        background: '#9861DF',
                        borderRadius: '30px',
                        marginBottom: '10px',
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>

                </div>


              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Job;
