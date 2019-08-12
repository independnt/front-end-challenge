document.addEventListener('DOMContentLoaded', () => {
    loadTable();
});

//main function to load, order, and insert data
async function loadTable(){
    const carData = await fetchCarData();
    const orderedData = orderByVehicleModel(carData, "vehicle_model")

    const target = document.getElementById("swt-table-body")

    let response = ""

    for(var i of orderedData){
        response += createCells(i)
    }

    target.innerHTML = response
}

//create car table cells
function createCells(car){
    return `
        <tr>
            <td>${car.vehicle_year}</td>
            <td>${car.make}</td>
            <td>${car.vehicle_model}</td>
            <td>${car.displacement}</td>
            <td>${car.cylinders}</td>
            <td>${car.class}</td>
        </tr>
    `
}

//order data by needed attribute for use on other attribute searches in the future. 
//used .toUpperCase() to satisfy one isntance of model that was lowercase "City Express Cargo Van"
function orderByVehicleModel(carObjectsArray, attribute){
    return carObjectsArray.sort((a,b) => (a[attribute].toUpperCase() > b[attribute].toUpperCase()) ? 1 : -1)
}

//fetch car data
function fetchCarData(){
    const carData = fetch("https://api.sawatchlabs.com/models/13/2017")
    .then(response => response.json())
    .then(data => data.data)

    return carData
} 

