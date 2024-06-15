
# Zordon 3D

Description
Zordon-3D is a web component for displaying floating 3D heads.

## Features
* Interactive 3D Heads: Display animated 3D heads that respond to user interactions like hovering or clicking.
* Customizable: You can configure the bounce and speed of the floating head!
* Direct support for `glb` and `gltf`

## Installation
Before installing Zordon-3D, ensure you have Three.js installed as a peer dependency in your project. You can install it using npm:


```bash
npm install three
```

## Usage

### React
```typescript
import { zordon3d } from 'zordon-3d';

declare global {
  namespace jsx {
    interface instrinsicelements {
      'zordon-3d': zordon3d
    }
  }
}

export default function Zordon3d() {
  const bounce = 3;
  const bounceSpeed = 3;
  return (
    <zordon-3d
      modelsrc={new url('...glb'), import.meta.url).tostring()}
      bounce={bounce}
      bouncespeed={bounceSpeed} />
  );
}
```


## License
This package is licensed under the MIT License. See the LICENSE file for more details.

## Issues and Contributions
For issues and suggestions, please visit the GitHub repository. Contributions are welcome through pull requests.

## Author
Created by [Caio Paiva](https://github.com/cclp94)
