import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './styles/residentCard.css'

const ResidentCard = ({url}) => {


const [resident, setResident] = useState()

useEffect(() => {
    axios.get(url)
    .then(res => setResident(res.data))
    .catch(err => console.log(err))
}, [])

  return (
    <article className='card'>
        <header className='card_header'>
            <img className='card_avatar' src={resident?.image} alt="" />
            <div className='card_circle_container'>
                <div className={`card_circle ${resident.status}`}></div>
                <span className='card_circle-label'>{resident?.status}</span>
            </div>
        </header>
        <section className='card_body'>
            <h3 className='card_name'>{resident?.name}</h3>
            <ul className='card_list'>
                <li className='card_item'><span className='card_item-label'>Species</span><span className='card_item-value'>{resident?.species}</span></li>
                <li className='card_item'><span className='card_item-label'>Origen</span><span className='card_item-value'>{resident?.origin.name}</span></li>
                <li className='card_item'><span className='card_item-label'>Episodies where appear</span><span className='card_item-value'>{resident?.episode.length}</span></li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentCard