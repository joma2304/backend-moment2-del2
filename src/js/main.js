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
    const workExperiences = await getWorkExperiences();
    const workExperiencesList = document.getElementById('arbets-list'); //Ul element
    workExperiences.forEach(workExperience => { //Loopar igenom svar
      const listItem = document.createElement('li'); //Skapar li element
      listItem.textContent = `Företagsnamn: ${workExperience.companyname}, Arbetstitel: ${workExperience.jobtitle}, Plats: ${workExperience.location} `; //Lägger till i LI
      
      // Lägg till en knapp för att ta bort work experience
      const deleteButton = document.createElement('button'); //Knapp för att ta bort
      deleteButton.textContent = 'Ta bort'; //Text till knapp
      deleteButton.addEventListener('click', () => deleteWorkExperience(workExperience.id)); //Eventlistner för knapp
      
      listItem.appendChild(deleteButton); //Lägger till i knapp
      workExperiencesList.appendChild(listItem); //Slår ihop med ul
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
      // Ta bort work experience från DOM
      const listItem = document.querySelector(`li[data-id="${id}"]`);
      listItem.remove();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Kör funktionen för att hämta och visa workexperience
  showWorkExperiences();