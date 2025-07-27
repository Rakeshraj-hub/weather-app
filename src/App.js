import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
// import Card from './components/Card'

function App() {
   const [data, setData] = useState("")
   const [fData, setfData] = useState({
    Temreture: "",
    humidity: "",
    Condition: "",
    "Wind Speed" : ""
   });
   const [loading, setLoading] = useState(false);
   const [isDataLoaded, setIsDataLoaded] = useState(false);
   function handleChange(e){
       
      const input = e.target.value;
      setData(input);
   }

   const fetchData = async ()=>{
    setLoading(true)
    setIsDataLoaded(false);
    try{
    
    const res = await fetch (`https://api.weatherapi.com/v1/current.json?key=18618764b5e94caba4d80113241207&q=${data}`);
    const fiData = await res.json();
    
    setfData({
      Temreture : fiData.current.temp_c,
      humidity : fiData.current.humidity,
      Condition : fiData.current.condition.text,
      "Wind Speed" : fiData.current.wind_mph
    });
     setIsDataLoaded(true);
  }
   catch(error){
     alert("Failed to fetch weather data");
   }
    finally{
      setLoading(false);
    }
   
    
    
    // console.log(fData);
    // console.log(await fData.current.humidity);
    
   }
  return (
    <div className="App">
        <div>
        <input type={text} value={data} onChange={handleChange} placeholder='Enter city name' style={{height:30, width:180}}/>
        <button onClick={fetchData} style={{color:'white', backgroundColor:'green', height:30, width:80, margin:10, borderRadius:5, cursor:'pointer'}}>Search</button>
        </div>
        {loading && <p>Loading data...</p>}
        {!loading && isDataLoaded &&(
        <div className='weather-cards'>
           <div className='weather-card'>
           {/* <strong>{condition}</strong> */}
           <strong>Temprature</strong>
           {fData.Temreture} C
        </div>
         <div className='weather-card'>
           {/* <strong>{condition}</strong> */}
           <strong>Humidity</strong>
           {fData.humidity}%
        </div>

         <div className='weather-card'>
           {/* <strong>{condition}</strong> */}
           <strong>Codition</strong>
           {fData.Condition}
        </div>

         <div className='weather-card'>
           {/* <strong>{condition}</strong> */}
           <strong>Wind Speed</strong>
           {fData['Wind Speed']} kph
        </div>
       
        </div>
         )}
    </div>
  );
}

export default App;
