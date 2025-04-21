document.getElementById('akanForm').addEventListener('submit' , function(e) {
    e.preventDefault();

    //Get User Inputs
    const birthday = document.getElementById('birthday').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    //validate date
    if (!birthday) {
        showError('please enter a valid date');
        return;
    }

    //parse date
    const dateParts = birthday.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateparts[1]);
    const day = parseInt(dateparts[2]);

//Additional Validation
if(month<1 || month >12 || day > new Date(year,month,0).getDate()) {}

//calculate day of week
const dayOfWeek = calculateDayOfWeek(day,month,year);

//Get Akan Name
const akanName = getAkanName(dayOfWeek,gender);

//Display result
displayResult(dayOfWeek,akanName);
});

function calculateDayOfWeek(day,month,year) {
    //Adjust month for the formula(March is 1,february is 12)
    let adjustedMonth = month;
    let adjustedYear = year;

    if (month< 3) {
        adjustedMonth = month + 12;
        adjustedYear = year - 1;
    }

    const century =Math.floor(adjustedYear/100);
    const yearInCentury = adjustedYear % 100;

    //zeller's Congruence algorithm
    const dayOfWeek = (day + Math.floor((13 *(adjustedMonth + 1))/5 + yearInCentury +Math.floor(yearInCentury / 4)+Math.floor(century/4)+(5 * century))) % 7;

    //convert result to our day index (0=saturday, 1=sunday, 2=monday,3=tuesday, 4=wednesday, 5=thursday, 6=friday )
    return (dayOfWeek +5) % 7;
}
 
function getAkanName (dayOfWeek ,gender) {
    const maleNames = ['kwasi' , 'kwado' , 'kwabena' ,'kwaku' , 'yaw' , 'kofi' ,'kwame' ];
    const femaleNames = ['Akosua' , 'Adwoa' , 'Abenaa', 'Akua' ,'Yaa', 'Afua', 'Ama' ];
    const days = [ 'sunday' , 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    return{
        name : gender === 'male' ? maleNames[dayOfWeek] : femaleNames
        [dayOfWeek],
        day : days[dayOfWeek]
        };
    }

    function displayResult (dayOfWeek, akanName) {
        const resultcontainer = document.getElementById('result');

        resultcontainer.innerHTML=`
        <h2> Your Akan Name Result</h2>
        <p>You were born on a <span class="highlight">${akanName.day}</span></p>
        <p>Your Akan Name is <span class"highlight">${akanName.name}</span></P>
        `;
        resultcontainer.style.display = 'block';
        
        //Hide the error after 5 seconds
        setTimeout(()=>{
            errorContainer.style.display ='none' ;
        }, 5000);
    }



