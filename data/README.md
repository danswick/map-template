## Backing Data

This directory contains GeoJSON data files used to produce [tilesets][tileset]
for the Safe Routes to Streets Mapbox project. Each item is a layer in the style
and was assembled from a variety of sources--files provided by the SFMTA,
DataSF, Mapbox/Open Street Map--and then normalized and corrected. Fixes to the
underlying data are also noted. Each dataset is in the [WGS84 coordinate
system][wgs84] required by Mapbox Studio.

- SFMTA bus routes
  * File: `sfmta_route_li.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.1n7ndnbx`
  * Notes:
    - Added a property for train vs bus to original file
- SFMTA metro routes
  * File: `sfmta_route_li.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.1n7ndnbx`
  * Notes:
    - Added a property for train vs bus to original file
- SFMTA route labels
  * File: `sfmta_route_li.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.1n7ndnbx`
  * Notes:
    - Added a property for train vs bus to original file
    - Fixed label mispellings to: JUDAH, FILLMORE, TERESITA, TARAVAL, etc.
- SFMTA stops
  * File: `sfmta_stop_pt.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.08j6b2zg`
  * Notes:
    - Weird data point "INSPECTORS ORDERS" "Giants Drive" with invalid
      coordinate.
- BART stations
  * Provided by Mapbox Streets v8 tileset
  * Tileset ID: n/a
- Bikeways
  * File: `bikeways.zip` (from `sfmta_gis_20190621_1.gdb.zip`)
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.dn51zedy`
  * Notes: GeoJSON file extracted from this GIS spreadsheet file.
- Bikeshare Stations
  * File: KML file `bikeshare_stations.zip` (from `sfmta_gis_20190621_1.gdb.zip`)
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.cnjupcas`
  * Notes: GeoJSON file extracted from this GIS spreadsheet file.
- Crossing guards
  * File: `sf_cross_guard_pt.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.75v21hsd`
- School isochrone 15min
  * File: `sfusd_school_pt_15mins.json`
  * Source: Provided by Mapbox
  * Tileset ID: `safe-routes-to-school.43p05ym8`
  * Notes:
    - Retrieved with Mapbox Isochrones API using a [script](../scripts/isochrones).
    - Note that application actually queries Mapbox Isochrones API directly
      instead of using this layer.
- School isochrone 10min
  * File: `sfusd_school_pt_10-mins.json`
  * Source: Provided by Mapbox
  * Tileset ID: `safe-routes-to-school.1mzao96p`
  * Notes:
    - Retrieved with Mapbox Isochrones API using a [script](../scripts/isochrones).
    - Note that application actually queries Mapbox Isochrones API directly
      instead of using this layer.
- landuse = park
  * Source: Provided by Mapbox Streets v8 tileset
  * Tileset ID: n/a
- Off Street Parking
  * File: KML file `offstreetparking.zip` (from `sfmta_gis_20190621_1.gdb.zip`)
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.6tgc1l8w`
  * Notes: GeoJSON file extracted from this GIS spreadsheet file.
- SFUSD School Labels
  * File: `sfusd_school_pt.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.73dps0vp`
- SFUSD School Lands
  * File: `sfusd_school_land_pg.wgs84.json`
  * Source: Provided by SFMTA
  * Tileset ID: `safe-routes-to-school.4ykokoxq`
- School Speed Zones
  * File: `school_speed_zones.zip`
  * Source: From https://data.sfgov.org/.
  * Tileset ID: `safe-routes-to-school.6njoirj3`
  * Notes:
    - Retrieved full speeds doc from
      https://data.sfgov.org/Transportation/Speed-Limits/3t7b-gebn. Used QGIS to
      query for features where `speedlimit=15`, then exported just those
      features.


[wgs84]: https://spatialreference.org/ref/epsg/wgs-84/
[tileset]: https://docs.mapbox.com/studio-manual/reference/tilesets/#what-is-a-tileset

## Converting `EPSG:3857` to `EPSG:4326` (WGS84)

The original data provided was in the [`EPSG:3857`][orig_proj] projection. We
reprojected this data into WGS84 using [`reproject`][reproject]. If you have a
file in the `EPSG:3857` project, you can convert it using `reproject` with:

``` bash
$ cat sfusd_school_pt.json \
  | reproject --use-epsg-io --from=EPSG:3857 --to=EPSG:4326 > sfusd_school_pt.wgs84.json
```

[orig_proj]: https://epsg.io/3857
[reproject]: https://github.com/perliedman/reproject
