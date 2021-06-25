const sizes = [
    [300, 250]
];
// 1 sec is not enough on my network ! so I increased it to be sure it will run.
const PREBID_TIMEOUT = 5000;
const FAILSAFE_TIMEOUT = 3000;

const adUnits = [{
    code: '/19968336/header-bid-tag-1',
    mediaTypes: {
        banner: {
            sizes: sizes
        }
    },
    bids: [{
        bidder: 'appnexus',
        params: {
            placementId: 13144370
        }
    }]
}];

const googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
});

const pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.que.push(function () {
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
        bidsBackHandler: initAdServer,
        timeout: PREBID_TIMEOUT
    });
});

// enable Rivr analytics adapter
pbjs.que.push(function () {
    pbjs.enableAnalytics({
        provider: 'rivr',
        options: {
            clientID: 'testChallengeClientId',
            authToken: 'testChallengeauthToken',
            bannersIds: [],
            siteCategories: []
        }
    });
});

function initAdServer() {
    if (pbjs.initAdserverSet) return;
    pbjs.initAdserverSet = true;
    googletag.cmd.push(function () {
        pbjs.setTargetingForGPTAsync && pbjs.setTargetingForGPTAsync();
        googletag.pubads().refresh();
    });
}

// in case PBJS doesn't load
setTimeout(function () {
    initAdServer();
}, FAILSAFE_TIMEOUT);

googletag.cmd.push(function () {
    googletag.defineSlot('/19968336/header-bid-tag-1', sizes, 'div-1')
        .addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
});

googletag.cmd.push(function () {
    googletag.display('div-1');
});
