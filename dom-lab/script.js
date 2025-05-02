const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '/catalog'},
    {text: 'orders', href: '/orders'},
    {text: 'account', href: '/account'},
  ];
// 1.0 Select and cache the <main> element in a variable named mainEl

mainEl = document.querySelector("main")
console.log("1.0 = ",mainEl)

// 1.1 Set the background color of `mainEl` using the `--main-bg` CSS custom property.
//Hint: Assign a string that uses the CSS `var()` function like this: `'var(--main-bg)'`
mainEl.style.backgroundColor = 'var(--main-bg)'
console.log("1.1 = ", mainEl.style.backgroundColor)

// 1.2 Set the content of `mainEl` to `<h1>SEI Rocks!</h1>`.
mainEl.innerHTML = "<h1>SEI Rocks!</h1>"
console.log("1.2 = ", mainEl.innerHTML)
// 1.3 Add a class of `flex-ctr` to `mainEl`. 
// Hint: [Element.classList API](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
mainEl.classList.add("flex-ctr")
console.log("1.3 = ", mainEl.classList)

// 2.0 Select and cache the `<nav id="top-menu">` element in a variable named `topMenuEl`.
const topMenuEl = document.getElementById("top-menu")
console.log("2.0 = ", topMenuEl)
// 2.1 Set the height `topMenuEl` element to be `100%`.
topMenuEl.style.height = "100%"
console.log ("2.1 = ", topMenuEl.style.height)
// 2.2 Set the background color of `topMenuEl` using the `--top-menu-bg` CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
console.log("2.2 = ", topMenuEl.style.backgroundColor)
// 2.3 Add a class of `flex-around` to `topMenuEl`.
topMenuEl.classList.add("flex-around")
console.log("2.3 = ", topMenuEl.classList)
// 3.0 Copy the following data structure to the top of **script.js**:
console.log("3.0 = ", menuLinks)


// 3.1 Iterate over the entire `menuLinks` array and for each "link" object:

// - Create an `<a>` element.
// - On the new element, add an `href` attribute with its value set to the `href` property of the "link" object.
// - Set the new element's content to the value of the `text` property of the "link" object.
// - Append the new element to the `topMenuEl` element.