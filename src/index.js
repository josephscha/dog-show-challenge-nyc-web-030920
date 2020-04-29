document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById("table-body")
    const dogUrl = `http://localhost:3000/dogs`
    const dogForm = document.getElementById("dog-form")
    reqHeaders = {"Content-type" : "application/json",
    "Accept" : "application/json"}
    // load all dogs into table 
    //creating dogs
        fetch(dogUrl).then(response => response.json())
        .then(dogs => dogs.forEach(function(dogObject){
            createDog(dogObject)
        }))
    function createDog(dogObject){
        let newRow = document.createElement("tr")
        newRow.dataset.id = dogObject.id
        newRow.innerHTML=`<td>${dogObject.name}</td> 
        <td>${dogObject.breed}</td> 
        <td>${dogObject.sex}</td> 
        <td><button class="edit-button">Edit</button></td>`

        dogTable.append(newRow)
        const editBtn = newRow.querySelector(".edit-button")
        editBtn.addEventListener("click", function(event){
            dogForm.dataset.id = `${dogObject.id}`
            dogForm.innerHTML = `
            <input type="text" name="name" value="${dogObject.name}">
            <input type="text" name="breed" value="${dogObject.breed}">
            <input type="text" name="sex" value="${dogObject.sex}">
            <input type="submit" value="Submit">
          `
        })
    }
            dogForm.addEventListener("submit", function(event){
                event.preventDefault()
                // console.log(event.target)
                const form = event.target 
                const name = form.name.value
                const breed = form.breed.value 
                const sex = form.sex.value 
                const dogId = parseInt(form.dataset.id)
                const updatedDog = {name, breed, sex}


                fetch(`http://localhost:3000/dogs/${dogId}`, {
                    method: "PATCH",
                    headers: reqHeaders,
                    body: JSON.stringify({
                        "name": `${name}`,
                        "breed": `${breed}`,
                        "sex": `${sex}`
                    })
                })
                dogForm.innerHTML = `<input type="text" name="name" placeholder="dog's name" value="" />
                <input type="text" name="breed" placeholder="dog's breed" value="" />
                <input type="text" name="sex" placeholder="dog's sex" value="" />
                <input type="submit" value="Submit" />`
            })

})

// Got stuck way too hard on syntax. Lost too much time on silly missing {}() and request header. Need to work on syntax. Was not able to implement front end changes to edit. 