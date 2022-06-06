import React, {
	HTMLAttributes,
	MouseEventHandler,
	TouchEventHandler,
	UIEventHandler,
	useEffect,
	useRef,
	useState
} from 'react';
import './scroll.scss'
import scrollbarWidth from './scrollbar-width';
import {createScopedClasses} from '../helpers/classes';

const componentName = 'Scroll';
const sc = createScopedClasses(componentName);

interface Props extends HTMLAttributes<HTMLDivElement> {
	
}

const Scroll: React.FunctionComponent<Props> = (props) => {
	const {children, ...rest} = props
	const [barHeight, setBarHeight] = useState(0);
	const [barTop, _setBarTop] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null)

	const onScroll:UIEventHandler = (e) => {
		const scrollHeight = scrollRef.current!.scrollHeight;
		const viewHeight = scrollRef.current!.getBoundingClientRect().height;
		const scrollTop = scrollRef.current!.scrollTop;
		setBarTop(scrollTop * viewHeight / scrollHeight);
	}

	useEffect(() => {
		const scrollHeight = scrollRef.current!.scrollHeight;
		const viewHeight = scrollRef.current!.getBoundingClientRect().height;
		const barHeight = ( viewHeight * viewHeight / scrollHeight);
		setBarHeight(barHeight);
	}, [])

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
	}

	const draggingRef = useRef(false);
	const firstYRef = useRef(0);
	const firstBarTopRef = useRef(0);
	const onMouseDownBar: MouseEventHandler = (e) => {
		draggingRef.current = true;
		firstYRef.current = e.clientY;
		firstBarTopRef.current = barTop;
	}

	const onTouchMove:TouchEventHandler = (e) => {

	}

	const onTouchStart:TouchEventHandler = (e) => {

	}

	const onTouchEnd:TouchEventHandler = () => {

	}

	return (
		<div {...rest} className={sc()}>
			<div
				className={sc('inner')}
				onScroll={onScroll}
				onTouchMove={onTouchMove}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
				ref={scrollRef}
				style={{right: -scrollbarWidth()}}
			>
				{children}
			</div>
			<div className={sc('track')}>
				{barTop}
				<div
					className={sc('track-bar-inner')}
					style={{height: barHeight,transform: `translateY(${barTop}px)`}}
					onMouseDown={onMouseDownBar}
				/>
			</div>
		</div>
	)
}

export default Scroll