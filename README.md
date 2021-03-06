# [Safe Route to Schools](http://www.sfsaferoutes.org/)

A simple application that loads the Safe Routes to School map that allows simple
customization of overlay layers and exporting a high-resolution image of the map
for print.

## Using the Application

- Navigate to <https://labs.mapbox.com/community/map-template/>
- Use the school selector drop-down to select the school for which you want to
  review and print the map
- Change the zoom and center of the map until you are satisfied with all the
  features that are in range
- Switch on/off the Bicycling related data layers
  * This switch toggles the bicycle paths and bikeshare stations
- Switch on/off the Transit related data layers
  * This switch toggles MUNI routes and stops, and BART stops
- Switch on/off the 10 minute walking distance isochrone
  * This switch toggles the light blue polygon of estimated walking time, set to 10 minutes walking using Mapbox's isochrone tool.
- Hit the `Export` button
  * This downloads a map in a size fit for printing a 11in x 13in map at 72 dpi.
- Note: The export is the map only and does not include a title or legend. If you want a legend, we recommend either recreating the legend in a graphics software tool or taking a screenshot of the legend from the application.

## Updating the Backing Data

### To update the style
- Login to [Mapbox Studio](https://studio.mapbox.com/) with the
  `safe-routes-to-school` username and password
- Select the SRTS style
- Update the style
    * Do not update the name of the existing layers. This will break the toggles
      on the webpage
- Hit the `Publish` button when done

### To update the map data

The GeoJSON files from SFMTA/SFGIS were uploaded to Mapbox studio and converted
into vector tilesets. These tilesets are referenced in the map style and
updating them here wll update the displayed map.

- Ensure the updated GeoJSON uses the WGS84 coordinate system
- Login to [Mapbox Studio](https://studio.mapbox.com/) with the
  `safe-routes-to-school` username and password
- Select `Tilesets`from the Top menu bar
- Scroll to and select the tileset that you want to update
- On the tileset page, click `Replace` on the right column and select the
  updated version of the GeoJSON file

The raw GeoJSON data going into these vector tilesets is in [`data/`](data/),
and includes notes on data sources, corrections, and normalizations we
made. Note that the map style depends on the GeoJSON properties, so the map
style might break if the new data is missing any properties that exist in the
old data.

## Developing the Application

Development dependencies:

- [npm][npm]
- A Mapbox Access Token

- Install dependencies: `npm install`
- Run locally: `npm start`
- Build front-end application: `npm run build`

[npm]: https://www.npmjs.com/get-npm

## Hosting Application

Running `npm run build` will generate static files for the site and will output them to the `docs` directory (this is just a handy default that takes advantage of GitHub Pages' ability to deploy files from the `docs` directory of a repo's master branch. If you've forked this repo, you can change the `outputDirectory` in `underreact.config.js` to whatever you like). 

Currently, this repo expects files will life at a `/map-template` basepath and will generate an `index.html` that corresponds. You will probably need to change this value to correspond to wherever your files will end up. A more manual option is, from the bundled `index.html` file, to change all of the filepaths to be relative. 
