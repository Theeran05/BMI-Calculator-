import { useState } from 'react'
import './App.css'

function App() {
  const [height, setheight] = useState()
  const [weight, setweight] = useState()
  const [bmi, setbmi] = useState(null)
  const [bmistatus, setstatus] = useState("")
  const [errormessage, seterrormessage] = useState("")

  const clearall = () => {
    setheight("")
    setweight("")
    setbmi(null)
    setstatus("")
  }
  const calculatebmi = () => {
    const isvaludheight = /^\d+$/.test(height);
    const isvaludweight = /^\d+$/.test(weight);

    if (isvaludheight && isvaludweight) {
      const heightmeters = height / 100
      const bmivalue = weight / (heightmeters * heightmeters);
      setbmi(bmivalue.toFixed(2));
      if (bmivalue < 18.5) {
        setstatus("Underweight")
      } else if (bmivalue >= 18.5 && bmivalue < 24.9) {
        setstatus("CorrectWeight")
      } else {
        setstatus("Obese")
      }
      seterrormessage("")
    } else {
      setbmi(null)
      setstatus("")
      seterrormessage("Please enter valid numeric values for height and weight.")
    }
  }

  const handelkeydown = (e) => {
    if (e.key === "Enter") {
      calculatebmi()
    }  
  }

  return (
    <>
      <div className="bmi-calculater">
        <div className="box"></div>
        <div className="data">
          <h1>BMI Calculator</h1>
          {errormessage && (<p className="error">{errormessage}</p>)}
          <div className="input-container">
            <label htmlFor="height">Height (cm)</label>
            <input type="text" id="height" value={height} onChange={(e) => { setheight(e.target.value) }} onKeyDown={handelkeydown} />
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight (kg)</label>
            <input type="text" id="weight" value={weight} onChange={(e) => { setweight(e.target.value) }} onKeyDown={handelkeydown} />
          </div>
          <button onClick={calculatebmi}  >BMI Calculator</button>
          <button onClick={clearall} className='clear'>Clear</button>
          {bmi !== null && (
            <div className="result">
              <p>Yoy are BMI is {bmi}</p>
              <p>Status : {bmistatus}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
