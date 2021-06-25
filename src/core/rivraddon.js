import rivraddonTrackerService from "../api/rivraddonTrackerService";

const enableAnalytics = () => {
    console.log('SIMPLAEX CODE CHALLENGE LOG rivraddon analytics.enableAnalytics');
}

const trackPbjsEvent = (event) => rivraddonTrackerService(event?.eventType);


window.rivraddon = {
    analytics: {
        enableAnalytics,
        trackPbjsEvent
    }
};
