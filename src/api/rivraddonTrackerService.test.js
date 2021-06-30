import {describe, test} from "@jest/globals";
import rivraddonTrackerService from "./rivraddonTrackerService";
import mockXhr from "./__mocks__/xhrMock";

describe('testing rivraddonTrackerService', () => {

    test('rivraddonTrackerService check xhr treated well', async () => {
        const xhr = mockXhr();
        const eventType = 'addAdUnits';

        setTimeout(() => xhr.onload());

        try {
            await rivraddonTrackerService(eventType);
        } catch (e){}

        expect(xhr.open).toHaveBeenCalledTimes(1);
        expect(xhr.open).toHaveBeenCalledWith("POST", "https://tracker.simplaex-code-challenge.com/");

        expect(xhr.send).toHaveBeenCalledTimes(1);
        expect(xhr.send).toHaveBeenCalledWith(JSON.stringify({"eventType": eventType}));

        expect(xhr.setRequestHeader).toHaveBeenCalledTimes(1);
        expect(xhr.setRequestHeader).toHaveBeenCalledWith("Content-Type", "application/json");
    });

    test('successful rivraddonTrackerService request', async () => {
        const xhr = mockXhr(204);
        const eventType = 'addAdUnits';

        setTimeout(() => xhr.onload());

        await expect(rivraddonTrackerService(eventType)).resolves.toBeUndefined();
    });

    test('unsuccessful rivraddonTrackerService with bad response code', async () => {
        const xhr = mockXhr(500);

        setTimeout(() => xhr.onload());

        await expect(rivraddonTrackerService(null)).rejects.toEqual(expect.any(Error));
    });

    test('unsuccessful rivraddonTrackerService with bad response code', async () => {
        const xhr = mockXhr(500);

        setTimeout(() => xhr.onload());

        await expect(rivraddonTrackerService(null)).rejects.toThrowError('unsuccessful response code');
    });

    test('aborted rivraddonTrackerService request test', async () => {
        const xhr = mockXhr(200);

        setTimeout(() => xhr.onabort());

        await expect(rivraddonTrackerService(null)).rejects.toThrowError('aborted');
    });

    test('failed rivraddonTrackerService request test', async () => {
        const xhr = mockXhr(200);
        const error = new Error('failure');

        setTimeout(() => xhr.onerror(error));

        await expect(rivraddonTrackerService(null)).rejects.toThrowError(error);
    });
});
