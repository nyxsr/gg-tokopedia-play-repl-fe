/* eslint-disable no-constant-condition */
const randomColor = (number) =>{
    while (true) {
        const red = Math.floor(Math.random() * 255).toString(16).padStart(2, '0');
        const green = Math.floor(Math.random() * 255).toString(16).padStart(2, '0');
        const blue = Math.floor(Math.random() * 255).toString(16).padStart(2, '0');

        // Check if the color is not black (000000)
        if (red !== '00' || green !== '00' || blue !== '00') {
            return `#${red}${green}${blue}`;
        }
    }
}

export default randomColor