import React, {useState} from 'react';
import {Card} from '../../components/Card/Card';
import {Dropdown} from '../../components/Dropdown/Dropdown';
import {cards} from '../../data/cards';
import './Home.css';
import {courses, typeWorks} from '../../data/filters';

export const Home = () => {
  const [typeOfWork, setTypeOfWork] = useState('');
  const [teacher, setTeacher] = useState('');
  const [course, setCourse] = useState('');

  const getTeachersList = (): string[] => {
    return cards.map(card => card.curator.fullName);
  }

  const filteredCards = cards.filter((card) => {
    if (typeOfWork && card.works.every(work => work.type !== typeOfWork)) {
      return false;
    }
    if (teacher && card.curator.fullName !== teacher) {
      return false;
    }
    return !(course && !card.title.includes(course));
  });

  return (
      <>
        <div className="home__filters">
          <h1 className="home__filters-title h1">Доступные работы</h1>
          <div className="home__filters-items">
            <Dropdown placeholder="вид работы"
                      list={typeWorks} onChange={(value) => setTypeOfWork(value)}/>
            <Dropdown placeholder="преподаватель"
                      list={getTeachersList()} onChange={(value) => setTeacher(value)}/>
            <Dropdown placeholder="курс"
                      list={courses} onChange={(value) => setCourse(value)}/>
          </div>
        </div>
        <div className="home__cards">
          {filteredCards.map((item) => (
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