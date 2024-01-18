import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

import './sectionHome.scss';

const SectionHome = ({ darkMode }) => {
	//* canvas reference
	const canvas = useRef();

	const theme = useCallback(() => {
		console.log('use callback function', darkMode)
	}, [darkMode]);



	useEffect(() => {
		
		//* color
		const dark = 0x000000;
		const light = 0xffffff;
		//* width and height
		const width = window.innerWidth;
		const height = window.innerHeight;
		//* scene 
		const scene = new THREE.Scene();
		//scene.background = new THREE.Color(dark);


		

		//* camera settings
		const fov = 75;
		// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;


		const aspect = width / height;
		const near = 1;
		const far = 1000;
		const opacity = 0.75;
		const size = 0.75;
		//* camera
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		//* initial mouse position
		let mouseX;
		let mouseY;
		//* render
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false }); //clearColor: color
		const devicePixelRatio = window.devicePixelRatio || 1; 
		const distance = Math.min(200, width / 3);
		renderer.setSize(width, height);
		renderer.setPixelRatio(devicePixelRatio);
		renderer.setClearColor(dark, dark);
		canvas.current.appendChild(renderer.domElement);

		// instantiate a texture loader
		var loader = new THREE.TextureLoader();
		//allow cross origin loading
		loader.crossOrigin = 'Text';

		//*
		const geometry = new THREE.Geometry();
		const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: light, opacity: opacity, transparent: true, fog: false, size: size }));
		particles.boundingSphere = 50;
		//*
		const renderingParent = new THREE.Group();
		renderingParent.add(particles);
		//*
		const resizeContainer = new THREE.Group();
		resizeContainer.add(renderingParent);
		scene.add(resizeContainer);
		//*
		for (let i = 0; i < 3000; i++) {
			let vertex = new THREE.Vector3();
			let theta = THREE.Math.randFloatSpread(360);
			let phi = THREE.Math.randFloatSpread(360);
			vertex.x = distance * Math.sin(theta) * Math.cos(phi);
			vertex.y = distance * Math.sin(theta) * Math.sin(phi);
			vertex.z = distance * Math.cos(theta);
			geometry.vertices.push(vertex);
		}

		//* transform style
		camera.position.z = 380;

		//* request animation frame
		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}

		animate();

		//* Scaling animation
		const animProps = { scale: 1, xRot: 0, yRot: 0 };
		//* scale animation gsap
		gsap.to(animProps, {
			duration: 10,
			scale: 1.05,
			repeat: -1,
			yoyo: true,
			ease: 'sine',
			onUpdate: function() {
				renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
			}
		});

		//* rotation animation gsap
		gsap.to(animProps, {
			duration: 120,
			xRot: Math.PI * 2,
			yRot: Math.PI * 4,
			repeat: -1,
			yoyo: true,
			ease: 'none',
			onUpdate: function() {
				renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
			}
		});

		//* on mouse move canvas
		function mouseMoveCanvas(event) {
			let tweenMax;
			if (tweenMax) tweenMax.kill();
			mouseX = event.clientX / window.innerWidth * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
			tweenMax = gsap.to(particles.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
		}

		//* resize canvas
		function cameraRenderer() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateMatrix();
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}	

				
		window.addEventListener(
			'resize',
			() => {
				cameraRenderer();
				animate();
			},
			false
		);
		document.addEventListener('mousemove', mouseMoveCanvas, false);
		return () => {

			window.removeEventListener(
				'resize',
				() => {
					cameraRenderer();
					animate();
				},
				false
			);
			document.removeEventListener('mousemove', mouseMoveCanvas, false);
		};
	}, [ ]);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--home">
				<div className="canvas__home" ref={canvas} />

				<h2 onClick={() => theme()}>
					<span className="glitch" data-text="Hi,">Hi,</span>
					<span className="glitch" data-text="I'm Danijel,">I'm Danijel,</span>
					<span className="glitch" data-text="Front-end developer.">Front-end developer.</span>
				</h2>				
			</section>
		</React.Fragment>
	);
};

export default SectionHome;
