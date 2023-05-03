
// import { useEffect } from "react";

// // //вызвать обработчик по клику вне блока
// // export function сlickOutside(ref, handler) {
// //   useEffect(() => {
// //     function  listener = (evt) => {
// //       if (ref.current && !ref.current.contains(evt.target)) {
// //         alert("You clicked outside of me!");
// //       }

// //     };
// //     document.addEventListener('mousedown', listener);
// //     return () => {
// //       document.removeEventListener('mousedown', listener);
// //     };
// //   }, [ref, handler]);
// // };
// function useOutsideAlerter(ref) {
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     function handleClickOutside(event) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         alert("You clicked outside of me!");
//       }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);
// }

// export { useOutsideAlerter };