# ColorFilter
( ReactJS + Numpy + NodeJs ) * Image Color Filter
[Demo Video](https://www.youtube.com/watch?v=i1QW52spBD4)
[Blog Post](https://dev.to/lucidmach/building-frontend-web-for-python-scripts-react-node-heroku-2deb)
[Live Deployment](https://color-filter.netlify.app/)
[Source Code](https://github.com/LucidMach/ColorFilter)

## How Does It Work
The Projecct has 4 phases
1. Webcam -> React -> NodeJS 
2. NodeJS Py Child Process
3. Actual Python Program
4. NodeJS -> React -> Canvas

## Phase 1: Webcam -> React -> NodeJS 
![P1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8nq96ysu8k82w318mwn9.png)

We begin by first extracting an image from the webcam, we can use plain HTML5's `navigator.getUserMedia API` but there's an react package that simplifies the whole process.

```
yarn add react-webcam
```
we can use `getScreenshot({width: 1920, height: 1080})` to take a **1080p snapshot** of the user.

🔗: [React-WebCam Docs](https://www.npmjs.com/package/react-webcam) 

Now that we have a snapshot (as a **base64** string), we've to send it to the server
> Any **browser** can **only** run **javascript** on the client, so we've to run **python on the server**


we make a post request
```
axios.post(url, { image: imageSrc, color: selectedColor })
```
> I also send the selected color, as I need it for the application that I'm building  


**By default** the server(bodyParser middleware) **limits** the size of data it can get(post) to **1MB** and pictures are usually way big
> Unless you used an image optimizer like I did in a [previous project](https://github.com/LucidMach/Shrimkage) 

Let's Push the Limits
```
app.use(bodyParser.json({ limit: "5mb" }));
```

Also we need to extract the image from the base64 string

Example base64 PNG String
`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAADVCAMAAAAfHvCaAAAAGFBMVEVY`

Actual base64 Image
`iVBORw0KGgoAAAANSUhEUgAAAKsAAADVCAMAAAAfHvCaAAAAGFBMVEVY`

```
const base64Image = req.body.image.split(";base64,").pop();
```

## Phase 2: NodeJS Py Child Process
![P2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0g69527yrxarpuz24uel.png)
Now that we have the image back on the server, we need to run the python script

If you've ever _passed parameters(**argv**) to a python script / built a CLI tool_, what we're going to be doing is very similar

Before that let's save the image temporarily cuz we can't pass images as argv(script parameter)

```
const fs = require("fs");

fs.writeFileSync("input/image.png", base64Image, { encoding: "base64" });
```

Now, we spawn a python child process
we do this my representing terminal commands to an array
```
const { spawn } = require("child_process");

const py = spawn("python", ["color-filter.py", body.color]);
``` 

Every python script probabily sends data back to the terminal/console

To read py console log, we create a callback function
```
var data2send

py.stdout.on("data", (data) => {
    data2send = data.toString();
});

console.log(data2send);
```
## Phase 3: Actual Python Program
![P3](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ogbqfc1nxltahppnlmn9.png)
The python script gets executed, in my case it's a numpy script that conditionally removes color channels

If you're interested you can check out the [source-code](https://github.com/LucidMach/ColorFilter) on github

## Phase 4: NodeJS -> React -> Canvas
![P4](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sizrt30a4f3krm5csl9f.png)

now when the py child process terminates we need to encode the image back to base64 and send back a response

we can do that by latching a callback to when the child process ends

```
py.on("close", () => {
  // Adding Heading and converting image to base64
  const image = `data:image/png;base64,${fs.readFileSync("output/image.png", {
    encoding: "base64",
  })}`;

  // sending image to client
    res.json({ image });
  });
```
