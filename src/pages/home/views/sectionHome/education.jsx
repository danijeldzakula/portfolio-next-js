var createHeroInteractive = function($container) {
	'use strict';
	// prettier-ignore
	var renderer, scene, camera, pixelRatio = Math.min(window.devicePixelRatio, 2),
	geometryCenterPiece, materialCenterPiece, meshCenterPiece,
	geometry1, material1, mesh1,
	geometry2, material2, mesh2,
	geometry3, material3, mesh3,
	geometry4, material4, mesh4,
	geometry5, material5, mesh5,
	geometry6, material6, mesh6,
	fov = 45;

	var vertexShaderCenterPiece = document.querySelector(
		'#vertexShaderCenterPiece'
	).textContent;
	var fragmentShaderCenterPiece = document.querySelector(
		'#fragmentShaderCenterPiece'
	).textContent;
	var vertexShader1 = document.querySelector('#vertexShader1').textContent;
	var fragmentShader1 = document.querySelector('#fragmentShader1')
		.textContent;
	var vertexShader6 = document.querySelector('#vertexShader6').textContent;
	var fragmentShader6 = document.querySelector('#fragmentShader6')
		.textContent;

	var mousePosition = {
		x: 0.5,
		y: 0.5,
	};
	var v2MousePosition = new THREE.Vector2(mousePosition.x, mousePosition.y);

	var start = Date.now();
	var fixedTime = 0,
		lastFixedTime = 0,
		timeDelta = 0,
		timeOffset = 0,
		dynamicTime = 0;

	var renderUpdates = {
		rotate: [],
		fbo: [],
		dynamicTime: [],
	};

	var w, h, isMobile;

	var camX = 0,
		camY = 0;

	var isFocused = true,
		isInited = false,
		inViewport = false;

	window.addEventListener('blur', function() {
		isFocused = false;
	});
	window.addEventListener('focus', function() {
		if (!isFocused) {
			isFocused = true;
			if (isInited) {
				render();
			}
		}
	});

	function updateSize() {
		w = $container.offsetWidth;
		h = $container.offsetHeight;
		isMobile = w < 800;
		pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : 1;
	}

	var wordTextureStore = {};
	function generateWordTexture(word, size, fontFamily, weight) {
		if (!wordTextureStore[word]) {
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d', {alpha: false});
			var font = weight + ' ' + size * 2 + "px '" + fontFamily + "'";
			context.font = font;
			var wordWidth = Math.max(
				size * 1.4,
				context.measureText(word).width
			);

			canvas.width = wordWidth + 20;
			canvas.height = wordWidth + 20;

			context.fillStyle = '#000';
			context.fillRect(0, 0, wordWidth, wordWidth);

			context.fillStyle = '#fff';
			context.font = font;
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(word, canvas.width / 2, canvas.height / 2);

			wordTextureStore[word] = canvas;
		}

		return wordTextureStore[word];
	}

	init();

	function init() {
		updateSize();

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(fov, w / h, 1, 800);
		camera.position.z = isMobile ? 200 : 120;

		scene.add(camera);

		renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
		renderer.setPixelRatio(pixelRatio);
		renderer.setSize(w, h);
		renderer.setClearColor(new THREE.Color('rgb(23, 6, 76)'));

		var wordTexture6 = new THREE.CanvasTexture(
			generateWordTexture('Eternal', 150, 'serif', 700)
		);
		wordTexture6.generateMipmaps = false;
		wordTexture6.wrapS = wordTexture6.wrapT = THREE.ClampToEdgeWrapping;
		wordTexture6.minFilter = THREE.LinearFilter;

		geometryCenterPiece = new THREE.PlaneGeometry(400, 260);
		materialCenterPiece = new THREE.ShaderMaterial({
			uniforms: {
				u_color1: {
					type: 'v3',
					value: new THREE.Color('rgb(43, 108, 239)'),
				},
				u_color2: {
					type: 'v3',
					value: new THREE.Color('rgb(255, 121, 180)'),
				},
				u_time: {type: 'f', value: 0},
				u_shapeSize: {type: 'v2', value: new THREE.Vector2(400, 260)},
			},
			fragmentShader: fragmentShaderCenterPiece,
			vertexShader: vertexShaderCenterPiece,
		});
		meshCenterPiece = new THREE.Mesh(
			geometryCenterPiece,
			materialCenterPiece
		);
		meshCenterPiece.position.set(0, 0, -250);
		meshCenterPiece.scale.multiplyScalar(2.67);
		scene.add(meshCenterPiece);

		geometry1 = new THREE.PlaneGeometry(117, 60);
		material1 = new THREE.ShaderMaterial({
			uniforms: {
				u_bg: {type: 'v3', value: new THREE.Color('rgb(11, 27, 60)')},
				u_time: {type: 'f', value: 0},
				u_timeOffset: {type: 'f', value: 9.8},
				u_left: {type: 'f', value: 0.4},
				u_right: {type: 'f', value: 0.3},
				u_topCount: {type: 'f', value: 2.9},
				u_mountainHeight: {type: 'f', value: 1.8},
				u_spikeCount: {type: 'f', value: 7.0},
			},
			fragmentShader: fragmentShader1,
			vertexShader: vertexShader1,
			transparent: true,
		});
		mesh1 = new THREE.Mesh(geometry1, material1);
		mesh1.position.set(
			isMobile ? 2 : 17,
			isMobile ? -56 : -31,
			isMobile ? -56 : -220
		);
		mesh1.scale.multiplyScalar(2.49);
		mesh1.rotation.z = 0.0;
		scene.add(mesh1);

		geometry2 = new THREE.PlaneGeometry(121, 70);
		material2 = new THREE.ShaderMaterial({
			uniforms: {
				u_bg: {type: 'v3', value: new THREE.Color('rgb(11, 27, 60)')},
				u_time: {type: 'f', value: 0},
				u_timeOffset: {type: 'f', value: 8},
				u_left: {type: 'f', value: 0.7},
				u_right: {type: 'f', value: 0.6},
				u_topCount: {type: 'f', value: 4.5},
				u_mountainHeight: {type: 'f', value: 1.7},
				u_spikeCount: {type: 'f', value: 4.0},
			},
			fragmentShader: fragmentShader1,
			vertexShader: vertexShader1,
			transparent: true,
		});
		mesh2 = new THREE.Mesh(geometry2, material2);
		mesh2.position.set(isMobile ? -25 : -152, -21, -173);
		mesh2.scale.multiplyScalar(2.15);
		mesh2.rotation.z = 0.0;
		scene.add(mesh2);

		geometry3 = new THREE.PlaneGeometry(155, 61);
		material3 = new THREE.ShaderMaterial({
			uniforms: {
				u_bg: {type: 'v3', value: new THREE.Color('rgb(11, 27, 60)')},
				u_time: {type: 'f', value: 0},
				u_timeOffset: {type: 'f', value: 0.1},
				u_left: {type: 'f', value: 0.4},
				u_right: {type: 'f', value: 0.5},
				u_topCount: {type: 'f', value: 2.6},
				u_mountainHeight: {type: 'f', value: 1.4},
				u_spikeCount: {type: 'f', value: 7.0},
			},
			fragmentShader: fragmentShader1,
			vertexShader: vertexShader1,
			transparent: true,
		});
		mesh3 = new THREE.Mesh(geometry3, material3);
		mesh3.position.set(isMobile ? 29 : 78, -24, isMobile ? -200 : -75);
		mesh3.scale.multiplyScalar(1.84);
		mesh3.rotation.z = 0.0;
		scene.add(mesh3);

		geometry4 = new THREE.PlaneGeometry(172, 64);
		material4 = new THREE.ShaderMaterial({
			uniforms: {
				u_bg: {type: 'v3', value: new THREE.Color('rgb(11, 27, 60)')},
				u_time: {type: 'f', value: 0},
				u_timeOffset: {type: 'f', value: 1.5},
				u_left: {type: 'f', value: 0.3},
				u_right: {type: 'f', value: 0.6},
				u_topCount: {type: 'f', value: 4.1},
				u_mountainHeight: {type: 'f', value: 1.2},
				u_spikeCount: {type: 'f', value: 3.6},
			},
			fragmentShader: fragmentShader1,
			vertexShader: vertexShader1,
			transparent: true,
		});
		mesh4 = new THREE.Mesh(geometry4, material4);
		mesh4.position.set(isMobile ? 120 : 200, -36, -126);
		mesh4.scale.multiplyScalar(1.84);
		mesh4.rotation.z = 0.0;
		scene.add(mesh4);

		geometry5 = new THREE.PlaneGeometry(177, 69);
		material5 = new THREE.ShaderMaterial({
			uniforms: {
				u_bg: {type: 'v3', value: new THREE.Color('rgb(11, 27, 60)')},
				u_time: {type: 'f', value: 0},
				u_timeOffset: {type: 'f', value: 7.6},
				u_left: {type: 'f', value: 0.3},
				u_right: {type: 'f', value: 0.8},
				u_topCount: {type: 'f', value: 4.4},
				u_mountainHeight: {type: 'f', value: 1.8},
				u_spikeCount: {type: 'f', value: 5.4},
			},
			fragmentShader: fragmentShader1,
			vertexShader: vertexShader1,
			transparent: true,
		});
		mesh5 = new THREE.Mesh(geometry5, material5);
		mesh5.position.set(isMobile ? -2 : -115, -21, isMobile ? -32 : -155);
		mesh5.scale.multiplyScalar(2.03);
		mesh5.rotation.z = 0.0;
		scene.add(mesh5);

		geometry6 = new THREE.PlaneGeometry(
			wordTexture6.image.width * 0.074,
			wordTexture6.image.height * 0.074
		);
		material6 = new THREE.ShaderMaterial({
			uniforms: {
				u_texture: {type: 't', value: wordTexture6},
				u_color: {
					type: 'v3',
					value: new THREE.Color('rgb(255, 255, 255)'),
				},
			},
			fragmentShader: fragmentShader6,
			vertexShader: vertexShader6,
			transparent: true,
		});
		mesh6 = new THREE.Mesh(geometry6, material6);
		mesh6.position.set(0, 0, -95);
		mesh6.rotation.z = 0.0;
		scene.add(mesh6);

		$container.appendChild(renderer.domElement);

		window.addEventListener('resize', handleResize);
		if ('ontouchstart' in window) {
			document.body.addEventListener('touchmove', handleTouchMove);
		} else {
			document.body.addEventListener('mousemove', handleMouseMove);
		}

		isInited = true;
		render();
	}

	function handleResize() {
		updateSize();
		renderer.setSize(w, h);
		renderer.setPixelRatio(pixelRatio);
		camera.aspect = w / h;
		camera.position.z = isMobile ? 200 : 150;

		camera.updateProjectionMatrix();
	}

	function handleTouchMove(e) {
		var touch = e.touches[0];
		mousePosition.x = touch.pageX / w;
		mousePosition.y = touch.pageY / h;
	}

	function handleMouseMove(e) {
		mousePosition.x = e.pageX / w;
		mousePosition.y = e.pageY / h;
	}

	function render(timestamp) {
		if (isFocused) {
			camX =
				((mousePosition.x - 0.5) * (isMobile ? 100 : 60) -
					camera.position.x) *
				0.05;
			camY =
				((mousePosition.y - 0.5) * (isMobile ? 50 : 20) -
					camera.position.y) *
				0.05;

			fixedTime = 0.0001 * (Date.now() - start);
			timeDelta = fixedTime - lastFixedTime;
			lastFixedTime = fixedTime;
			timeOffset +=
				(Math.abs(camX) + Math.abs(camY)) / (isMobile ? 50 : 20);
			dynamicTime = fixedTime + timeOffset;
			materialCenterPiece.uniforms.u_time.value = dynamicTime;
			material1.uniforms.u_time.value = dynamicTime;
			material2.uniforms.u_time.value = dynamicTime;
			material3.uniforms.u_time.value = dynamicTime;
			material4.uniforms.u_time.value = dynamicTime;
			material5.uniforms.u_time.value = dynamicTime;

			renderUpdates.dynamicTime.forEach(function(uniform) {
				uniform.value = dynamicTime;
			});

			camera.position.x += camX;
			camera.position.y += camY;
			camera.position.z += camY;
			camera.lookAt(scene.position);

			renderer.render(scene, camera);
			requestAnimationFrame(render);
		}
	}
};
createHeroInteractive(document.getElementById('container'));











/**
 * 
 * 
 * 										/*
										{ routes.map((route, key) => {
											console.log(darkMode)

											return <Route key={key} {...route} exact />;
										} ) }
										
 */