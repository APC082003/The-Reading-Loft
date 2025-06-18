// Search functionality for homepage
document.getElementById('search-button').addEventListener('click', function() {
  const searchQuery = document.getElementById('search').value.trim().toLowerCase();

  // If search is empty, show alert (can be improved later for empty state)
  if (!searchQuery) {
    alert('Please enter a search term!');
    return;
  }

  // Navigate to the product page with a query parameter
  window.location.href = `product.html?search=${encodeURIComponent(searchQuery)}`;
});

// If you're on the product page, handle search functionality
if (window.location.pathname === '/product.html') {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get('search');
  
  if (searchQuery) {
    // Call the function to filter products based on the search query
    filterProducts(searchQuery);
  }
}

// Function to filter books based on search query
function filterProducts(query) {
  const allProducts = document.querySelectorAll('.product');  // Get all product elements

  // Convert the query to lowercase for case-insensitive matching
  query = query.toLowerCase();

  let matchFound = false;  // Flag to track if we found a match

  allProducts.forEach(product => {
    const title = product.querySelector('h4').textContent.toLowerCase(); // Book title
    const author = product.querySelector('.author').textContent.toLowerCase(); // Author name
    const price = product.querySelector('.price');  // Get price element (for optional display)

    // If the book title or author matches the search query
    if (title.includes(query) || author.includes(query)) {
      product.style.display = 'block';  // Show the book
      matchFound = true;  // Mark that a match was found
    } else {
      product.style.display = 'none';  // Hide the book
    }
  });

  // If no books match, display a "No results" message
  if (!matchFound) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No books found matching your search.';
    document.querySelector('.genres').appendChild(noResults);  // Add to the genres section
  }
}

// Book data (would normally come from a database in a real app)
const bookData = [
  // Fiction books
  { id: 1, title: "Fiction Book 1", author: "Author 1", price: 9.99, genre: "fiction", image: "assets/images/fiction1.jpeg" },
  { id: 2, title: "Fiction Book 2", author: "Author 2", price: 9.99, genre: "fiction", image: "assets/images/fiction2.jpeg" },
  { id: 3, title: "Fiction Book 3", author: "Author 3", price: 19.99, genre: "fiction", image: "assets/images/fiction3.jpeg" },
  { id: 4, title: "Fiction Book 4", author: "Author 4", price: 11.99, genre: "fiction", image: "assets/images/fiction4.jpeg" },
  { id: 5, title: "Fiction Book 5", author: "Author 5", price: 9.99, genre: "fiction", image: "assets/images/fiction5.jpeg" },
  
  // Non-fiction books
  { id: 6, title: "Non-fiction Book 1", author: "Author 6", price: 5.06, genre: "non-fiction", image: "assets/images/nonfiction1.jpeg" },
  { id: 7, title: "Non-fiction Book 2", author: "Author 7", price: 8.06, genre: "non-fiction", image: "assets/images/nonfiction2.jpeg" },
  { id: 8, title: "Non-fiction Book 3", author: "Author 8", price: 10.06, genre: "non-fiction", image: "assets/images/nonfiction3.jpeg" },
  { id: 9, title: "Non-fiction Book 4", author: "Author 9", price: 15.00, genre: "non-fiction", image: "assets/images/nonfiction4.jpeg" },
  { id: 10, title: "Non-fiction Book 5", author: "Author 10", price: 15.06, genre: "non-fiction", image: "assets/images/nonfiction5.jpeg" },
  
  // Fantasy books
  { id: 11, title: "Fantasy Book 1", author: "Author 11", price: 7.06, genre: "fantasy", image: "assets/images/fantasy1.jpeg" },
  { id: 12, title: "Fantasy Book 2", author: "Author 12", price: 5.06, genre: "fantasy", image: "assets/images/fantasy2.jpeg" },
  { id: 13, title: "Fantasy Book 3", author: "Author 13", price: 15.06, genre: "fantasy", image: "assets/images/fantasy3.jpeg" },
  { id: 14, title: "Fantasy Book 4", author: "Author 14", price: 20.06, genre: "fantasy", image: "assets/images/fantasy4.jpeg" },
  { id: 15, title: "Fantasy Book 5", author: "Author 15", price: 9.06, genre: "fantasy", image: "assets/images/fantasy5.jpeg" },
  
  // Science-fiction books
  { id: 16, title: "Science-fiction Book 1", author: "Author 16", price: 1.06, genre: "science-fiction", image: "assets/images/scifi1.jpeg" },
  { id: 17, title: "Science-fiction Book 2", author: "Author 17", price: 10.00, genre: "science-fiction", image: "assets/images/scifi2.jpeg" },
  { id: 18, title: "Science-fiction Book 3", author: "Author 18", price: 10.00, genre: "science-fiction", image: "assets/images/scifi3.jpeg" },
  { id: 19, title: "Science-fiction Book 4", author: "Author 19", price: 11.00, genre: "science-fiction", image: "assets/images/scifi4.jpeg" },
  { id: 20, title: "Science-fiction Book 5", author: "Author 20", price: 12.00, genre: "science-fiction", image: "assets/images/scifi5.jpeg" },
  
  // Mystery books
  { id: 21, title: "Mystery Book 1", author: "Author 21", price: 5.00, genre: "mystery", image: "assets/images/mystery1.jpeg" },
  { id: 22, title: "Mystery Book 2", author: "Author 22", price: 30.00, genre: "mystery", image: "assets/images/mystery2.jpeg" },
  { id: 23, title: "Mystery Book 3", author: "Author 23", price: 20.00, genre: "mystery", image: "assets/images/mystery3.jpeg" },
  { id: 24, title: "Mystery Book 4", author: "Author 24", price: 15.00, genre: "mystery", image: "assets/images/mystery4.jpeg" },
  { id: 25, title: "Mystery Book 5", author: "Author 25", price: 11.00, genre: "mystery", image: "assets/images/mystery5.jpeg" }
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on search page
  if (window.location.pathname.includes('search.html')) {
    showSearchResults();
  }
  
  // Setup search button if it exists
  const searchBtn = document.getElementById('search-button');
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
});

function performSearch() {
  const searchTerm = document.getElementById('search').value.trim().toLowerCase();
  
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }

  // Filter books
  const results = bookData.filter(book => 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );

  // Store results and redirect
  sessionStorage.setItem('lastSearchResults', JSON.stringify(results));
  window.location.href = 'search.html';
}

function showSearchResults() {
  const container = document.getElementById('results-container');
  if (!container) return;

  // Get stored results
  const storedResults = sessionStorage.getItem('lastSearchResults');
  if (!storedResults) {
    container.innerHTML = '<p>No search performed. Please search from the homepage.</p>';
    return;
  }

  const results = JSON.parse(storedResults);
  
  if (results.length === 0) {
    container.innerHTML = '<p>No books found matching your search.</p>';
    return;
  }

  // Display results
  container.innerHTML = results.map(book => `
    <div class="book">
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p class="author">By ${book.author}</p>
      <p class="price">$${book.price.toFixed(2)}</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `).join('');
}

