import DivImput from "./DivImput"


const PersonsForm =({add, valueName, onChangeName, valueNumber, onChangeNumber})=>{
    return <form onSubmit={add} className="personForm">
              <DivImput 
                name={'Name'} 
                value={valueName} 
                onChange={onChangeName} 
              />
              <DivImput 
                name={'Number'} 
                value={valueNumber} 
                onChange={onChangeNumber} 
              />
              <div>
                <button className="btnAdd" type="submit">Add</button>
              </div>
            </form>
}

export default PersonsForm