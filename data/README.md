## Backing Data

This directory contains GeoJSON data files used to produce [tilesets][tileset]
for the Safe Routes to Streets Mapbox project. Each dataset is in the [WGS84
coordinate system][wgs84] required by Mapbox Studio. As part of preparing this
data in June 2019, we made some fixes to the underlying data.

- SFMTA bus routes
  * File: `sfmta_route_li.wgs84.json`
  * Tileset ID: `safe-routes-to-school.1n7ndnbx`
  * Notes:
    - Added a property for train vs bus to original file
- SFMTA metro routes
  * File: `sfmta_route_li.wgs84.json`
  * Tileset ID: `safe-routes-to-school.1n7ndnbx`
  * Notes:
    - Added a property for train vs bus to original file
- SFMTA route labels
  * File: `sfmta_route_li.wgs84.json`
  * Tileset ID: `safe-routes-to-school.1n7ndnbx`
  * Notes:
    - Added a property for train vs bus to original file
    - Fixed label mispellings to: JUDAH, FILLMORE, TERESITA, TARAVAL, etc.
- SFMTA stops
  * File: `sfmta_stop_pt.wgs84.json`
  * Tileset ID: safe-routes-to-school.08j6b2zg
  * Notes:
    - Weird data point "INSPECTORS ORDERS" "Giants Drive" with invalid
      coordinate.
- BART stations
  * Provided by Mapbox Streets v8 tileset
  * Tileset ID: n/a
- Bikeways
  * File: `sfmta_gis_20190621_1.gdb.zip`
  * Tileset ID: `safe-routes-to-school.dn51zedy`
  * Notes:
- Bikeshare Stations
  * File: `sfmta_gis_20190621_1.gdb.zip`
  * Tileset ID: `safe-routes-to-school.cnjupcas`
  * Notes:
- Crossing guards
  * File: `sf_cross_guard_pt.wgs84.json`
  * Tileset ID: `safe-routes-to-school.75v21hsd`
- School isochrone 15min
  * File: `sfusd_school_pt_15mins.json`
  * Tileset ID: `safe-routes-to-school.43p05ym8`
  * Notes:
    - Retrieved with Mapbox Isochrones API using a [script](../scripts/isochrones).
    - Note that application actually queries Mapbox Isochrones API directly
      instead of using this layer.
- School isochrone 10min
  * File: `sfusd_school_pt_10-mins.json`
  * Tileset ID: `safe-routes-to-school.1mzao96p`
  * Notes:
    - Retrieved with Mapbox Isochrones API using a [script](../scripts/isochrones).
    - Note that application actually queries Mapbox Isochrones API directly
      instead of using this layer.
- landuse = park
  * Provided by Mapbox Streets v8 tileset
  * Tileset ID: n/a
- Off Street Parking
  * File: `sfmta_gis_20190621_1.gdb.zip`
  * Tileset ID: `safe-routes-to-school.6tgc1l8w`
  * Notes:
- SFUSD School Labels
  * File: `sfusd_school_pt.wgs84.json`
  * Tileset ID: `safe-routes-to-school.73dps0vp`
  * Notes:
- SFUSD School Lands
  * File: `sfusd_school_land_pg.wgs84.json`
  * Tileset ID: `safe-routes-to-school.4ykokoxq`
  * Notes:
- School Speed Zones
  * TODO
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
reprojected this data into WGS84 using [`reproject`][reproject]. To convert:

``` bash
$ cat sfusd_school_pt.json \
  | reproject --use-epsg-io --from=EPSG:3857 --to=EPSG:4326 > sfusd_school_pt.wgs84.json
```

[orig_proj]: https://epsg.io/3857
[reproject]: https://github.com/perliedman/reproject
