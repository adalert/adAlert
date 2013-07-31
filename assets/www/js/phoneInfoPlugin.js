/*
 * PhoneInfoPlugin
 * Plugin per a Phonegap 2.0
 * Retorna informaci� del dispositiu
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
     * Retorna informaci� sobre el dispositiu
     */
    PhoneInfoPlugin.getPhoneInfo = function () {
        gap.exec(onEvent, onError, "PhoneInfoPlugin", "getPhoneInfo", []);
    };

    /**
     * Retorna informaci� sobre la SIM
     */
    PhoneInfoPlugin.getSIMInfo = function () {
        gap.exec(onEvent, onError, "PhoneInfoPlugin", "getSIMInfo", []);
    };

    /**
     * Retorna informaci� sobre la xarxa
     */
    PhoneInfoPlugin.getNetworkInfo = function () {
        gap.exec(onEvent, onError, "PhoneInfoPlugin", "getNetworkInfo", []);
    };

    /**
     * En cas que un m�tode de petici� d'informaci� acabi amb �xit, salta aquest event.
     */
    function onEvent(data) {
    	PhoneInfoPlugin.onSuccess(data);
    }

    /**
     * En cas que un m�tode de petici� d'informaci� acabi en error, salta aquest event.
     */
    function onError(data) {
    	PhoneInfoPlugin.onError(data);
    }

    
    /**
     * C�rrega PhoneInfoPlugin
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
