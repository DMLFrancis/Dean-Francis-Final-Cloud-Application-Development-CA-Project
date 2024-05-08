//script.js
//Load articles when page is loaded
window.onload = loadData;

//   scroll to top of  page
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

//load articles from server
function loadData() {
  axios.get("http://localhost:4000/articles", { headers: { Accept: "application/json" } })
    .then(response => {
      articles = response.data;
      displayArticles();
    })
    .catch(error => {
      console.error("Error fetching articles:", error);
    });
}

//display articles
function displayArticles() {
  const articlesContainer = document.getElementById('articles');
  articlesContainer.innerHTML = '';

  articles.forEach(article => {
    if (document.getElementById('publishedFilter').checked && !article.published) {
      return;
    }

    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');
    articleDiv.classList.add(`article-${article.id}`);

    const articleContent = `<strong>${article.title}</strong><br>
                            <button class="btn btn-primary mt-2 mr-2" onclick="toggleDetails(${article.id})">View Details</button>`;
    articleDiv.innerHTML = articleContent;

    articlesContainer.appendChild(articleDiv);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    detailsDiv.classList.add(`details-${article.id}`);
    detailsDiv.style.display = 'none';
    const detailsContent = `<p><strong>Title:</strong> ${article.title}</p>
                            <p><strong>Body:</strong> ${article.body}</p>
                            <p><strong>Published:</strong> ${article.published ? "Yes" : "No"}</p>
                            <button class="btn btn-warning mr-2" onclick="toggleEdit(${article.id})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteArticle(${article.id})">Delete</button><br><br>`;
    detailsDiv.innerHTML = detailsContent;

    const editDiv = document.createElement('div');
    editDiv.classList.add('edit');
    editDiv.classList.add(`edit-${article.id}`);
    editDiv.style.display = 'none';
    const editContent = `<input type="text" class="form-control mb-2" id="editTitle-${article.id}" value="${article.title}">
                         <textarea class="form-control mb-2" id="editBody-${article.id}">${article.body}</textarea>
                         <div class="form-check mb-2">
                           <input type="checkbox" class="form-check-input" ${article.published ? "checked" : ""} id="editPublished-${article.id}">
                           <label class="form-check-label" for="editPublished-${article.id}">Published</label>
                         </div>
                         <button class="btn btn-success mr-2" onclick="saveEdit(${article.id})">Save</button>
                         <button class="btn btn-secondary" onclick="toggleEdit(${article.id})">Cancel</button><br><br>`;
    editDiv.innerHTML = editContent;

    detailsDiv.appendChild(editDiv);

    articlesContainer.appendChild(detailsDiv);
  });
}

//toggle details
function toggleDetails(id) {
  const detailsDiv = document.querySelector(`.details-${id}`);
  detailsDiv.style.display = detailsDiv.style.display === 'block' ? 'none' : 'block';
}

// toggle edit
function toggleEdit(id) {
  const editDiv = document.querySelector(`.edit-${id}`);
  editDiv.style.display = editDiv.style.display === 'block' ? 'none' : 'block';
}

//validate and add new article
function validateAndAddArticle() {
  const newTitle = document.getElementById('newTitle').value;
  const newBody = document.getElementById('newBody').value;

  if (newTitle.trim() === "" || newBody.trim() === "") {
    alert("Title and Body fields are required!");
    return;
  }

  const newPublished = document.getElementById('newPublished').checked;

  axios.post("http://localhost:4000/articles", {
      title: newTitle,
      body: newBody,
      published: newPublished
    }, { headers: { Accept: "application/json" } })
    .then(response => {
      loadData();
      document.getElementById('newTitle').value = '';
      document.getElementById('newBody').value = '';
      document.getElementById('newPublished').checked = false;
    })
    .catch(error => {
      console.error("Error adding article:", error);
    });
}

//save edits
function saveEdit(id) {
  const editTitle = document.getElementById(`editTitle-${id}`).value;
  const editBody = document.getElementById(`editBody-${id}`).value;
  const editPublished = document.getElementById(`editPublished-${id}`).checked;

  axios.put(`http://localhost:4000/articles/${id}`, {
      title: editTitle,
      body: editBody,
      published: editPublished
    }, { headers: { Accept: "application/json" } })
    .then(response => {
      loadData();
    })
    .catch(error => {
      console.error("Error editing article:", error);
    });
}

//delete article
function deleteArticle(id) {
  axios.delete(`http://localhost:4000/articles/${id}`, { headers: { Accept: "application/json" } })
    .then(response => {
      loadData();
    })
    .catch(error => {
      console.error("Error deleting article:", error);
    });
}

//filter articles
function filterArticles() {
  loadData();
}
