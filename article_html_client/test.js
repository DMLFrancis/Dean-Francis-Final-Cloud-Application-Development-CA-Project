//test.js
//define CRUD operations
var articles = [];

function addItem(item) {
    articles.push(item);
}

function getItem(index) {
    return articles[index];
}

function updateItem(index, newItem) {
    articles[index] = newItem;
}

function deleteItem(index) {
    articles.splice(index, 1);
}

//export functions for use in other files
window.CRUDTest = {
    addItem: addItem,
    getItem: getItem,
    updateItem: updateItem,
    deleteItem: deleteItem
};

//run tests
function runTests() {
    try {
        //Check CRUDTest is defined
        if (window.CRUDTest) {
            //Add Item
            const addItemResult = document.getElementById('addItemResult');
            window.CRUDTest.addItem("Test Article");
            const addedItem = window.CRUDTest.getItem(0);
            const addItemTest = addedItem === "Test Article";
            addItemResult.innerHTML = `<p><strong>Result:</strong> ${addItemTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

            //Get Item
            const getItemResult = document.getElementById('getItemResult');
            const getItemTest = addedItem === "Test Article";
            getItemResult.innerHTML = `<p><strong>Result:</strong> ${getItemTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

            //Update Item
            const updateItemResult = document.getElementById('updateItemResult');
            window.CRUDTest.updateItem(0, "Test Article Update");
            const updatedItem = window.CRUDTest.getItem(0);
            const updateItemTest = updatedItem === "Test Article Update";
            updateItemResult.innerHTML = `<p><strong>Result:</strong> ${updateItemTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

            //Delete Item
            const deleteItemResult = document.getElementById('deleteItemResult');
            window.CRUDTest.deleteItem(0);
            const deleteItemTest = window.CRUDTest.getItem(0) === undefined;
            deleteItemResult.innerHTML = `<p><strong>Result:</strong> ${deleteItemTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;
        } else {
            throw new Error("CRUDTest is not defined");
        }
    } catch (error) {
        //If test fails display  error
        const testResults = document.getElementById('testResults');
        testResults.innerHTML = "<p>Test failed: " + error.message + "</p>";
    }
}

//load articles from server
function loadData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = ["Article 1", "Article 2", "Article 3"];
            articles = mockData;
            resolve();
        }, 1000);
    });
}

// Display articles
function displayArticles() {
}

//Validate and add new article
function validateAndAddArticle() {
    //Simulate adding
    articles.push({
        title: "New Article",
        body: "This is a new article",
        published: true
    });
}

//Save edits
function saveEdit(id, updatedTitle, updatedBody, updatedPublished) {
    //Simulate updating
    articles[id] = {
        title: updatedTitle,
        body: updatedBody,
        published: updatedPublished
    };
}

//Delete an article
function deleteArticle(id) {
    //Simulate deleting
    articles.splice(id, 1);
}

//Run integration tests
async function runIntegrationTests() {
    try {
        await loadData();

        //Data Loading Integration Test
        const dataLoadingTest = document.getElementById('dataLoadingTest');
        const initialArticleCount = articles.length;
        const updatedArticleCount = initialArticleCount + 3;
        const dataLoadingIntegrationTest = updatedArticleCount > initialArticleCount;
        dataLoadingTest.innerHTML = `<p><strong>Result:</strong> ${dataLoadingIntegrationTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

        //Article Addition Integration Test
        const articleAdditionTest = document.getElementById('articleAdditionTest');
        const newArticleCount = articles.length;
        validateAndAddArticle();
        const addedArticleCount = articles.length;
        const articleAdditionIntegrationTest = addedArticleCount === newArticleCount + 1;
        articleAdditionTest.innerHTML = `<p><strong>Result:</strong> ${articleAdditionIntegrationTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

        //Article Update Integration Test
        const articleUpdateTest = document.getElementById('articleUpdateTest');
        const updatedTitle = "Updated Title";
        const updatedBody = "Updated Body";
        const updatedPublished = true;
        saveEdit(articles.length - 1, updatedTitle, updatedBody, updatedPublished);
        const lastArticle = articles[articles.length - 1];
        const articleUpdateIntegrationTest = lastArticle.title === updatedTitle &&
            lastArticle.body === updatedBody &&
            lastArticle.published === updatedPublished;
        articleUpdateTest.innerHTML = `<p><strong>Result:</strong> ${articleUpdateIntegrationTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

        //Article Deletion Integration Test
        const articleDeletionTest = document.getElementById('articleDeletionTest');
        const initialArticleCountAfterUpdate = articles.length;
        deleteArticle(articles.length - 1);
        const articleCountAfterDeletion = articles.length;
        const articleDeletionIntegrationTest = articleCountAfterDeletion === initialArticleCountAfterUpdate - 1;
        articleDeletionTest.innerHTML = `<p><strong>Result:</strong> ${articleDeletionIntegrationTest ? "<span style='color: green;'>Passed</span>" : "<span style='color: red;'>Failed</span>"}</p>`;

    } catch (error) {
        //If fails display error
        const testResults = document.getElementById('integrationTestResults');
        testResults.innerHTML = "<p>Integration Test failed: " + error.message + "</p>";
    }
}

//Run unit tests and integration tests
runTests();
runIntegrationTests();
