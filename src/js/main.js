//Väntar på att allt ska laddas in innan koden börjar köras
document.addEventListener('DOMContentLoaded', function() {

async function getWorkExperiences() { //Hämtar från api
    try {
      const response = await fetch('https://backend-moment2-del1.onrender.com/api/workexperience');
      if (!response.ok) { //Om error
        throw new Error('Failed to fetch work experiences'); //Felmeddelande
      }
      const workExperiences = await response.json(); //Svaret 
      return workExperiences; //Returnerar svar
    } catch (error) { //Fångar fel
      console.error('Error:', error); //Felmeddelande
      return []; //Returnerar tomt
    }
  }
  
  async function showWorkExperiences() { //Funktion för att läsa ut svaret
    const workExperiences = await getWorkExperiences(); //Lagrar svaren i variabel
    const workExperiencesList = document.getElementById('arbets-list'); //Hämtar UL-element

    // Rensa listan först
    workExperiencesList.innerHTML = '';

    workExperiences.forEach(workExperience => { //Loopar igenom alla svar
        const listItem = document.createElement('li'); //Skapar li

        const companyNameLabel = document.createElement('p'); //Skapar p
        companyNameLabel.textContent = `Företagsnamn: ${workExperience.companyname}`;
        listItem.appendChild(companyNameLabel); //Slår ihop

        const jobTitleLabel = document.createElement('p'); //skapar p
        jobTitleLabel.textContent = `Arbetstitel: ${workExperience.jobtitle}`;
        listItem.appendChild(jobTitleLabel); //Slår ihop

        const locationLabel = document.createElement('p'); //Skapar p
        locationLabel.textContent = `Plats: ${workExperience.location}`;
        listItem.appendChild(locationLabel); //Slår ihop

        const deleteButton = document.createElement('button'); //Skapar delete knapp
        deleteButton.textContent = 'Ta bort'; //Knappens innehåll
        deleteButton.addEventListener('click', () => deleteWorkExperience(workExperience.id)); //Eventlistner för knapp att ta bort, om klickad körs funktion för att ta bort
        listItem.appendChild(deleteButton); //Slår ihop

        workExperiencesList.appendChild(listItem); //Slår ihop elementen
    });
}
  
  async function deleteWorkExperience(id) { //Funktion för att ta bort
    try {
        const response = await fetch(`https://backend-moment2-del1.onrender.com/api/workexperience/${id}`, {
            method: 'DELETE' //Delete metod för att ta bort från api och databas
        });
        if (!response.ok) {
            throw new Error('Failed to delete work experience');
        }
        // Ladda om sidan för att uppdatera listan och därmed försvinner borttagna objektet från den
        location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
}

  
  // Kör funktionen för att hämta och visa workexperience
  showWorkExperiences();

  //Lägga till workexperience
  document.getElementById('add-arbets-form').addEventListener('submit', addWorkExperience);

async function addWorkExperience(event) {
    event.preventDefault(); // Förhindrar att formuläret skickas som vanligt

    const formData = new FormData(event.target); // Hämtar data från form

        // Kontrollera om formuläret är tomt eller bara innehåller mellanslag
        const isFormEmpty = Array.from(formData.values()).every(value => value.trim() === '');
        if (isFormEmpty) {
            alert("Fyll i alla fält korrekt för att kunna lägga till erfarenhet");
            return;
        }
    

    // Skapar ett objekt med den insamlade datan
    const newWorkExperience = {
        companyname: formData.get('companyname'),
        jobtitle: formData.get('jobtitle'),
        location: formData.get('location')
        
    };

    try {
        const response = await fetch('https://backend-moment2-del1.onrender.com/api/workexperience', {
            method: 'POST', //Post metod
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkExperience) // Omvandlar objektet till JSON
        });

        if (!response.ok) {
            throw new Error('Failed to add work experience');
        }

        // Om det funkar skicka användaren till startsida så den kan se tillagda erfarenheten
        window.location.href = 'index.html';
    } catch (error) { //Om fel
        console.error('Error:', error);
        alert("Något gick fel när erfarenhet skulle läggas till");
    }
}

});
