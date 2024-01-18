import React, { useEffect, useRef, useState } from 'react';

const ScrollObserver = (options) => {
    const mainRef = useRef(null);
    const [ isVisible, setIsVisible ] = useState(false);

    const callbackObserver = (entries) => {
        const [ entry ] = entries;

        setIsVisible(entry.isIntersecting);
    }


    useEffect(() => {
        const observer = new IntersectionObserver(callbackObserver, options);

        if (mainRef.current) observer.observe(mainRef.current);

        return () => {
            if (mainRef.current) observer.unobserve(mainRef.current);
        }
	},[mainRef, options]);

	return [ mainRef, isVisible ];
};

export default ScrollObserver;
