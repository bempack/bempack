modules.define('a', ['b', 'c'], (provide, b, c) => {
    provide(['a', b, c]);
})
