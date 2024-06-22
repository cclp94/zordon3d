import { LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@customElement('zordon-3d')
export class Zordon3d extends LitElement {
  @property({ type: String }) modelSrc = '';
  @property({ type: Number }) width = 500;
  @property({ type: Number }) height = 500;

  @property({ type: Number }) cameraZOffset? = 0;

  @property({ type: Number }) bounce = 1;
  @property({ type: Number }) bounceSpeed = 5;

  private coordX = -1;
  private  coordY = -1;

  private TURN_LIMIT_X = 400;
  private TURN_LIMIT_Y = 600;
  private TURN_SPEED = 0.05;

  private scene: THREE.Scene; 
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private  get bounceFactor(): number {
    return this.bounce * 0.01;
  }

  private get bounceSpeedFactor(): number {
    return this.bounceSpeed * 0.001;
  }

  constructor() {
    super();
    console.log("here");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });


    this.renderer.setClearColor( 0x000000, 0 );

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(0, 10, 10); 
    this.scene.add(directionalLight);
    console.log("bootstrapped");
  }



  connectedCallback() {
    super.connectedCallback();
    this.camera.aspect = (this.width/this.height);
    this.renderer.setPixelRatio(this.width / this.height );
    this.renderer.setSize( this.width, this.height );

    this.getModel(this.modelSrc)
      .then((model: THREE.Object3D) => {
        this.centerCameraAround(model); 
        this.scene.add(model);
        this.animation(model);
      });

    document.addEventListener('mousemove', this.registerMouseCoord.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();  
    document.removeEventListener('mousemove', this.registerMouseCoord.bind(this));
  }

  render() {
    return this.renderer.domElement;
  }

  private getModel(src: string): Promise<THREE.Object3D> {
    return new Promise<THREE.Object3D>(
      (resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(src,
        async (gltf: any) => {
          const model = gltf.scene;
          await this.renderer.compileAsync(model, this.camera, this.scene);
          resolve(model);
        }, 
        () => {},
        (error: unknown) => {
            reject(error);
        });
      });
  }


  private centerCameraAround(model: THREE.Object3D) {
    const bbox = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    const distance = bbox.getSize(new THREE.Vector3()).length()
    this.camera.position.set(center.x, center.y, center.z + distance);

    this.camera.lookAt(center);
  }

  private animation(model: THREE.Object3D) {
    const frame = (timestamp: DOMHighResTimeStamp) => {
      requestAnimationFrame(frame);
      this.float(model, timestamp);
      this.turn(model);
      this.renderer.render( this.scene, this.camera );
    }

    frame(performance.now());
  }

  private registerMouseCoord(mouse: MouseEvent) {
    this.coordX = mouse.clientX;
    this.coordY = mouse.clientY;
  }

  private float(model: THREE.Object3D, seed: number) {
    model.position.setY(Math.sin(seed*this.bounceSpeedFactor) * (this.bounceFactor));
  }

  private turn(model: THREE.Object3D) {
    const containerCoords = this.renderer.domElement.getBoundingClientRect();
    const centerX = containerCoords.x + (containerCoords.width / 2);
    const centerY = containerCoords.y + (containerCoords.height / 2);

    let lookX = centerX - this.coordX;
    let lookY = centerY - this.coordY;
  
    lookX = this.limitLook(lookX, this.TURN_LIMIT_X);
    lookY = this.limitLook(lookY, this.TURN_LIMIT_Y);

    model.rotation.y += this.smoothLook(lookX, model.rotation.y);
    model.rotation.x += this.smoothLook(lookY, model.rotation.x);

  }

  private limitLook(look: number, limit: number): number {
    if (Math.abs(look) > limit) {
      return look > 0 ? limit : -limit;
    }
    return look;
  }

  private smoothLook(look: number, target: number): number {
    return ((look * -0.001) - target) * this.TURN_SPEED;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'zordon-3d': Zordon3d
  }
}

