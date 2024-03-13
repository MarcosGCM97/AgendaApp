
const DivImput = ({value, onChange, name})=>{
    return <div className="divInput">
            {name}: <input
                    value={value}
                    onChange={onChange} />
           </div>
  }

export default DivImput