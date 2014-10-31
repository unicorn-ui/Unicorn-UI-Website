## Unicorn Website
Below are setup and deploy instructions for the website. You'll need to have [bower](http://bower.io/) and [node.js](http://nodejs.org/) installed before you begin.

## Development
1. On the command line inside the root directory run ```bower install```.
2. Next run ```npm install``` or ```sudo npm install```.
3. Now run ```gulp```. This will build the site and automatically open Chrome.
4. All your changes to css, html, js, etc. will live reload automatically.

## Deploying
1. On the command line inside the root directory run ```gulp deploy```.



#### Old instructions
```shell
harp compile . ../path/to/deploy/directory
cd ../path/to/deploy/directory
chmod 755 post-deploy.sh
./post-deploy.sh
```



