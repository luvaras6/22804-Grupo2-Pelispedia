import React from 'react'
import { PeliculasGrid } from '../Components/PeliculasGrid'
import peliculas from '../peliculas.json'



function Peliculas() {


  console.log(peliculas);
  return (
    <>
      <PeliculasGrid peliculas={peliculas} />
    </>
  )
}

export default Peliculas