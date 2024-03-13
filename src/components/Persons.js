

const Persons =({contacts, onDelete})=>{
    const constact = contacts
    return  <ul className="ulPersons">
              {constact.map(
                  (person,index) =>(
                      <li className="liPersons" key={index}>
                          {person.name} {person.number}
                          <button onClick={onDelete}>delete</button>
                      </li>
                  )
              )}
            </ul>
}

export default Persons