README
===

To include this into your project you have 2 options:
- Host magister-browser.min.js on your own servers.
- Only Host separateHttp/http.js on your servers and link to https://cdn.rawgit.com/simplyGits/MagisterJS/master/lib/separateHttp/magister-browser-noHttp.min.js for the rest of Magister.js (Preferred because you will always be up to date with this option)

For both options you need to fill in the MagisterHttp class to connect to your own serverside proxy.
See instructions in magister-browser.min.js or separateHttp/http.js (according to what option you chose).