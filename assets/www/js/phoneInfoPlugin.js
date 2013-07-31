/*
 * PhoneInfoPlugin
 * Plugin per a Phonegap 2.0
 * Retorna informació del dispositiu
 * 
 * (c) 2013, Josep Lluis Monte Galiano
 * @jlmoga
 * www.moga.cat
 * moga@moga.cat
 */

var PhoneInfoPlugin = (function (gap) {
    function isFunction(f) {
        return typeof f === "function";
    }

    // PhoneInfoPlugin
    function PhoneInfoPlugin() { }


    /**
     * Retorna informació sobre el dispositiu
     */
    PhoneInfoPlugin.getPhoneInfo = function () {
        gap.exec(onEvent, onError, "PhoneInfoPlugin", "getPhoneInfo", []);
    };

    /**
     * Retorna informació sobre la SIM
     */
    PhoneInfoPlugin.getSIMInfo = function () {
        gap.exec(onEvent, onError, "PhoneInfoPlugin", "getSIMInfo", []);
    };

    /**
     * Retorna informació sobre la xarxa
     */
    PhoneInfoPlugin.getNetworkInfo = function () {
        gap.exec(onEvent, onError, "PhoneInfoPlugin", "getNetworkInfo", []);
    };

    /**
     * En cas que un mètode de petició d'informació acabi amb èxit, salta aquest event.
     */
    function onEvent(data) {
    	PhoneInfoPlugin.onSuccess(data);
    }

    /**
     * En cas que un mètode de petició d'informació acabi en error, salta aquest event.
     */
    function onError(data) {
    	PhoneInfoPlugin.onError(data);
    }

    
    /**
     * Càrrega PhoneInfoPlugin
     */
    gap.addConstructor(function () {
        if (gap.addPlugin) {
            gap.addPlugin("phoneinfoplugin", PhoneInfoPlugin);
        } else {
            if (!window.plugins) {
                window.plugins = {};
            }
            
            window.plugins.phoneinfoplugin = PhoneInfoPlugin;
        }
    });

    return PhoneInfoPlugin;
})(window.cordova || window.Cordova || window.PhoneGap);
