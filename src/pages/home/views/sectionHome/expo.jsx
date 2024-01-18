import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const SectionHome = () => {
	const sectionHome = useRef();
	const ref = useRef();
	const backgroundColor = 0x000000;

	

	useEffect(() => {
		console.log(sectionHome.current)
		//* scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(backgroundColor);
		//* camera
		//const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.5, 2000);
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		//* initial mouse position
		let mouseX;
		let mouseY;
		//* render
		const renderer = new THREE.WebGLRenderer();
		let pixelRatio = Math.min(window.devicePixelRatio, 2);
		//const distance = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
		//const distance = Math.atan(window.innerHeight / 2 / camera.position.z) * 2.2 * THREE.Math.RAD2DEG;
		//const distance = Math.min(260, window.innerWidth / 1.5);
		var distance = Math.min(200, window.innerWidth / 3);
		renderer.setSize(window.innerWidth, window.innerHeight);
		//renderer.setPixelRatio(pixelRatio)
		ref.current.appendChild(renderer.domElement);
		//*
		const geometry = new THREE.Geometry();
		const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xffffff, opacity: 0.5, transparent: true, fog: false, size: 0.5 }));
		particles.boundingSphere = 50;
		//*
		const renderingParent = new THREE.Group();
		renderingParent.add(particles);
		//*
		const resizeContainer = new THREE.Group();
		resizeContainer.add(renderingParent);
		scene.add(resizeContainer);
		//*
		for (let i = 0; i < 2000; i++) {
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


		let winWidth = window.innerWidth;


		var w, 
			h, 
			isMobile;

		function updateSize() {
			w = ref.current.offsetWidth;
			h = ref.current.offsetHeight;
			isMobile = w < 800;
			pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : 1;			
		}

		function handleResize() {
			updateSize();
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(pixelRatio);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.position.z = isMobile ? 200 : 150;
	
			camera.updateProjectionMatrix();
		}		

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
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		window.addEventListener(
			'resize',
			() => {
				cameraRenderer();
				animate();
				console.log(window.innerWidth);

			},
			false
		);

		document.addEventListener('mousemove', mouseMoveCanvas, false);


		var isFocused = true,
			isInited = false;
			//inViewport = false;

		window.addEventListener('blur', function() {
			isFocused = false;
			console.log('blur')
		});
		window.addEventListener('focus', function() {
			console.log('focus')

			if (!isFocused) {
				isFocused = true;
				if (isInited) {
					console.log('focused')
					cameraRenderer();
				}
			}
		});



		let isClick = false;

		sectionHome.current.addEventListener('click', (e) => {
			isClick = true;

			if(isClick) {
				animate();
				cameraRenderer();
				//handleResize();
			}
		})

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
	}, []);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--home" ref={sectionHome}>
				<div className="canvas__home" ref={ref} />
			</section>
		</React.Fragment>
	);
};

export default SectionHome;
