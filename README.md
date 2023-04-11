# <Currency Exchange>

## Description

This project seeks to provide users with a one-stop resource to see both the current exchange rate for their cash and locate a bank, exchange house, or credit union that can allow them to complete the exchange. 

Though the process of looking up an exchange rate and searching a bank location is not necessarily difficult with today's fast and convenient internet tools, our site, which utilizes a clutter-free, polished interface, allows the user to focus on their task without pestering ads, the need for an account, or the distraction of ads. 


## Installation

There is no installation required to use this app other than to visit the URL of the deployed site which can be found here:

https://sadums.github.io/currency-exchange/

## Usage

Upon loading the page, the user will be presented with a modal which asks for permissions to use location, it is necessary to accept this in order to utilize the app with full functionality, they will also be greeted by a header stating the web app's title. Beneath said title, the user may locate two input boxes which both allow for input from the user. Depending on the device on which the site is viewed, they may see these two inputs side-by-side or in vertical alignment. The inputs will have placeholder text stating "enter amount",which is where the user may type a number, this number being their desired currency amount to be converted. Beneath each input, the user will find a dropdown menu which lists the most common currencies to be converted. The user must select both the base currency and the currency to be output (converted). Upon entering the desired currency amount, the site will automatically begin to convert the to the specified currency in the "to" input, which is where the new amount will show. Note that the user can type into either input, which will allow them to take an amount recently converted and then change it back to a third currency from right to left, if desired. 

Beneath the inputs, the user will find a map which shows pins/locators for all banks/credit unions in the vicinity of the user. However, they must ensure that location permission IS given when first entering the site in order for those locators to show. At that point, the user may click on the locator nearest them or nearest to their destination, and be presented with the name of the business, the address, phone number, and website. In addition, a button labeled "directions" will allow the user to be redirected to Google Maps, which can then direct them to the desired bank. 

## Features

• Currency converter
    - real-time
    - cross-convert
• Map
    - generated using the user's location
    - highlights locations of interest (banks)
    - information about bank upon click
    - option to be taken to Google Maps for directions to selected location

## Images & GIF

![](/assets/images/app-screenshot-1.png)
![](/assets/images/app-screenshot-2.png)
![](/assets/images/app-gif.gif)

## Bugs

There is a slight chance that the API may be out of calls, if this occurs, please contact the team. 

## Credits
 
 The app was built by The Bit Busters team (group 7) of the U of U, EdEx Web Development Coding Bootcamp which comprises of: 

 • Samuel Adams
 • Brendalee Alcala
 • Janica Jensen

 The web app utilizes multiple outside sources. Specifically: 
 
 Fixer.io API: https://fixer.io/
 Leaflet: https://leafletjs.com/
 OpenStreetMap: https://www.openstreetmap.org/#map=4/38.01/-95.84
 TailwindCSS:https://tailwindcss.com/
 FontAwesome:https://fontawesome.com/
 Google Fonts: https://fonts.google.com/
 ----------------------------------------^^^^ WE SHOULD LINK THESE^^^^ ----------------------------------------------------------

## License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---


