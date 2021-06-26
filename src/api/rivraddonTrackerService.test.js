import {describe, test} from "@jest/globals";
import rivraddonTrackerService from "./rivraddonTrackerService";
import mockXhrResponse from "./__mocks__/xhrMock";

// as the tracker service is not real, I just wrote 2 simple imaginary test cases for this service
describe('testing rivraddonTrackerService', () => {

    describe('testing rivraddonTrackerService success cases', () => {

        test('successful rivraddonTrackerService request when eventType is valid', () => {
            mockXhrResponse(204);

            return rivraddonTrackerService('addAdUnits')
                .then(() => expect(true).toBeTruthy());

        });

    });

    describe('testing rivraddonTrackerService failure cases', () => {

        test('unsuccessful rivraddonTrackerService request when eventType is invalid', () => {
            expect.assertions(1);
            mockXhrResponse(500);

            return rivraddonTrackerService(null)
                .catch(() => expect(true).toBeTruthy());
        });

    });
});
