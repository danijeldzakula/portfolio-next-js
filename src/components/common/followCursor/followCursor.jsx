import React, { useEffect } from 'react';
import './followCursor.scss';
const FollowCursor = () => {
	useEffect(() => {
		class mouseFollow {
			constructor(classelem, classfollow, classinner) {
				this.elem = document.querySelector(classelem);
				this.elemOuter = document.querySelector(classfollow);
				this.elemInner = document.querySelector(classinner);
				this.init();
				this.event();
			}
			init() {
				let harlfWidth = { x: window.innerWidth >> 1, y: window.innerHeight >> 1 };
				this.mousePos = { x: harlfWidth.x, y: harlfWidth.y };
				this.exmousePos = { x: harlfWidth.x, y: harlfWidth.y };
				this.move = { x: harlfWidth.x, y: harlfWidth.y };
			}
			event() {
				window.addEventListener(
					'mousemove',
					(e) => {
						this.update(e);
					},
					false
				);
			}
			update(e) {
				this.mousePos = { x: e.clientX, y: e.clientY };
			}
			outmouse() {
				this.mousePos = { x: window.innerWidth >> 1, y: window.innerHeight >> 1 };
			}
			calcEasing(ex, current, easing) {
				return ex + (current - ex) * easing;
			}
			calc() {
				this.move.x = this.calcEasing(this.exmousePos.x, this.mousePos.x, 0.1);
				this.move.y = this.calcEasing(this.exmousePos.y, this.mousePos.y, 0.1);
				this.exmousePos.x = this.move.x;
				this.exmousePos.y = this.move.y;
				let distance = {
					x: Math.abs(this.mousePos.x - this.exmousePos.x),
					y: Math.abs(this.mousePos.y - this.exmousePos.y)
				};
				let distance_ = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
				let base_scale = Math.round(distance_ / (window.innerWidth / 6) * 100) / 100 + 1;
				base_scale = Math.min(base_scale, 1.5);
				this.scale = {
					x: base_scale,
					y: 1 - Math.abs(1 - base_scale)
				};
				if (Math.abs(this.mousePos.x - this.move.x) < 0.0005) {
					this.move.x = this.mousePos.x;
					this.move.y = this.mousePos.y;
				}
				let distanceCircleToMouse = {
					x: Math.round((this.mousePos.x - this.move.x) * 100) / 100,
					y: Math.round((this.mousePos.y - this.move.y) * 100) / 100
				};
				let radian = Math.atan2(distanceCircleToMouse.y, distanceCircleToMouse.x);
				this.angle = ~~(radian * (180 / Math.PI));
			}
			follow() {
				this.calc();
				this.elemOuter.style.transform = `translate3d( ${this.move.x}px ,${this.move.y}px , 0 )`;
				this.elemInner.style.transform = `rotate(${this.angle}deg) scale(${this.scale.x} , ${this.scale.y})`;
			}
		}
		document.addEventListener('DOMContentLoaded', () => {
			let cursor = new mouseFollow('.cursor', '.cursor__follow', '.cursor__inner');
			const loop = () => {
				let animation = window.requestAnimationFrame(loop);
				cursor.follow(animation);
			};
			loop();
		});
		return () => {};
	}, []);
	return (
		<React.Fragment>
			<div className="cursor">
				<div className="cursor__follow">
					<div className="cursor__inner">
						<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
							<circle cx="25" cy="25" r="22" />
						</svg>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default FollowCursor;
