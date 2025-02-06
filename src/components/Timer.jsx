import React, { useState, useEffect } from 'react';

export default function Timer() {
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds((seconds) => seconds + 1);
			}, 1000);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds]);

	const toggle = () => {
		setIsActive(!isActive);
	};

	const reset = () => {
		setSeconds(0);
		setIsActive(false);
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(
			remainingSeconds
		).padStart(2, '0')}`;
	};

	return (
		<div className="timer">
			<div className="time">{formatTime(seconds)}</div>
			<div className="timer-buttons">
				<button onClick={toggle} className="timer-button">
					{isActive ? 'Pause' : 'Start'}
				</button>
				<button onClick={reset} className="timer-button">
					Reset
				</button>
			</div>
		</div>
	);
}
