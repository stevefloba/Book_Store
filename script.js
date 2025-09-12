document.addEventListener("DOMContentLoaded", () => {
  assignIds();
  loadState();
  renderBooks(books);
  renderFavorites();

  document.getElementById("load-more")
    .addEventListener("click", loadMoreBooks);
});

function toggleLike(book, btn, countEl) {
  book.liked = !book.liked;
  book.likes += book.liked ? 1 : -1;
  btn.classList.toggle("liked");
  countEl.textContent = book.likes;
  saveState();
}

function toggleFavorite(book, btn) {
  book.favorite = !book.favorite;
  btn.classList.toggle("favorited");
  renderFavorites();
  saveState();
}

function addComment(book, form, container) {
  const name = form.name.value.trim();
  const comment = form.comment.value.trim();
  if (!name || !comment) return;

  const newComment = { name, comment };
  book.comments.push(newComment);
  renderComments(container, book.comments);
  form.reset();
  saveState();
}

function loadMoreBooks() {
  renderBooks(books, true);
}

function saveState() {
  localStorage.setItem("booksState", JSON.stringify(books));
}

function loadState() {
  const storedData = localStorage.getItem("booksState");
  if (!storedData) return;

  const savedBooks = JSON.parse(storedData);
  const savedBooksMap = new Map(savedBooks.map(savedBook => [savedBook.id, savedBook])); // wandelt Buch in Tupel (id, objekt)

  books = books.map(originalBook => {
    if (savedBooksMap.has(originalBook.id)) {
      return { ...originalBook, ...savedBooksMap.get(originalBook.id) }; // nimm alle Eigenschaften von originalBook (Kurzform von if ... else)
    }
    return originalBook;
  });
}

function assignIds() {
  books.forEach((book, index) => {
    if (!book.id) book.id = index + 1;
  });
}