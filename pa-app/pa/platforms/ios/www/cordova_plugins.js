cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/com.photokandy.nativecontrols/www/PKNativeControls.js",
        "id": "com.photokandy.nativecontrols.PKNativeControls",
        "clobbers": [
            "window.nativeControls"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.statusbar": "0.1.7",
    "com.photokandy.nativecontrols": "1.1.0"
}
// BOTTOM OF METADATA
});