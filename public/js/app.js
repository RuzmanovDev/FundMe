var haders = {
    headers: {
        'authorization': 'true',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa': 'true'
    }
};
requester.putJSON(
    '/test',
    { 'obekt': 'value' },
    haders
).then(console.log);

