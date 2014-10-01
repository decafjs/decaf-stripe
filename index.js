/**
 * Created by mschwartz on 6/11/14.
 */

/*global Packages, JSON */

var jStripe = Packages.com.stripe.Stripe,
    jCharge = Packages.com.stripe.model.Charge;

function Stripe( apiKey ) {
    this.apiKey = apiKey;
    jStripe.apiKey = apiKey;
}
decaf.extend(Stripe.prototype, {
    charge : function( chargeInfo ) {
        try {
            var charge = jCharge.create(chargeInfo);
            return JSON.parse(new String(charge).replace(/^.*\{/, '{'));
        }
        catch (e) {
            var msg = e.message;
            msg = String(msg);
            msg = msg.replace(/^.*?\:\s*/, '');
            throw new Error(msg);
        }
    },
    list   : function( params ) {
        params = params || {};
        return JSON.parse(String(jCharge.all(params)).replace(/^.*\{/, '{'));
    }
});

module.exports = Stripe;
