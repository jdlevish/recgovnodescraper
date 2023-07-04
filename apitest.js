const axios = require('axios') 

// the variables below build the http request to call the recreation.gov api, in the future the CampgroundCode and MonthDate data will be populated via user input
const BaseUrl = 'https://recreation.gov'
const CampgroundCode = '232447'
const MonthDate = 'start_date=2023-08-01T00%3A00%3A00.000Z'
const CampsiteAvailability = '/api/camps/availability/campground/'+CampgroundCode+'/month?'

// Function calls recreation.gov api and brings back list of campsites, along with information about each site and the availability for the selected month
 async function getCampgroundAvailability(){
    try{
         const response = await axios.get(BaseUrl+CampsiteAvailability+MonthDate);
   
  return response.data;
    }catch (error){
        console.error(error);
    }
}

// this function searches the campground availability data , and saves all campsites whose status is 'Available' in an array of objects
async function searchAvailabilities(data) {
// creates empty array to store availability results
    const results = [];
//   a for in loop iterates through the data ( campsites ) object 
    for (const campsiteId in   data.campsites) {
        // a campsite variable is created to store the campsite id 
      const campsite = data.campsites[campsiteId];
// another for in loop iterates through the availabilities object
      for (const date in campsite.availabilities) {
        // a status variable is created to store the status of the campsite for each date
        const status = campsite.availabilities[date];
//   the if statement below checks if the status is 'Available' and if it is, it adds the campsite id, site name, date, and status to an object and pushes it to the results array 
        
        if (status === 'Available') {
          results.push({
            campsite_id: campsite.campsite_id,
            site: campsite.site,
            date:date,
            status: status
            
          });
        }
      }
    }
  console.log(results);
    return results;
  }
 (async ()=>{ searchAvailabilities(await getCampgroundAvailability())})()



  


