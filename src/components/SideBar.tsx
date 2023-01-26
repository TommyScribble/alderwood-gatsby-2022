import React, { ReactNode, useEffect, useRef, useState } from "react";

type SideBarState = {
	touchDown?: boolean;
	sidebarOpen?: boolean;
	opening?: boolean;
	progress?: number;
	touchX?: number;
	touchTime?: number;
	lastTouch?: number;
	transitionTime?: number;
	screenWidth?: number;
};
type SettingsProps = {
	[key: string]: any;
	sensitivity?: number;
	overlayColor?: string;
	sidebarWidth?: string;
	swipeDistance?: number;
};
type SideBarProps = {
	settings?: SettingsProps;
	open: boolean;
	onChange: Function;
	children: ReactNode;
};

// export default class SideBar extends React.Component<
// 	SideBarProps,
// 	SideBarState
// >

export const SideBar = ({ open = false, onChange, children }: SideBarProps) => {
	// sidebarParent: React.RefObject<HTMLDivElement>;
	// sidebarOverlay: React.RefObject<HTMLDivElement>;
	// open: boolean;
	// settings: SettingsProps;

	// constructor(props) {
	// 	super(props);

	const [state, setState] = useState<SideBarState>({
		touchDown: false,
		sidebarOpen: false,
		progress: 0,
		touchX: 0,
		touchTime: 0,
		lastTouch: 0,
		transitionTime: 0,
	});

	const sidebarParent = useRef<HTMLDivElement>(null);
	const sidebarOverlay = useRef<HTMLDivElement>(null);

	// const open = false;

	const settings: SettingsProps = {
		sensitivity: 50,
		overlayColor: "#000",
		sidebarWidth: "70%",
		swipeDistance: 40,
	};

	if (settings) {
		for (let key in settings) {
			if (settings.hasOwnProperty(key)) {
				if (settings.hasOwnProperty(key)) {
					settings[key] = settings[key];
				}
			}
		}
	}
	// }

	const touchStart = (e: TouchEvent) => {
		const newState = { ...state };

		newState.touchX = e.touches[0].pageX;
		newState.lastTouch = e.touches[0].pageX;
		newState.touchTime = new Date().getTime();

		if (
			!state.sidebarOpen &&
			newState.touchX < (settings.sensitivity ?? 0)
		) {
			newState.opening = true;
			newState.touchDown = true;
		} else if (state.sidebarOpen) {
			newState.opening = false;
			newState.touchDown = true;
		}
		setState({ ...newState });
	};

	const touchMove = (e: TouchEvent) => {
		if (state.touchDown) {
			if (
				state.opening &&
				sidebarOverlay.current?.style &&
				sidebarParent.current
			) {
				sidebarParent.current.style.transitionDuration = "0s";
				sidebarOverlay.current.style.transitionDuration = "0s";

				let progress =
					(e.touches[0].pageX / (state.screenWidth || 0 * 0.7)) * 100;
				progress = Math.min(100, progress);

				changeSidebarState(
					progress === 100 ? "open" : progress === 0 ? "close" : "",
					{
						progress: progress,
						lastTouch: e.touches[0].pageX,
						sidebarOpen:
							progress === 100
								? true
								: progress === 0
								? false
								: state.progress,
					}
				);
			} else {
				let diff = state.touchX || 0 - e.touches[0].pageX;
				if (
					diff > 0 &&
					sidebarParent.current &&
					sidebarOverlay.current
				) {
					sidebarParent.current.style.transitionDuration = "0s";
					sidebarOverlay.current.style.transitionDuration = "0s";

					let progress = 100 - Math.min(100, diff / 2);

					changeSidebarState(
						progress === 100
							? "open"
							: progress === 0
							? "close"
							: "",
						{
							progress: progress,
							lastTouch: e.touches[0].pageX,
							sidebarOpen:
								progress === 100
									? true
									: progress === 0
									? false
									: state.progress,
						}
					);
				}
			}
		}
	};

	const touchEnd = (e: TouchEvent) => {
		if (state.touchDown && state.progress) {
			if (state.progress > 80) {
				openSidebar();
			} else {
				closeSidebar();
			}
			setState((prevState) => ({
				...prevState,
				touchDown: false,
			}));
		}

		if (state.lastTouch && state.touchX && state.touchTime) {
			if (state.lastTouch > state.touchX) {
				let time = new Date().getTime() - state.touchTime;
				let distance = state.lastTouch - state.touchX;
				let vel = distance / time;
				if (vel > 0.6) {
					openSidebar();
				}
			}
		}
	};

	const changeSidebarState = (arg: "open" | "close" | "", st = {}) => {
		if (arg === "open") {
			setState((prevState) => ({
				...prevState,
				progress: 100,
				sidebarOpen: true,
				...st,
			}));
			if (onChange) {
				onChange(true);
			}
		} else if (arg === "close") {
			setState((prevState) => ({
				...prevState,
				progress: 0,
				sidebarOpen: false,
				...st,
			}));
			if (onChange) {
				onChange(false);
			}
		} else {
			setState(st); /// does this neeed the prev state setting or is it meant to overwrite?
		}
	};

	const openSidebar = () => {
		if (state.progress && sidebarParent.current && sidebarOverlay.current) {
			let remaining = 100 - state.progress;
			sidebarParent.current.style.transitionDuration = `${
				remaining / 500
			}s`;
			sidebarOverlay.current.style.transitionDuration = `${
				remaining / 500
			}s`;
			changeSidebarState("open");
		}
	};

	const closeSidebar = () => {
		let remaining = state.progress;
		if (remaining && sidebarParent.current && sidebarOverlay.current) {
			sidebarParent.current.style.transitionDuration = `${
				remaining / 250
			}s`;
			sidebarOverlay.current.style.transitionDuration = `${
				remaining / 250
			}s`;
			changeSidebarState("close");
		}
	};

	const resizeWindow = () => {
		setState((prevState) => ({
			...prevState,
			screenWidth: window.screen.availWidth,
		}));
	};

	useEffect(() => {
		window.addEventListener("touchstart", touchStart);
		window.addEventListener("touchend", touchEnd);
		window.addEventListener("touchmove", touchMove);
		window.addEventListener("resize", resizeWindow);

		setState((prevState) => ({
			...prevState,
			screenWidth: window.screen.availWidth,
		}));

		return () => {
			window.removeEventListener("touchstart", touchStart);
			window.removeEventListener("touchend", touchEnd);
			window.removeEventListener("touchmove", touchMove);
			window.removeEventListener("resize", resizeWindow);
		};
	}, []);

	useEffect(() => {
		if (open) {
			if (!state.sidebarOpen) {
				openSidebar();
			}
		} else if (open === false) {
			if (state.sidebarOpen) {
				closeSidebar();
			}
		}
		// this.open = this.props.open;
	}, [open]);

	if (!state.progress) return <> Ooops no sidebar!</>;
	return (
		<div
			className="r-swipe-sidebar-container"
			style={{
				position: "absolute",
			}}
		>
			<div
				className="r-swipe-sidebar"
				ref={sidebarParent}
				style={{
					position: "fixed",
					left: `${state.progress - 100}%`,
					width: settings.sidebarWidth,
					height: "100%",
					top: 0,
					zIndex: 9999,
					transitionProperty: "left",
					transitionDuration: state.transitionTime + "s",
					transitionTimingFunction: "linear",
					transform: "translate3d(0,0,0)",
				}}
			>
				{children}
			</div>
			<div
				className="r-swipe-sidebar-overlay"
				ref={sidebarOverlay}
				role="button"
				tabIndex={-1}
				style={{
					position: "fixed",
					top: 0,
					bottom: 0,
					left: state.progress === 0 ? "-100%" : "0%",
					width: "100%",
					height: "100%",
					background: "#000",
					zIndex: 9998,
					transitionProperty: "opacity",
					transitionDuration: "0s",
					opacity: `${state.progress / 200}`,
				}}
				onClick={closeSidebar}
				onKeyPress={(e) => {
					if (e.which === 27) closeSidebar();
				}}
			></div>
		</div>
	);
};
