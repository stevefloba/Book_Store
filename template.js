let booksRendered = 0;
const booksPerLoad = 3;

function renderBooks(bookArray, append = false) {
    const container = document.getElementById("book-list");
    const template = document.getElementById("book-template");

    if (!append) container.innerHTML = "";

    const slice = bookArray.slice(booksRendered, booksRendered + booksPerLoad);
    slice.forEach((book, index) => {
        const clone = template.content.cloneNode(true);
        setupBookCard(clone, book);
        container.appendChild(clone);
    });

    booksRendered += slice.length;
    toggleLoadMore(bookArray.length);
}

function setupBookCard(clone, book) {
    clone.querySelector(".book-title").textContent = book.name;
    clone.querySelector(".book-author").textContent = "by " + book.author;
    clone.querySelector(".book-price").textContent = book.price.toFixed(2) + " €";

    // Likes
    const likeButton = clone.querySelector(".like-btn");
    const likeCountElement = clone.querySelector(".like-count");
    likeCountElement.textContent = book.likes;
    if (book.liked) likeButton.classList.add("liked");
    likeButton.addEventListener("click", () => toggleLike(book, likeButton, likeCountElement));

    // Favoriten
    const favoriteButton = clone.querySelector(".fav-btn");
    if (book.favorite) favoriteButton.classList.add("favorited");
    favoriteButton.addEventListener("click", () => toggleFavorite(book, favoriteButton));

    // Kommentare
    const commentsContainer = clone.querySelector(".comments");
    renderComments(commentsContainer, book.comments);

    const commentForm = clone.querySelector(".comment-form");
    commentForm.addEventListener("submit", event => {
        event.preventDefault();
        addComment(book, commentForm, commentsContainer);
    });
}

function renderComments(container, comments) {
    container.innerHTML = "";
    comments.forEach(comment => {
        const commentParagraph = document.createElement("p");
        commentParagraph.textContent = `${comment.name}: ${comment.comment}`;
        container.appendChild(commentParagraph);
    });
}

function renderFavorites() {
    const favoritesContainer = document.getElementById("favorite-list");
    favoritesContainer.innerHTML = "";

    books.filter(book => book.favorite).forEach(favoriteBook => {
        const favoriteItem = document.createElement("div");
        favoriteItem.textContent = `${favoriteBook.name} (${favoriteBook.author})`;
        favoritesContainer.appendChild(favoriteItem);
    });
}

function toggleLoadMore(total) {
    const btn = document.getElementById("load-more");
    btn.style.display = booksRendered < total ? "block" : "none";
}