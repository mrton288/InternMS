new Promise((resolveOuter) => {
    resolveOuter(
        new Promise((resolveInner) => {
            setTimeout(resolveInner, 1000);
        })
    );
}).then(() => {
    console.log("hello world!");
});
