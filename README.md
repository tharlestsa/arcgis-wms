 * * *

ArcGIS WMS Demo
===============

This repository contains a sample web application demonstrating how to add WMS layers from ArcGIS to a web map using popular web mapping libraries.

Features
--------

* Display WMS layers from ArcGIS Server in a web map
* Support for different web mapping libraries, such as Leaflet and OpenLayers
* Get feature information from the WMS layer using GetFeatureInfo requests
* Interact with WMS layers using popups and other UI components

Prerequisites
-------------

* Basic knowledge of HTML, CSS, and JavaScript
* Familiarity with web mapping libraries, such as Leaflet or OpenLayers

Getting Started
---------------

The application runs in a Docker environment, using docker-compose to simplify the environment setup and allow the application to run on different platforms and environments.

To start the ArcGIS WMS Demo application, follow these steps:

1.  Install Docker and Docker Compose on your local machine.

2.  Clone this repository:

    ```console
    git clone https://github.com/tharlestsa/arcgis-wms.git
    ```

3.  Open a terminal window and navigate to the root directory of the `arcgis-wms` project.
    ```console
    cd arcgis-wms
    ```

4.  Run the following command to build and start the application:

    ```console
    docker-compose build
    docker-compose up -d
    ```


5.  Open the `index.html` file in a web browser or use a local web server to serve the application.
    
6.  Explore the source code to learn how to add WMS layers from ArcGIS to your web map.
    

Libraries
---------

This project use the following librarie:

* [Leaflet](https://leafletjs.com/) \- A lightweight, mobile-friendly JavaScript library for interactive maps

Contributing
------------

Feel free to submit issues or pull requests to improve the project.

License
-------

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

* * *
