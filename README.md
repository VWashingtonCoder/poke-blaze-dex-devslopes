# Poke Blaze Dex
Created with CodeSandbox in association with DevSlopes project.

Using the pokeAPI, I built out a version of my own pokedex for this project. It utilizes fetch to gather data from the api to build out the search list section in the html. It also was utilized to poulate the information in the infoModule card. 

The default view is of all current pokemon in the pokeApi database. This list can initially be filtered utilizng the menu-search options presented in a drop down. There are also two buttons in the menu to display the favorites list as well as reset back to the default view. 

When one of the pokemon name buttons is clicked, it opens the infoModule which contains information about the pokeon including types, weight, height, abilities, and moveset. There is also an 'add to favorites' button on the infoModule to add pokemon to favorites list. 

This website was created for mobile view and responsive rules were added in for bigger screens such as tablets, laptops, and desktops.

## DevSlopes Project Summmary
You are going to create your own website that fetches and displays real data from an API. A user can add and remove these items from a "favorites" list and has the ability to sort the data.

### 🛠 Requirements:
1) Fetch data from an API (resource provided below) and display up to 30 items from that request in your HTML.
    - In your HTML you will display the array of data you get back (i.e. if it was an array of movies, you would display the list of movies).
    - Display a minimum of 3 values from the object in the array of data you get back for each item. (i.e. movie name, movie description, cover image).

2) HTML for each item should be created programmatically. This means the html is created  based on the data received from the API - if 10 items are fetched, 10 blocks of HTML are created to display the data, etc.

3) Build a function to add selected items from the array of data to a "favorites" list. i.e.:
    - You fetch a list of 30 movies from an API and display it in a "collection" in your HTML.
    - When a user selects an item(s) from the "collection" to add to the "favorites" list, the item(s) are removed from the collection and added to the "favorites" list.

4) Build a function to remove an item from the "favorites" list.
    - When a user removes an item from the "favorites" list, the item is added back to the "collection" of items.
    
5) Build a toggle function that sorts the items in the collection and "favorites" list alphabetically (A-Z) and vice versa (Z-A).

6) You must display the total sum of some piece of data from the list. (i.e. if you had a list of pokemon, you could total the number of common, rare and legendary pokemon in the list). You cannot total the number of items in the array, it must be a value from the data object.

7) The website must be built with pure HTML, CSS and JavaScript (no third party css or js libraries).

9) The items retrieved from the API must be displayed in styled HTML. (i.e. if you were working with the pokeAPI you could display the data in a "card" design with the image, attack, hitpoints, etc).

10) The website must be mobile responsive across desktop, ipad/tablet and mobile phones.

### 💡 Tips:
- Fetching data from an API can take a few milliseconds. This means you cannot create the HTML items from your API data until it is done fetching. This also means you cannot add click events to the HTML items before they're created.
- Flow: Fetch data => build HTML items from data => add click events when HTML is done being built.