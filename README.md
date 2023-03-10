# Car Park

The car park web app that show the following information:
 - the carparks (carpark_number) that has highest and lowest available lots currently, from each carpark category displaying the available lots
 - poll the latest data every 60 seconds
 
carpark category* (based on total_lots)
 - small : less than 100 lots
 - medium : 100 lots or more, but less than 300 lots
 - big : 300 lots or more, but less than 400 lots
 - large : 400 lots or more
 
## Working Demo
See [Working Demo](http://vuejs-car-park.s3-website-ap-southeast-1.amazonaws.com/).


## Quickstart

### Deploy using Docker

1. Make sure you have Docker installed.
2. Clone this repos to your local machine

```bash
git clone https://github.com/vandanapareek/car-park.git
```

3. Build the image

```bash
docker build -t car-park .
```
4. Start a container that serves the development version of the app

```bash
# Open your browser at http://localhost:8080 to access the app
docker run -it -p 8080:80 -d --name car-park car-park
```

5. Or test the optimized built with Docker

```bash
# Open your browser at http://localhost to access the app
docker run -p 80:80 vue_app:production
```


### Deploy manually

1. Project setup
```
npm install
```

2. Compiles and hot-reloads for development
```
npm run serve
```

3. Compiles and minifies for production
```
npm run build
```