# README #

1. ```git clone https://<user-name>@bitbucket.org/nxtcristian/pcm-frontend.git```

2. ```git checkout dev```

3. ```npm install```

4. ```npm run dev```

Alternatively, after cloning, run "Init" task from VS Code.

<h1>Guidelines for writing the code</h1>

<h2>1. Components</h2>
  
Each component, except ```App``` will be a folder with the following structure:  
- NameOfComponent.jsx -> the component itself, has a default export in it: the component  
- style.css or NameOfComponent.module.css -> styling for this single component goes in here  
- index.js -> meant to leverage easier import paths (e.g. instead of ```import Component from "./Component/Component.jsx"```, it will be ```import Component from "./Component"```). This file imports the component from the .jsx file, and exports it further, this is its only purpose. Each ```index.js``` file that exports a component should have the following line of code inside it: ```export { default } from "./Component.jsx"```  
  
Whenever possible, choose pure class components (```React.PureComponent```) instead of functional ones. If the component does not use any third party hooks (e.g. ```useNavigate()``` from React-Router), then use a class component. The reason being: pure class components render less times -> app more performant.  
  
<h2>2. Assets</h2>
  
When a component needs some assets (e.g. an SVG icon or an image), put the asset inside the ```assets/``` folder, found in ```src/```. The ```assets/``` folder has the following structure:  
- data -> contains miscellaneous data (e.g. country codes for telephone numbers)  
- icons -> contains SVG icons  
- images -> contains images  
  
Adding an SVG icon is done as such:  
- left-click directly on the icon in the Figma canvas  
- on the left side you will notice a tree-like view  
- right-click on the icon, **not the container**, but the icon itself  
- copy as SVG  
- go into ```assets/icons/```  
- create new icon (e.g. star-white.svg). **Use dashes between words** (instead of ```starWhite```, the name should be ```star-white```)  
- paste the previously copied as SVG icon inside the file  
- navigate to ```src/components/Icon/Icon.jsx```  
- below all of the imports add ```import { ReactComponent as StarWhite } from "../../assets/icons/star-white.svg"```  
- inside the component itself, add a new case to the switch statement: ```case "star-white": return <StartWhite />;```  
- import ```Icon``` component where you need it  
- insert it into the jsx and assign it a prop ```icon``` with the name of the icon that you just added (e.g. ```<Icon icon="star-white" />```)  
  
Note: naming the icon should be done as in the example above. For instance, if there is no other star icon inside ```assets/icons```, then the name of the file should be ```star.svg```. If there are other star icons, then add a distinction between them (e.g. if there is a ```star.svg``` icon of the color black inside ```assets/icons/```, and a new star icon is imported but its color is white, name the new one ```star-white.svg``` and rename the old one ```star-black.svg```).   
  
Note: always name the icon with the common word in front of it (e.g. instead of ```black-star.svg``` and ```white-start.svg```, the files should be named ```star-black.svg``` and ```star-white.svg```). This is done such that they are easier to see inside the ```assets/icons/``` folder if they are alphabetically ordered.  
  
<h2>3. Code</h2>
  
Import statements inside files should have the following order:  
- third party libraries imports (React, React-Router, etc.)  
- style imports  
- other components and/or code imports  

When passing a string prop, do not put it inside curly braces: ```prop={"string"}``` should be ```prop="string"```.

Each variable, function and JSON import should be ```camelCased```. Component should be ```PascalCased```. Constant variables, usually found in config files or utils (e.g. the URL of the API or the API key) should be ```snake_cased``` with uppercase letters (e.g. ```API_KEY```, ```API_URL```);

<h2>4. Design</h2>

When reaching a point where the design is unfinished, do not improvise your own. Best course of action: ask designer. Second best: ask designer.

<h2>5. Versioning (Git)</h2>

Commit messages should be a short description of what you accomplished with the code that you wrote. 

Keep the changes small and isolated.

Good commit message: "added logs for seeing results in the autocomplete feature"
Bad commit message: "added logs"