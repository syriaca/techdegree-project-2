var itemList = document.querySelectorAll('.student-item'),
    itemListArray = [].slice.call(itemList),
    totalItemInList = itemListArray.length,
    totalItemByPage = 10,
    totalPaginationLinks = Math.ceil(totalItemInList / totalItemByPage),    
    slicedArray = [];

    // Function to print Html
function printHtml(htmlMarkup, output) {
    output.innerHTML = htmlMarkup;
}

// Function to hide items on first load
function hideListItems(totalToHide) {
    slicedArray = itemListArray.slice(totalToHide, totalItemInList);
    for(var i = 0; i < slicedArray.length; i += 1) {
        slicedArray[i].style.display = 'none';
    }
}

// Function to create pagination links
function addPagination (numberOfPageItem) {
    var paginationTarget = document.getElementById('paginationOutputSection'),
        paginationHtml = '';    

    paginationHtml += '<div class="pagination"><ul>';
        for (var i = 1; i <= numberOfPageItem; i += 1) {
            paginationHtml += '<li><a class="pagination-link" href="#">'+i+'</a>';
        }
    paginationHtml += '</div></ul>';
    printHtml(paginationHtml, paginationTarget);

    var paginationLink = document.querySelectorAll('.pagination-link');

    // Event listener to dynamically hide students & create pagination links
    for (var i = 0; i < paginationLink.length;  i+= 1) { 
        paginationLink[i].addEventListener("click", function(event){
            // Prevent defautl behaviour on click
            event.preventDefault();
            var pageNumber = parseInt(event.target.innerText),
                itemListStart = pageNumber * totalItemByPage - totalItemByPage,
                itemListEnd = itemListStart + totalItemByPage;            
            
            // We have a different behaviour if the clicked button is the last
            if (pageNumber === totalItemByPage) {
                itemListStart = pageNumber * totalItemByPage;
                itemListEnd = itemListStart + totalItemByPage + totalItemByPage;
            }
            // We get & hide visible item
            getItemToHide();
            
            // We get and hide next XXX items
            getItemToShow(itemListArray, itemListStart, itemListEnd);
        });
    }
}

// Function to create searchbar
function addSearch () {
    var searchbarTarget =  document.getElementById('searchbarOutput');
    var searchbarHtml = '';

    searchbarHtml += '<div class="student-search">';
    searchbarHtml += '<input id="searchInput" placeholder="Search for students...">';
    searchbarHtml += '<button id="searchBtn">Search</button>';
    searchbarHtml += '</div>';

    // We call the function to print the searchbar HTML
    printHtml(searchbarHtml, searchbarTarget);

    var searchBtn = document.getElementById('searchBtn'),
        searchInput = document.getElementById('searchInput');

    // Watch click on search button
    searchBtn.addEventListener("click", function(){
        var array = [],
            searchInputValue = document.getElementById('searchInput').value,
            studentList = document.getElementById('studentList'),
            noSearchResultMessage = document.getElementById('noSearchResultMessage'),
            paginationOutputSection = document.getElementById('paginationOutputSection');

        // We create an object and set name, email, element and we push it to an array
        for(var i = 0; i < itemListArray.length; i += 1) {
            var obj = {};
            obj['name'] = itemListArray[i].querySelector('h3').innerText,
            obj['email'] = itemListArray[i].querySelector('.email').innerText,
            obj['element'] = itemListArray[i].querySelector('.email').parentElement.parentElement;
            array.push(obj);
        }
        
        // We check seatch input emptiness
        if(searchInputValue != '') {
            // If not empty we create an array and push the search results in it
            var arrayMatchSearch = [];
            for(var i = 0; i < array.length; i += 1) {
                if(array[i].name.includes(searchInputValue) || array[i].email.includes(searchInputValue)) {
                    arrayMatchSearch.push(array[i].element);
                }
            }

            // We hide all items
            getItemToHide();

            // We check for the pagination being displayed or not according to the result array length (i do not achived to make pagination dynamic according to those results... :/)
            if(arrayMatchSearch.length >= totalItemByPage) {
                paginationOutputSection.style.display = 'block';
            } else {
                paginationOutputSection.style.display = 'none';                
            }
           
             // We check if the result matches array is empty
            if(arrayMatchSearch != '') {
                // If not empty, we display the items according to the search matching array
                noSearchResultMessage.style.display = 'none';
                studentList.style.display = 'block';
                getItemToShow(arrayMatchSearch);
            } else {
                // Else: we show a search error message
                studentList.style.display = 'none';
                noSearchResultMessage.style.display = 'block';
                noSearchResultMessage.innerHTML = '<p>No student matches your search, try again !</p>';
            }
        }
    });
}

// Function to get the item to hide
function getItemToHide() {
        var visibleItems;
        visibleItems = document.querySelectorAll('.student-item:not([style="display: none;"])');
        for(var i = 0; i < visibleItems.length; i += 1) {
            visibleItems[i].style.display = 'none';
        }
}

// Function to get the item to show
function getItemToShow (array, start, end) {
    slicedArray = array.slice(start, end);
    for(var i = 0; i < slicedArray.length; i += 1) {
        slicedArray[i].style.display = 'block';
    }
}

// Event listener to dynamically hide students & create pagination links
window.addEventListener('load', function(event){
    // We hide list items 
    hideListItems(totalItemByPage);
    // We create and add pagination links
    addPagination(totalPaginationLinks);
    // We create and add search bar
    addSearch ();
});



