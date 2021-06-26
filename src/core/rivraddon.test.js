import {describe, jest, test} from "@jest/globals";
import {enableAnalytics, trackPbjsEvent} from "./rivraddon";
import rivraddonTrackerService from "../api/rivraddonTrackerService";

jest.mock('../api/rivraddonTrackerService');

describe('testing rivraddon.js', () => {

    describe('testing enableAnalytics function', () => {

        test('enableAnalytics must log \'SIMPLAEX CODE CHALLENGE LOG rivraddon analytics.enableAnalytics\'', () => {
            console.log = jest.fn();

            enableAnalytics();
            expect(console.log).toHaveBeenCalledWith('SIMPLAEX CODE CHALLENGE LOG rivraddon analytics.enableAnalytics');
        });

        test('enableAnalytics must be available trough window.rivraddon.analytics.enableAnalytics', () => {
            expect(typeof window?.rivraddon?.analytics?.enableAnalytics === 'function').toBe(true);
        });

    });

    describe('testing trackPbjsEvent function', () => {

        test('trackPbjsEvent must be available trough window.rivraddon.analytics.trackPbjsEvent', () => {
            expect(typeof window?.rivraddon?.analytics?.trackPbjsEvent === 'function').toBe(true);
        });

        test('trackPbjsEvent must log \'tracked event with type addAdUnits successfully\' when eventType is addAdUnits', done => {
            const eventMock = {eventType: 'addAdUnits'};
            rivraddonTrackerService.mockResolvedValue(undefined);
            console.log = jest.fn();

            trackPbjsEvent(eventMock).then(() => {
                expect(console.log).toHaveBeenCalledWith('tracked event with type addAdUnits successfully');
                done();
            });
        });

        test('trackPbjsEvent must log \'failure in tracking event with type null\' when eventType is null', done => {
            const eventMock = {eventType: null};
            rivraddonTrackerService.mockRejectedValue(undefined);
            console.log = jest.fn();

            trackPbjsEvent(eventMock).then(() => {
                expect(console.log).toHaveBeenCalledWith('failure in tracking event with type null');
                done();
            });
        });

    });

});
