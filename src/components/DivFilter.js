
const DivFilter =({name, onChange})=>{
    return <div className="divFilter">
       {name} <input onChange={onChange}/>
     </div> 
}

export default DivFilter