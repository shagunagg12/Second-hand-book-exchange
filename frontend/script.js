// --- Global Variables --- //
let users = JSON.parse(localStorage.getItem('users')) || [];
let books = JSON.parse(localStorage.getItem('books')) || [];
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// --- Helper Function to Save Data to LocalStorage --- //
function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// --- Create Account Page --- //
// Form Submission for creating a new account
document.getElementById('create-account-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    
    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    // Save user details
    users.push({ username, password });
    saveToLocalStorage();
    
    // Redirect to login page after successful account creation
    alert('Account created successfully!');
    window.location.href = 'login.html';
});

// --- Login Page --- //
// Form Submission for login
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        alert('Invalid credentials!');
        return;
    }

    // Save user login status
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // Redirect to home page or dashboard
    window.location.href = 'index.html';
});

// --- Sell Book Page --- //
// Form submission for listing a book
document.getElementById('sell-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookName = document.getElementById('book-name').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;
    const sellerName = document.getElementById('seller-name').value;
    const phone = document.getElementById('phone').value;
    
    if (!bookName || !author || !price || !sellerName || !phone) {
        alert('Please fill in all fields!');
        return;
    }

    // Add book to the books array
    const newBook = { bookName, author, price, sellerName, phone };
    books.push(newBook);
    saveToLocalStorage();

    // Display the book on the page
    displayBooks();

    // Clear the form after submission
    document.getElementById('sell-form').reset();
});

// --- Display Listed Books on Sell Page --- //
function displayBooks() {
    const bookList = document.querySelector('.book.list');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <h3>${book.bookName}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: ₹${book.price}</p>
            <p>Seller: ${book.sellerName}</p>
            <p>Contact: ${book.phone}</p>
            <button class="add-to-wishlist" data-index="${index}">Add to Wishlist</button>
        `;
        bookList.appendChild(bookItem);
    });

    // Add event listeners for adding books to wishlist
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const bookIndex = this.getAttribute('data-index');
            addToWishlist(books[bookIndex]);
        });
    });
}

// --- Add Book to Wishlist --- //
function addToWishlist(book) {
    if (!wishlist.some(b => b.bookName === book.bookName)) {
        wishlist.push(book);
        saveToLocalStorage();
        alert(`${book.bookName} added to wishlist!`);
    } else {
        alert(`${book.bookName} is already in your wishlist.`);
    }
}

// --- Buy Book Page --- //
// Display books available for purchase on the Buy Page
if (document.querySelector('.book-list')) {
    displayBooks();
}

// --- Wishlist Page --- //
// Display Wishlist Items
if (document.querySelector('.wishlist-list')) {
    const wishlistList = document.querySelector('.wishlist-list');
    wishlistList.innerHTML = '';
    wishlist.forEach((book) => {
        const wishlistItem = document.createElement('div');
        wishlistItem.classList.add('wishlist-item');
        wishlistItem.innerHTML = `
            <h3>${book.bookName}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: ₹${book.price}</p>
            <button class="remove-from-wishlist">Remove</button>
        `;
        wishlistList.appendChild(wishlistItem);
    });

    // Event listener to remove book from wishlist
    document.querySelectorAll('.remove-from-wishlist').forEach((button, index) => {
        button.addEventListener('click', function() {
            wishlist.splice(index, 1);
            saveToLocalStorage();
            alert('Book removed from wishlist!');
            window.location.reload();
        });
    });
}

// --- Review Page --- //
// Submit review
document.getElementById('review-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review-text').value;

    if (!reviewerName || !reviewText) {
        alert('Please enter your name and review.');
        return;
    }

    const review = { reviewerName, reviewText };
    reviews.push(review);
    saveToLocalStorage();

    // Clear the form
    document.getElementById('review-form').reset();

    // Display the reviews
    displayReviews();
});

// Display Reviews on Reviews Page
function displayReviews() {
    const reviewsList = document.querySelector('.reviews-list');
    reviewsList.innerHTML = '';
    reviews.forEach((review) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <p><strong>${review.reviewerName}</strong> says:</p>
            <p>${review.reviewText}</p>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

// Display Reviews on load
if (document.querySelector('.reviews-list')) {
    displayReviews();
}
