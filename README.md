#About Project
This is a code challange provided by Simplaex company. the goal is to track prebid.js platform events.

#Requirements
You need to make sure you have installed npm version +6.4.1 and nodejs version +10.13.0 (LTS) at least.

Note that these version codes are minimal valid versions for webpack 5, and I didn't check for
other packages minimal requirements. at the moment, npm v7.19.0 and node v14.17.1 are the latest
stable versions.

#Setup And Run
After cloning project to your local environment, open a terminal
and run command bellow to install all required node packages.

```npm i```
 
Then you can run project with running bellow command.

```npm run start```

By calling start script, the project will get served through:

```http://localhost:8080/```


#Running Tests
You can run tests by running:

```npm run test```

#Notes
1. I moved all scripts written inside the test-html page to src/core/prebid.js and added a separate
entry point for it, to have better control over order of loading scripts.

2. I didn't find it necessary to write tests for test-html scripts, cause I guess it needs to go deep
into prebid.js doc concepts. Also, as I believe, writing tests for such scripts needs to find appropriate
test cases.

3. The written tests mostly are based on imaginary test cases to make the chance of writing more complex tests.

#I had Some Issues
In coding Challenge doc, you had suggested that I should use the simplified version of prebid.js.
but, the simplified version was not able to load adds because of the conflict that was made between
"Access-control-allow-origin: *" and xhr.withCredentials(true) of request bellow.

```
curl 'http://ib.adnxs.com/ut/v3/prebid' \
     -H 'Proxy-Connection: keep-alive' \
     -H 'Pragma: no-cache' \
     -H 'Cache-Control: no-cache' \
     -H 'Proxy-Authorization: Basic LnN2QDEyNjE3NTQ3O2lyLjo2NzVRbUYwc3UxZVNGRGppK1BYclBEUTltQ0hmRWxIQy96RVQ5cUwyN01RPQ==' \
     -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36' \
     -H 'Content-Type: text/plain' \
     -H 'Accept: */*' \
     -H 'Origin: http://localhost:8080' \
     -H 'Referer: http://localhost:8080/' \
     -H 'Accept-Language: en-GB,en;q=0.9,fa-IR;q=0.8,fa;q=0.7,en-US;q=0.6' \
     --data-raw '{"tags":[{"sizes":[{"width":300,"height":250}],"primary_size":{"width":300,"height":250},"ad_types":["banner"],"uuid":"2fe8fdfd6deff4","id":13144370,"allow_smaller_sizes":false,"use_pmt_rule":false,"prebid":true,"disable_psa":true}],"sdk":{"source":"pbjs","version":"2.18.0"},"referrer_detection":{"rd_ref":"http%3A%2F%2Flocalhost%3A8080%2F","rd_top":true,"rd_ifs":0,"rd_stk":"http%3A%2F%2Flocalhost%3A8080%2F"}}' \
     --compressed
```

Also, by using the default prebid.js that was set in the test-html, I found that enableAnalytics
and trackPbjsEvent are not getting called. As there was no error log on this matter, so I didn't
go deep to find the problem.
