import babel from "rollup-plugin-babel";
//import cssbundle from 'rollup-plugin-css-bundle';

const external = id => !id.startsWith("/") && !id.startsWith(".");

export default [{
    input: "./src/Picker.js",
    output: {
        file: "./dist/Picker.js",  
        format: "es",   
    },
    plugins: [
        babel({
            runtimeHelpers: true
        })
    ],
    external,
}, {
    input: "./src/Calendar.js",
    output: {
        file: './dist/Calendar.js',  
        format: "es",   
    },
    plugins: [
        babel({
            runtimeHelpers: true
        })
    ],
    external,
}, {
    input: "./src/TimePicker.js",
    output: {
        file: "./dist/TimePicker.js",  
        format: "es",   
    },
    plugins: [
        babel({
            runtimeHelpers: true
        })
    ],
    external,
}];