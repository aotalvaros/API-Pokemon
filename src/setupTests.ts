import '@testing-library/jest-dom';
//@ts-ignore
expect.addSnapshotSerializer(createSerializer({
    mode: 'deep',
    noKey: true
}));

require('jest-fetch-mock').enableMocks();