import rivraddonTrackerService from "../api/rivraddonTrackerService";

/**
 * this method gets called when rivraddon gets enabled
 */
export const enableAnalytics = () => {
    console.log('SIMPLAEX CODE CHALLENGE LOG rivraddon analytics.enableAnalytics');
}

/**
 * this function gets called by rivraddon core to help tracking events
 *
 * @param {{eventType: string}} event
 * @returns {Promise<void>}
 */
export const trackPbjsEvent = (event) => rivraddonTrackerService(event?.eventType)
    .then(() => {
        console.log(`tracked event with type ${event?.eventType} successfully`);
    }).catch(() => {
        console.log(`failure in tracking event with type ${event?.eventType}`);
    });


/**
 * defining appropriate path for enableAnalytics and trackPbjsEvent to be accessible by rivraddon core.
 *
 * @type {{analytics: {enableAnalytics: enableAnalytics, trackPbjsEvent: (function({eventType: string}): Promise<void>)}}}
 */
window.rivraddon = {
    analytics: {
        enableAnalytics,
        trackPbjsEvent
    }
};
