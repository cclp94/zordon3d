
# Zordon 3D
<a href="https://www.npmjs.com/package/zordon-3d" target="_blank"><img alt="NPM Version" src="https://img.shields.io/npm/v/zordon-3d?style=for-the-badge" /></a> <a href="https://www.npmjs.com/package/zordon-3d" target="_blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/zordon-3d?style=for-the-badge"></a>

Zordon-3D is a web component for displaying floating 3D heads.

## Features
* Interactive 3D Heads: Display animated 3D heads that respond to user interactions like hovering or clicking.
* Customizable: You can configure the bounce and speed of the floating head!
* Direct support for `glb` and `gltf`

## Installation
Before installing Zordon-3D, ensure you have Three.js installed as a peer dependency in your project. You can install it using npm:


```bash
npm i three zordon-3d
```

## Usage
### React
Import the scripts in your index.html
```html
 <script type="module" src="/node_modules/zordon-3d"></script>
```

Create a react wrapper for the native component
```typescript
import { Zordon3d } from 'zordon-3d';

// Register custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'zordon-3d': Partial<Zordon3d>
    }
  }
}

type IProps = {
    bounce: number;
    bounceSpeed: number;
    src: string;
}

export default function Zordon({ bounce, bounceSpeed, src}: IProps) {
  return (
    <zordon-3d
      modelSrc={src}
      bounce={bounce}
      bounceSpeed={bounceSpeed} />
  );
}
```

Your component is now ready to use!

```typescript
<Zordon3d bounce={3} bounceSpeed={3} src={new URL('...', import.meta.url).toString()} />
```

[Sketch Fab](https://sketchfab.com/) is a good to place to start looking for models to use!


## License
This package is licensed under the MIT License. See the LICENSE file for more details.

## Issues and Contributions
For issues and suggestions, please visit the GitHub repository. Contributions are welcome through pull requests.

## Author
Created by [Caio Paiva](https://github.com/cclp94)
