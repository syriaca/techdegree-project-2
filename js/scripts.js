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
    var paginationTarget =  document.getElementById('paginationOutputSection'),
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
            getItemToShow(itemListStart, itemListEnd);
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
    printHtml(searchbarHtml, searchbarTarget);

    var searchBtn = document.getElementById('searchBtn'),
        searchInput = document.getElementById('searchInput');
    var switchBool = true;

    searchBtn.addEventListener("click", function(event){
        var array = [],
            searchInputValue = document.getElementById('searchInput').value;

        for(var i = 0; i < itemListArray.length; i += 1) {
            var obj = {};
            obj['name'] = itemListArray[i].querySelector('h3').innerText,
            obj['email'] = itemListArray[i].querySelector('.email').innerText               
            array.push(obj);
        }

        if(searchInputValue != '') {
            console.log('not empty');
        } else {
            console.log('empty');
        }
    });
}

// Function to get the item to hide
function getItemToHide() {
    var visibleItems = document.querySelectorAll('.student-item:not([style="display: none;"])');
    for(var i = 0; i < visibleItems.length; i += 1) {
        visibleItems[i].style.display = 'none';
    }
}

// Function to get the item to show
function getItemToShow (start, end) {
    slicedArray = itemListArray.slice(start, end);
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



