import React, {useEffect, useState} from 'react';
import happyCat from "../../images/happycat.gif"

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HappyCat(props) {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState({ x: 1, y: 1 });

    useEffect(() => {
        const moveGif = () => {
            const randomX = getRandomNumber(0, 200);
            const randomY = getRandomNumber(0, 200);

            setPosition((prevPosition) => ({
                x: prevPosition.x + direction.x * randomX,
                y: prevPosition.y + direction.y * randomY,
            }));

            if (
                position.x >= window.innerWidth - 50 ||
                position.x <= 0 ||
                position.y >= window.innerHeight - 50 ||
                position.y <= 0
            ) {
                setDirection((prevDirection) => ({
                    x: -prevDirection.x,
                    y: -prevDirection.y,
                }));
            }
        };

        const interval = setInterval(() => {
            moveGif();
        }, 700);

        return () => clearInterval(interval);
    }, [position, direction]);


    return (
        <div className="happy-cat" style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            position: 'absolute',
            zIndex: 1,
            transition: 'transform 1s ease-in-out'
        }}>
            <img src={happyCat} alt="HappyHappyHappy"/>
        </div>
    );
}

export default HappyCat;