# photo_viewer

A simple web app that shows a grid of photo thumbnails; when a thumbnail is clicked, the photo should be displayed in a lightbox view, with the ability to move to the next / previous photos and display the photo title.

## Running Locally

```sh
$ git clone https://github.com/ryojiosawa/photo_viewer.git # or clone your own fork
$ cd photo_viewer
$ npm install
$ add your Flickr API key to API_KEY in Config.js (see https://www.flickr.com/services/api/misc.api_keys.html on how to get API key)
$ run gulp default task (ie., 'gulp default')
$ npm start
```

## Browser Support
This app should work in most of modern browsers, including IE 9, 10 and 11 (you might see some minor UI issues in IE).