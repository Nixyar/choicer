import React from 'react';
import {Card} from '../../components/Card/Card';
import {Dropdown} from '../../components/Dropdown/Dropdown';
import {cards} from '../../data/cards';
import {filters, filtersList} from '../../data/filters';
import './Home.css';

export const Home = () => {
  return (
      <>
        <div className="home__filters">
          <h1 className="home__filters-title h1">Доступные работы</h1>
          <div className="home__filters-items">
            {filters.map((filter) => (
                <Dropdown key={filter.id} placeholder={filter.placeholder}
                          list={filtersList[filter.id]}/>
            ))}
          </div>
        </div>
        <div className="home__cards">
          {cards.map((item) => (
              <Card key={item.id}
                    curator={item.curator}
                    description={item.description}
                    editedDays={item.editedDays}
                    participants={item.participants}
                    title={item.title}
                    works={item.works}
                    id={item.id}/>
          ))}
        </div>
      </>
  )
}