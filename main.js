import './style.css'
var fulltableData = [
  {NAME: 'himanshu',POSITION: 'Developer',AGE: '22',DATE: '4-5-24',SALARY: '20000',},
  {name: 'Nishant',position: 'Accountant',age: '24',date: '1-5-24',salary: '25000',},
  {name: 'Sujal',position: 'Engineer',age: '22',date: '3-5-24',salary: '15000',},
  {name: 'Amit',position: 'Assistant',age: '23',date: '2-5-24',salary: '25000',},
  {name: 'Mohit',position: 'Developer',age: '21',date: '4-5-24',salary: '30000',},
  {name: 'Sohit',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Rohit',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',},
  {name: 'Rohan',position: 'Engineer',age: '22',date: '3-5-24',salary: '15000',},
  {name: 'Alice',position: 'Assistant',age: '23',date: '2-5-24',salary: '25000',},
  {name: 'Harry',position: 'Developer',age: '21',date: '4-5-24',salary: '30000',},
  {name: 'Adwin',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Jassi',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',},
  {name: 'Lucky',position: 'Engineer',age: '22',date: '3-5-24',salary: '15000',},
  {name: 'Ashwin',position: 'Assistant',age: '23',date: '2-5-24',salary: '25000',},
  {name: 'Javed',position: 'Developer',age: '21',date: '4-5-24',salary: '30000',},
  {name: 'Abhay',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Saran',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',},
  {name: 'Alice',position: 'Assistant',age: '23',date: '2-5-24',salary: '25000',},
  {name: 'Harry',position: 'Developer',age: '21',date: '4-5-24',salary: '30000',},
  {name: 'Adwin',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Jassi',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',},
  {name: 'Lucky',position: 'Engineer',age: '22',date: '3-5-24',salary: '15000',},
  {name: 'Ashwin',position: 'Assistant',age: '23',date: '2-5-24',salary: '25000',},
  {name: 'Javed',position: 'Developer',age: '21',date: '4-5-24',salary: '30000',},
  {name: 'Abhay',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Saran',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',},
  {name: 'Adwin',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Jassi',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',},
  {name: 'Lucky',position: 'Engineer',age: '22',date: '3-5-24',salary: '15000',},
  {name: 'Ashwin',position: 'Assistant',age: '23',date: '2-5-24',salary: '25000',},
  {name: 'Javed',position: 'Developer',age: '21',date: '4-5-24',salary: '30000',},
  {name: 'Abhay',position: 'Engineer',age: '25',date: '4-5-24',salary: '20000',},
  {name: 'Saran',position: 'Tester',age: '24',date: '3-5-24',salary: '10000',}
]

var itemsPerPage = 8;
var currentPage = 2;
var totalPages = Math.ceil(fulltableData.length / itemsPerPage);

var tbody = document.createElement('tbody');
tbody.className = "tbody"

// render table header
function renderTableHeader(fulltableData) {
  var tableHeaderRow = document.querySelector('#tableHeader');
  tableHeaderRow.innerHTML = '';
  Object.keys(fulltableData[0]).forEach(function (key, index) {
      var th = document.createElement('th');
      th.textContent = key;
      th.dataset.order = 'asc'
      th.dataset.key = key;
      th.addEventListener('click', function (event) { 
          sortData(event)
      })
      tableHeaderRow.appendChild(th)
  })
  var th = document.createElement('th')
  th.textContent = 'ACTION';
  tableHeaderRow.appendChild(th)
}
// render action
function renderAction(isEditable, rowIndex) {     
  var actionTd = document.createElement('td');    
  var editIcon = document.createElement('span')
  
  if(isEditable){
      editIcon.textContent = 'save';
      editIcon.dataset.mode = 'save';
  }else{
      editIcon.textContent = '✎';
      editIcon.className = "editBtn"
      editIcon.dataset.mode = 'Edit';
  }
  
  editIcon.addEventListener('click', function (event) {
      if(event.target.dataset.mode == 'Edit'){
          var tr = event.target.closest('tr')
          toggleRowEditable(tr, true);                         
      }else{           
          var tr = event.target.closest('tr')
          toggleRowEditable(tr, false)
          saveRow(tr, rowIndex) 
      }        
  })
  actionTd.appendChild(editIcon)

  var deleteIcon = document.createElement('span')
  deleteIcon.textContent = '🗑';
  deleteIcon.className ="deleteBtn"
  deleteIcon.addEventListener('click', function () {        
      actionTd.parentElement.remove();
  })
  actionTd.appendChild(deleteIcon);

  return actionTd;
}
//----

// Toggle row editable
function toggleRowEditable(tr, isEditable) {
  var tds = tr.querySelectorAll('td');
  tds.forEach(function (td, index) {
      if (index < tds.length - 1) { 
          if (isEditable) {
              td.setAttribute('contentEditable', true);
          } else {
              td.removeAttribute('contentEditable');
          }
      }
  });

  var actionTd = tds[tds.length - 1];
  var editIcon = actionTd.querySelector('span[data-mode]');
  if (isEditable) {
      editIcon.textContent = 'save';
      editIcon.dataset.mode = 'save';
  } else {
      editIcon.textContent = '✎';
      editIcon.dataset.mode = 'edit';
  }
}

// Save row
function saveRow(tr, rowIndex) {
  var tds = tr.querySelectorAll('td');
  tds.forEach(function (td, index) {
      if (index < tds.length - 1) { 
          var key = Object.keys(fulltableData[0])[index];
          fulltableData[rowIndex][key] = td.textContent;
      }
  });
}

//----
function createTableRow(row, isEditable, rowIndex) {
  var tr = document.createElement('tr')
  Object.values(row).forEach(function (value, index) {
      var td = document.createElement('td')
      td.textContent = value;
      if(isEditable){
          td.setAttribute('contentEditable',true);
      }
      tr.appendChild(td)
  })
  var actionTd = renderAction(isEditable, rowIndex);
  tr.appendChild(actionTd);
  return tr;
}

function renderTbody(fulltableData) { 
  var table = document.querySelector('#dataTable')
  table.appendChild(tbody)
  tbody.innerHTML = "";

  var start = (currentPage - 1) * itemsPerPage;
  var end = start + itemsPerPage;
  var paginatedData = fulltableData.slice(start, end);

  paginatedData.forEach(function (row, index){
      var tr = createTableRow(row)
      tbody.appendChild(tr)        
  })
}
function renderTable(fulltableData) {
  renderTableHeader(fulltableData);  
  updateTableAndPagination(fulltableData);
}


// pagination
function renderPagination(fulltableData){
  var paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = "";

  for( var i = 1; i <= totalPages; i++){
      var pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = 'page-btn';
      if(i === currentPage){
          pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', function(event){
          currentPage = Number(event.target.textContent); 
          updateTableAndPagination(fulltableData);
      })
      paginationContainer.appendChild(pageButton);
  }
}
function updateTableAndPagination(fulltableData){
  renderTbody(fulltableData);
  renderPagination(fulltableData); 

}
// filter search
function filterTable(searchText) {
  var filterData = fulltableData.filter(function (row) {
      return Object.values(row).some(function (value) {
          return value.includes(searchText);
      })
  })
  console.log(filterData); 
  var tableBody = document.querySelector('.tbody')
  console.log(tableBody, 'hello')
  tableBody.innerHTML = "";
  renderTbody(filterData);
}
renderTable(fulltableData);
document.querySelector('#searchInput').addEventListener('input', function (event) {
  console.log(event.target.value);
  filterTable(event.target.value);
})

function sortData(event) {
  var key = event.target.dataset.key;
  var order = event.target.dataset.order;
  // toggles 
  if (order == 'asc') {
      event.target.dataset.order = 'dsc';
  } else {
      event.target.dataset.order = 'asc';
  }
  // sort the data
  var sortedData = fulltableData.sort(function (a, b) {
      if (a[key] > b[key]) {
          if (order == 'asc') {
              return 1;
          } else {
              return -1;
          };
      }
      else {
          if (order == 'asc') {
              return -1;

          } else {
              return 1;
          };
      }
  })
  renderTbody(sortedData); 
}

// add new
function addNewRow(){
  var emptyRow = {};
  Object.keys(fulltableData[0]).forEach(function(key,index){
      emptyRow[key] = '';
  })
  console.log('emptyRow',emptyRow);
  var tr = createTableRow(emptyRow);
  document.querySelector('tbody').appendChild(tr);
}
document.querySelector('#addNewButton').addEventListener('click',function(event){
  addNewRow();
}) 

