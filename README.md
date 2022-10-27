# Used technologies
- Client
    - Angular 14.2.0
    - JS/TS
    - CSS/SCSS
    - HTML
- Backend
    - C#
    - .NET 6.0
    - REST API
    - Caching

# Setting up the solution (debug)
- Client
    - Make sure you have node version 18.8.0
    - Open the folder "client\Solidabis-2022-client"
    - Execute command "npm install"
    - Execute command "ng serve"
    - Browse to http://localhost:4200/
- Backend
    - Make sure you have correct .NET version (.NET 6) and runtime installed
    - Open the solution in Visual Studio
    - Start the debug

# Description
The solution uses food data from Fineli API. The selected food entries from the API were not selected carefully, so they might not be ideal (e.g. bunch of carrots vs one leaf of cabbage), but it showcases the functionality well enough.  
  
The client fetches the food data from the backend at the start of the application. If something happens during this, the user is informed to refresh the browser. On the backend, the configured fighter data is in appsettings.json. That data includes the Fineli API ids of the food items, and the data is then fetched from Fineli API. There's caching implemented for this. The backend also processes the API data to the food stats and gets the base64 encoded image of the food, which is then shown in the UI.  
  
The client consists of couple of different main components: navigation bar, introduction texts, character selection, battle. The app has a translation support, currently with two languages and the selection is remembered in local storage. After the user chooses a character and confirms their selection, the battle can start. The enemy is randomized and can be randomly re-selected.  
  
The battle logic happens inside an interval. During each update loop, the attack bar is updated. If the operation "time since the start of battle" % "character's delay" is zero, the character attacks. This is shown with animation, and the health bar decreases while attack bar resets to zero. The logs are shown always when attack happens, and the screen scrolls to show the newest message.  
  
The app was developed with browser window width being > 850px. Below this the app doesn't look good, since the design wasn't made to support mobile, and isn't therefore that responsive.