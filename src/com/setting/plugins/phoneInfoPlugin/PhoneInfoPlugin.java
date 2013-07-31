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

package com.setting.plugins.phoneInfoPlugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.content.Context;
import android.telephony.TelephonyManager;

public class PhoneInfoPlugin extends CordovaPlugin  {

    public final String ACTION_GET_PHONE_INFO = "getPhoneInfo";
    public final String ACTION_GET_SIM_INFO = "getSIMInfo";
    public final String ACTION_GET_NETWORK_INFO = "getNetworkInfo";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        JSONObject result;
        
        TelephonyManager telephonyManager = (TelephonyManager)this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);

    	// Get Phone info
        if (action.equals(ACTION_GET_PHONE_INFO)) {
            //result = new JSONArray();
        	result = new JSONObject();
        	result.put("action", action);
        	result.put("getPhoneType", telephonyManager.getPhoneType());
        	result.put("getDeviceId", telephonyManager.getDeviceId());
            //obj.put("getDeviceId", Secure.getString(this.cordova.getActivity().getApplicationContext().getContentResolver(), Secure.ANDROID_ID));
        	result.put("getDeviceSoftwareVersion", telephonyManager.getDeviceSoftwareVersion());
        	result.put("getLine1Number", telephonyManager.getLine1Number());
        	result.put("getSubscriberId", telephonyManager.getSubscriberId());
        	
            if (telephonyManager.getLine1Number() != null) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
                return true;
            } else {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, result));
                return false;
            }
        }

        // Get SIM Info
        if (action.equals(ACTION_GET_SIM_INFO)) {
        	result = new JSONObject();
        	result.put("action", action);
        	result.put("getSimState", telephonyManager.getSimState());
        	result.put("getSimCountryIso", telephonyManager.getSimCountryIso());
        	result.put("getSimOperatorName", telephonyManager.getSimOperatorName());
        	result.put("getSimSerialNumber", telephonyManager.getSimSerialNumber());
            
            if (telephonyManager.getDeviceId() != null) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
                return true;
            } else {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, result));
                return false;
            }
        }

    	// Get network info
        if (action.equals(ACTION_GET_NETWORK_INFO)) {
        	result = new JSONObject();
        	result.put("action", action);
        	result.put("getNetworkCountryIso", telephonyManager.getNetworkCountryIso());
        	result.put("getNetworkOperator", telephonyManager.getNetworkOperator());
        	result.put("getNetworkOperatorName", telephonyManager.getNetworkOperatorName());

            if (telephonyManager.getLine1Number() != null) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
                return true;
            } else {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, result));
                return false;
            }
        }

        return false;
    }    
}