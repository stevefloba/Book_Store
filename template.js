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
    const likeBtn = clone.querySelector(".like-btn");
    const likeCount = clone.querySelector(".like-count");
    likeCount.textContent = book.likes;
    if (book.liked) likeBtn.classList.add("liked");
    likeBtn.addEventListener("click", () => toggleLike(book, likeBtn, likeCount));

    // Favoriten
    const favBtn = clone.querySelector(".fav-btn");
    if (book.favorite) favBtn.classList.add("favorited");
    favBtn.addEventListener("click", () => toggleFavorite(book, favBtn));

    // Kommentare
    const commentsContainer = clone.querySelector(".comments");
    renderComments(commentsContainer, book.comments);

    const form = clone.querySelector(".comment-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        addComment(book, form, commentsContainer);
    });
}

function renderComments(container, comments) {
    container.innerHTML = "";
    comments.forEach(c => {
        const p = document.createElement("p");
        p.textContent = `${c.name}: ${c.comment}`;
        container.appendChild(p);
    });
}

function renderFavorites() {
    const container = document.getElementById("favorite-list");
    container.innerHTML = "";
    books.filter(b => b.favorite).forEach(fav => {
        const div = document.createElement("div");
        div.textContent = `${fav.name} (${fav.author})`;
        container.appendChild(div);
    });
}

function toggleLoadMore(total) {
    const btn = document.getElementById("load-more");
    btn.style.display = booksRendered < total ? "block" : "none";
}