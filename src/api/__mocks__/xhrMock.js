import {jest} from "@jest/globals";

export default function mockXhr(status, data) {
    const xhrMockObj = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        status,
        response: JSON.stringify(data),
    };

    const xhrMockClass = () => xhrMockObj;

    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

    return xhrMockObj;
}
