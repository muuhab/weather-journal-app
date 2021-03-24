/* Global Variables */
const baseUrl="http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&units=metric&appid=3bf0963f780d69bf0f0390cfd3575552";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
    const zipCode=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    if(zipCode!==''){
        fetchWeather(baseUrl,zipCode,apiKey).then((data)=>{
            postWeather('/getData',{Date:newDate,temp:data.main.temp,user:feelings})
            updateUI()
        })
    }
    else
    alert("Enter Postal Card");
}
const fetchWeather= async (baseUrl,zipCode,apiKey)=>{
    const res= await fetch(baseUrl+zipCode+apiKey)
    try{
        const data=await res.json();
        console.log(data);
        return data
    }
    catch(error)
    {
        console.log('error',error);
    }
}
const postWeather= async(url='',data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const data = await request.json();
      document.getElementById('date').innerHTML = "Date: "+data.body.Date;
      document.getElementById('temp').innerHTML = "Tempreature: "+data.body.temp+"<span>&#8451;</span>";
      document.getElementById('content').innerHTML = "Your Feelings: "+data.body.user;
  
    }catch(error){
      console.log("error", error);
    }
  }

