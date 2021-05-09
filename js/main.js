import Fuse from '../lib/fuse/fuse.esm.min.js'

let index = null;
let fuse = null;

SetupSearchButtons();
SetupSearchForm();
SetupHistory();

fetch('index.json')
  .then(response => response.json())
  .then(data => {
    index = data;

    fuse = new Fuse(index, {
      includeScore: true, keys: ['keywords', 'title', 'description']
    });

    loadFirstPage();
  });

function SetupHistory() {
  window.addEventListener('popstate', function(e) {
    console.log("popstate", e);
    loadPage(e.state.file);
  });
}

/**
 * Connects logic to show/hide the search page in response to buttons
 */
function SetupSearchButtons() {
  ById('search').style.display = 'none';

  ById('content-open-search').addEventListener('click', function(e){
    e.preventDefault();
    ById('search').style.display = 'block';
    ById('search-term').focus();
  });

  ById('search-close').addEventListener('click', function(e){
    e.preventDefault();
    ById('search').style.display = 'none';
  });
}

/**
 * Wires up search box & search results
 */
function SetupSearchForm() {

  let timerId = 0;

  ById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
  });

  ById('search-term').addEventListener('input', function(e) {
    clearInterval(timerId);
    timerId = setInterval(function(){
      clearInterval(timerId);

      const output = document.getElementById('search-results');
      output.innerHTML = "";
      fuse.search(e.target.value).forEach(function(e) {

        const f = document.createDocumentFragment();
        const link = document.createElement("a");
        const title = document.createElement("h3");
        const desc = document.createElement("p");

        link.href = encodeURI("?f=" + e.item.file);

        title.innerText = e.item.title;
        desc.innerText = e.item.description;

        link.appendChild(title);
        link.appendChild(desc);

        f.appendChild(link);
        output.appendChild(f);
      });
    }, 200);
  });

  ById('search-results').addEventListener('click', function(e){
    e.preventDefault();

    const url = new URLSearchParams(e.target.closest("#search-results a").search);
    loadPage(url.get("f"));
    ById('search').style.display = 'none';
  });
}

/**
 * Loads a page.
 *
 * @param {string} name - name of the page to load
 * @returns {Promise} - resolves/rejects when page loaded/fails
 */
function loadPage(name) {

  return new Promise((resolve, reject) => {

    // Lookup page in index - we only load pages that have a valid entry
    console.log("loadPage("+name+");");

    const page = index.find(p => p.file == name);
    if (page) {

      fetch('notes/' + name)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        else {
          reject({ message: "Page request failed", response: response });
        }
      })
      .then(data => {

        const container = document.getElementById('content-page-container');
        container.innerHTML = "";
        container.innerHTML = data;

        document.title = "James' Simple Notes - " + page.title;
        history.pushState({ file: name }, document.title, encodeURI("?f=" + name));

        resolve();
      });
    }
    else {
      // No page with name found
      reject({ message: "Page named " + name + " not found" });
    }

  });

}

function loadFirstPage() {
  const url = new URLSearchParams(window.location.search);

  if (url.get('f')) {
    loadPage(url.get('f'));
  }
  else {
    document.getElementById('search').style.display = 'block';
  }
}

function ById(idString) {
  return document.getElementById(idString);
}