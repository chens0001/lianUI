import React, {
	HTMLAttributes,
	MouseEventHandler,
	TouchEventHandler,
	UIEventHandler,
	useEffect,
	useRef,
	useState
} from 'react';
import './scroll.scss';
import scrollbarWidth from './scrollbar-width';
import {createScopedClasses} from '../helpers/classes';

const componentName = 'Scroll';
const sc = createScopedClasses(componentName);

interface Props extends HTMLAttributes<HTMLDivElement> {
	onPull?: () => void
}

const Scroll: React.FunctionComponent<Props> = (props) => {
	const {children, ...rest} = props;
	const [barVisible, setBarVisible] = useState(false);
	const [barHeight, setBarHeight] = useState(0);
	const [barTop, _setBarTop] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	const timerIdRef = useRef<number | null>(null);

	const onScroll: UIEventHandler = (e) => {
		setBarVisible(true);
		const scrollHeight = scrollRef.current!.scrollHeight;
		const viewHeight = scrollRef.current!.getBoundingClientRect().height;
		const scrollTop = scrollRef.current!.scrollTop;
		setBarTop(scrollTop * viewHeight / scrollHeight);
		if (timerIdRef.current !== null) {
			window.clearTimeout(timerIdRef.current!);
		}
		timerIdRef.current = window.setTimeout(() => {
			setBarVisible(false);
		}, 300);
	};

	useEffect(() => {
		const scrollHeight = scrollRef.current!.scrollHeight;
		const viewHeight = scrollRef.current!.getBoundingClientRect().height;
		const barHeight = (viewHeight * viewHeight / scrollHeight);
		setBarHeight(barHeight);
	}, []);

	useEffect(() => {
		document.addEventListener('mouseup', onMouseUpBar);
		document.addEventListener('mousemove', onMouseMoveBar);
		document.addEventListener('selectstart', onSelect);
		return () => {
			document.removeEventListener('mouseup', onMouseUpBar);
			document.removeEventListener('mousemove', onMouseMoveBar);
			document.removeEventListener('selectstart', onSelect);
		};
	}, []);

	const [translateY, _setTranslateY] = useState(0);
	const setTranslateY = (y: number) => {
		if (y < 0) {y = 0;} else if (y > 150) {y = 150;}
		_setTranslateY(y);
	};

	const lastYRef = useRef(0);
	const moveCount = useRef(0);
	const pulling = useRef(false);

	const onMouseUpBar = () => {
		draggingRef.current = false;
	};

	const onSelect = (e: Event) => {
		if (draggingRef.current) {e.preventDefault();}
	};

	const onMouseMoveBar = (e: MouseEvent) => {
		if (draggingRef.current) {
			const delta = e.clientY - firstYRef.current;
			const newBarTop = firstBarTopRef.current + delta;
			setBarTop(newBarTop);
			const scrollHeight = scrollRef.current!.scrollHeight;
			const viewHeight = scrollRef.current!.getBoundingClientRect().height;
			scrollRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight;
		}
	};

	const setBarTop = (number: number) => {
		if (number < 0) {return;}
		const {current} = scrollRef;
		const scrollHeight = current!.scrollHeight;
		const viewHeight = current!.getBoundingClientRect().height;
		const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight;
		if (number > maxBarTop) {return;}
		_setBarTop(number);
	};

	const draggingRef = useRef(false);
	const firstYRef = useRef(0);
	const firstBarTopRef = useRef(0);
	const onMouseDownBar: MouseEventHandler = (e) => {
		draggingRef.current = true;
		firstYRef.current = e.clientY;
		firstBarTopRef.current = barTop;
	};

	const onTouchMove: TouchEventHandler = (e) => {
		const deltaY = e.touches[0].clientY - lastYRef.current;
		moveCount.current += 1;
		if (moveCount.current === 1 && deltaY < 0) {
			pulling.current = false;
			return;
		}
		if (!pulling.current) {return;}
		setTranslateY(translateY + deltaY);
		lastYRef.current = e.touches[0].clientY;
	};

	const onTouchStart: TouchEventHandler = (e) => {
		const scrollTop = scrollRef.current!.scrollTop;
		if (scrollTop !== 0) {return;}
		pulling.current = true;
		lastYRef.current = e.touches[0].clientY;
		moveCount.current = 0;
	};

	const onTouchEnd: TouchEventHandler = () => {
		if (pulling.current) {
			setTranslateY(0);
			props.onPull && props.onPull();
			pulling.current = false;
		}
	};

	return (
		<div {...rest} className={sc()}>
			<div
				className={sc('inner')}
				onScroll={onScroll}
				onTouchMove={onTouchMove}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
				ref={scrollRef}
				style={{right: -scrollbarWidth(), transform: `translateY(${translateY}px)`}}
			>
				{children}
			</div>
			<div className={sc('track')}>
				{
					barVisible &&
					<div
						className={sc('track-bar-inner')}
						style={{height: barHeight, transform: `translateY(${barTop}px)`}}
						onMouseDown={onMouseDownBar}
          />
				}
			</div>
			<div className={sc('pulling')} style={{height: translateY}}>
				{translateY === 150 ?
					<span className={sc('pulling-text')}>释放手指即可更新</span> :
					<span className={'pulling-icon'}>↓</span>}
			</div>
		</div>
	);
};

export default Scroll;