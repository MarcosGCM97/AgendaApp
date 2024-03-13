import React, { useEffect, useState } from 'react'
import contactServices from './services/contacts'
import './index.css'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import DivFilter from './components/DivFilter'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPerson, setFilterPerson ] = useState([...persons])
  const [ showAll, setShowAll ] = useState(true)
  const [ message, setMessage ] = useState(null)
  const contactToShow = showAll ? persons : filterPerson
  const [ aux, setAux ] = useState([])

  useEffect(()=>{
        contactServices
        .getAll()
        .then(person => setPersons(person)
        )
  },[aux])


  const addPerson = (event)=>{
    event.preventDefault();
    const personObject = {name: newName, number: newNumber}

    let validarPerson = persons.filter(person=>(person.name === personObject.name))
    if(validarPerson.length > 0){
      // eslint-disable-next-line no-restricted-globals
      if(confirm(`${newName} is already added to phonebook, want you edit this contact?`)){
        let updatePerson = persons.filter(person => person.name === personObject.name)

        contactServices
          .update(updatePerson[0].id, personObject)
          .then(result => setAux(aux.concat(result)))
          .catch(error => {
            console.log(error);
            setMessage(
              <p className='messageError'>{newName} name contact non fund</p>
            )
            setTimeout(()=>{
              setMessage(null)
            }, 2000)
          })
      } else{
        setPersons(persons)
      }
    } else {
      setPersons(persons.concat(personObject))

      contactServices
          .create(personObject)
          .then(personAdd => {
              setPersons(persons.concat(personAdd))
            })
          .then(
            setMessage(
              <p className='messageAdd'>You've adeed to {newName}</p>
            ),
            setTimeout(()=>{
              setMessage(null)
            }, 2000)
          ) 
          .then(result => setAux(aux.concat(result)))
          .catch(error => {
            setMessage(
              <p className='messageError'>The name or the number is necesary for add a contact</p>
            )
          })   
          ;  
    }

    setNewName('')
    setNewNumber('')
    setShowAll(true)
  }
  const handleNameChange =(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilterPerson(
        persons.filter(person => (
            person.name.toUpperCase().includes(event.target.value.toUpperCase())
        ))
    )
    setShowAll(false)
  }

  const onDelete =(e)=>{
    let targetChild = e.target.parentNode
    
    let deleteThis = persons.filter(person =>(
      targetChild.innerText.includes(person.name)
  ))
   
    contactServices
        .deleteContact(deleteThis[0].id) 
        .then(result => setAux(aux.concat(result)))   
  }


  return (
    <div className='container'>
      <h2 className='h2Title'>Phonebook</h2>
      <DivFilter 
        name={'Filter shown with'}
        onChange={handleFilter}
      />
      <h2 className='h2Form'>Add a new</h2>
      <Notification message={message}/>
      <PersonsForm 
        add={addPerson}
        valueName={newName}
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange} 
      />
      <h2>Numbers</h2>
        <Persons contacts={contactToShow} onDelete={onDelete} />
    </div>
  )
}


export default App