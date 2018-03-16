var itemList = document.querySelectorAll('.student-item'),
    itemListArray = [].slice.call(itemList),
    totalItemInList = itemListArray.length,
    totalItemByPage = 10,
    totalPaginationLinks = Math.ceil(totalItemInList / totalItemByPage),
    paginationHtml = '',
    slicedArray = [],
    paginationSection =  document.getElementById('paginationOutputSection');

// Function to hide items on first load
function hideListItems(totalToHide) {
    slicedArray = itemListArray.slice(totalToHide, totalItemInList);
    for(var i = 0; i < slicedArray.length; i += 1) {
        slicedArray[i].style.display = 'none';
    }
}

// Function to create pagination links
function createPaginationLinks (numberOfPageItem) {    
    paginationHtml += '<div class="pagination"><ul>';
        for (var i = 1; i <= numberOfPageItem; i += 1) {
            paginationHtml += '<li><a class="pagination-link" href="#">'+i+'</a>';
        }
    paginationHtml += '</div></ul>';
    paginationSection.innerHTML = paginationHtml;

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
    createPaginationLinks(totalPaginationLinks);
});



