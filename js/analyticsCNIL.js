var analyticsCNIL  = {

    //Permet ou non à l'utilisateur de refuser les cookies
    canRefuse: true,
    //affiche la banière et charge les cookies sans le consentement de l'utilisateur
    dontCare: true,
    //Utilise ou non l'option DNT du navigateur
    enableDNTBrowserOption: false,
    //message pour l'utilisateur
    messageContent: "En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies pour réaliser des statistiques de visites anonyme.",
    //URL en savoir plus
    urlLearnMore: "http://www.google.com/intl/fr/policies/technologies/cookies/",
    //Clé Google Analytics
    gaKey: "UA-XXXXXX-Y",

    /**
     * Vérifie si le cookie est défini.
     *     Si indéfini : affiche la div et bind les boutons
     *     Si l'utilisateur a consenti track
     */
    start: function () {
        if (this.dontCare === true) {
            this.track();
            if ($.cookie('cookieBanner') === undefined) {
                this.showBanner();
            }
        } else if ($.cookie('cookieConsent') && $.cookie('cookieConsent') === '1') {
            this.track();
        }
        else if ($.cookie('cookieConsent') === undefined && this.doNotTrack() != true) {
            this.showBanner();
        }
    },

    /**
     * Vérifie si l'option doNotTrack du navigateur est activée
     */
    doNotTrack: function () {
        if (this.enableDNTBrowserOption ===  false) {
            return false;
        }
        if ( (navigator.doNotTrack && (navigator.doNotTrack=='yes' || navigator.doNotTrack=='1')) || ( navigator.msDoNotTrack && navigator.msDoNotTrack == '1') ) {
            return true;
        } else {
            return false;
        }
    },

    //Affiche la bannière et bind les évènements liés
    showBanner: function() {
        var that = this;
        var html = [];

        html.push(
            '<div class="cookie" id="cookie">',
                this.messageContent, ' ',
                '<a href="',
                this.urlLearnMore,
                '" target="_blank">En savoir plus.</a>');

        if (that.dontCare === true) {
            html.push(
                '<div class="cookie_btn" id="cookie_close">x Fermer</div>');
        } else {
            html.push(
                '<div class="cookie_btn" id="cookie_accept">Ok</div>');
        }

        if (that.canRefuse === true) {
            html.push('<div class="cookie_btn cookie_btn-refuse" id="cookie_refuse">Refuser les cookies</div>');
        };

        html.push(
            '</div>')

        $('body').append(html.join(""));

        $( "#cookie_accept" ).bind("click", function(e) {
            e.preventDefault(e);
            that.accept();
            $('#cookie').fadeOut(300,function(){$('#cookie-bar').remove();});
        });
        $( "#cookie_refuse" ).bind("click", function(e) {
            e.preventDefault(e);
            that.refuse();
            $('#cookie').fadeOut(300,function(){$('#cookie-bar').remove();});
        });
        $( "#cookie_close" ).bind("click", function(e) {
            e.preventDefault(e);
            $.cookie('cookieBanner', '1', {expires: 30 * 13});
            $('#cookie').fadeOut(300,function(){$('#cookie-bar').remove();});
        });
    },

    accept: function(e) {
        $.cookie('cookieConsent', '1', {expires: 30 * 13});
        this.track();
    },

    refuse: function() {
        $.cookie('cookieConsent', '0', {expires: 30 * 13});
        this.deleteAnalyticsCookies();
    },

    reset: function() {
        $.removeCookie('cookieConsent');
        this.deleteAnalyticsCookies();
        window.location.reload();
    },

    //charge la balise script de Google Analytics
    callGoogleAnalytics: function() {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', this.gaKey]);
        _gaq.push(['_trackPageview']);

        //renvoie la variable dans la page
        window['_gaq'] = _gaq;

        (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
    },


    //Active le tracking (execution du code JS Google Analytics)
    track: function () {
        this.callGoogleAnalytics();
    },

    //Supprime les cookies de Google Analytics
    deleteAnalyticsCookies: function () {
        var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"]
        for (var i=0; i<cookieNames.length; i++)
            $.removeCookie(cookieNames[i])
    }

};

$(document).ready(function() {
    analyticsCNIL.start();
});